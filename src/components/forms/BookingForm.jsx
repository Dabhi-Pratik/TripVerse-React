import { useNavigate, useParams } from "react-router-dom";
import { trips } from "../../data/Trips";

import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Alert,
  Spinner,
} from "react-bootstrap";

import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/AuthContext";

import { db } from "../../config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useContext(authContext);

  const isPreview =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("preview") === "true";
  const currentUser =
    user ||
    (isPreview
      ? {
          displayName: "Alexander Wright",
          email: "alexander.wright@example.com",
          uid: "demo-traveler",
        }
      : null);

  const selectedTrip = trips.find((t) => t.id === Number(id));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    person: 1,
    total: 0,
    request: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Fill in the logged-in user's details
  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || currentUser.displayName || "",
        email: prev.email || currentUser.email || "",
        phone: prev.phone || (isPreview ? "9876543210" : ""),
        date: prev.date || (isPreview ? "2026-11-20" : ""),
        person: prev.person || 2,
      }));
    }
  }, [currentUser, isPreview]);

  // Calculate the total booking price
  useEffect(() => {
    if (!selectedTrip) return;

    setFormData((prev) => ({
      ...prev,
      total: selectedTrip.price * Number(prev.person || 0),
    }));
  }, [formData.person, selectedTrip]);

  const handleChange = (field, e) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePersonChange = (increment) => {
    setFormData((prev) => {
      const nextPerson = Math.max(1, Number(prev.person || 1) + increment);
      return {
        ...prev,
        person: nextPerson,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (loading) {
      setError("Please wait while we verify your login.");
      return;
    }

    if (!user) {
      navigate("/auth");
      return;
    }

    if (!selectedTrip) {
      setError("The selected trip could not be found.");
      return;
    }

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.date
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone.trim())) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (
      new Date(formData.date + "T00:00:00") <
      new Date(new Date().toDateString())
    ) {
      setError("Please select today or a future travel date.");
      return;
    }

    const personCount = Number(formData.person);

    if (!Number.isInteger(personCount) || personCount < 1) {
      setError("Number of travelers must be at least 1.");
      return;
    }

    setSubmitting(true);

    try {
      const total = selectedTrip.price * personCount;

      await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        date: formData.date,
        person: personCount,
        total,
        request: formData.request.trim(),
        tripId: selectedTrip.id,
        tripName: selectedTrip.name,
        tripPrice: selectedTrip.price,
        tripImage: selectedTrip.image,
        destination: selectedTrip.destination || "",
        createdAt: serverTimestamp(),
      });

      alert("🎉 Trip booked successfully! Redirecting to your bookings...");
      navigate("/myBookings");
    } catch (err) {
      console.error("Booking error:", err);
      setError(
        "Unable to save your booking. Please check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Wait for Firebase authentication to resolve
  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-secondary">Checking authentication...</p>
      </Container>
    );
  }

  // Handle an invalid trip ID
  if (!selectedTrip) {
    return (
      <div className="tv-booking-page">
        <Container className="text-center py-5">
          <div className="tv-empty-state">
            <div className="tv-empty-state-icon">🗺️</div>
            <h4>Trip not found</h4>
            <p>The trip you are attempting to book could not be found.</p>
            <Button
              className="tv-btn-primary"
              style={{ width: "auto" }}
              onClick={() => navigate("/trips")}
            >
              ← Back to All Trips
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  // Require login before booking
  if (!currentUser) {
    return (
      <div className="tv-booking-page">
        <Container className="text-center py-5">
          <div className="tv-form-card p-5 mx-auto" style={{ maxWidth: "540px" }}>
            <div style={{ fontSize: "3.5rem" }} className="mb-3">🔐</div>
            <h3 className="mb-2">Login Required</h3>
            <p className="text-secondary mb-4">
              Please sign in to your TripVerse account to complete your reservation.
            </p>
            <Button
              className="tv-btn-primary"
              style={{ width: "auto", padding: "0.75rem 2.5rem" }}
              onClick={() => navigate("/auth")}
            >
              Sign In / Register →
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="tv-booking-page">
      <Container>
        {/* Navigation Breadcrumb / Back button */}
        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
          <Button
            variant="link"
            className="text-decoration-none p-0 d-inline-flex align-items-center text-secondary fw-semibold"
            onClick={() => navigate(`/trips/${selectedTrip.id}`)}
          >
            ← Back to Trip Details
          </Button>

          <span
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--tv-success)",
              background: "rgba(16,185,129,0.12)",
              padding: "0.35rem 0.9rem",
              borderRadius: "var(--tv-radius-full)",
            }}
          >
            🔒 Guaranteed Best Rates
          </span>
        </div>

        <Row className="g-4">
          {/* Left: Sticky Trip Summary Card */}
          <Col lg={5}>
            <div className="tv-booking-trip-card bg-white">
              <div style={{ position: "relative", height: "260px", overflow: "hidden" }}>
                <img
                  src={selectedTrip.image}
                  alt={selectedTrip.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "1rem",
                    left: "1.2rem",
                    right: "1.2rem",
                    color: "#fff",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      background: "rgba(255,255,255,0.25)",
                      backdropFilter: "blur(6px)",
                      padding: "0.25rem 0.65rem",
                      borderRadius: "var(--tv-radius-full)",
                      display: "inline-block",
                      marginBottom: "0.4rem",
                    }}
                  >
                    📍 {selectedTrip.destination}
                  </span>
                  <h4 className="fw-bold mb-0 text-white" style={{ fontFamily: "Playfair Display, serif" }}>
                    {selectedTrip.name}
                  </h4>
                </div>
              </div>

              <div className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                  <div>
                    <span className="text-muted d-block small">Duration</span>
                    <strong>🕐 {selectedTrip.duration}</strong>
                  </div>
                  {selectedTrip.rating && (
                    <div className="text-end">
                      <span className="text-muted d-block small">Rating</span>
                      <strong>⭐ {selectedTrip.rating} / 5.0</strong>
                    </div>
                  )}
                </div>

                {/* Price Display */}
                <div className="mb-4">
                  <span className="text-muted small d-block mb-1">Standard Rate</span>
                  <div className="d-flex align-items-baseline gap-2">
                    <span className="tv-price-badge">
                      ₹{Number(selectedTrip.price).toLocaleString("en-IN")}
                    </span>
                    <span className="text-muted small">/ per traveler</span>
                  </div>
                </div>

                {/* Inclusions summary */}
                <div
                  className="p-3 rounded-3 mb-4"
                  style={{ background: "rgba(10,111,216,0.04)", border: "1px solid rgba(10,111,216,0.1)" }}
                >
                  <div className="fw-bold small text-uppercase text-primary mb-2" style={{ letterSpacing: "0.05em" }}>
                    ✨ What's Included
                  </div>
                  <div className="small text-secondary d-flex flex-column gap-1">
                    <div>✓ 4★ & 5★ Handpicked Accommodations</div>
                    <div>✓ Daily Breakfast & Welcome Dinner</div>
                    <div>✓ Certified Professional Tour Guide</div>
                    <div>✓ Sightseeing Transfers & Entrance Passes</div>
                  </div>
                </div>

                {/* Real-time price breakdown */}
                <div className="tv-total-display">
                  <div className="small text-uppercase fw-semibold text-secondary mb-1" style={{ fontSize: "0.75rem" }}>
                    Total Estimated Payable
                  </div>
                  <div className="text-primary fw-bold" style={{ fontSize: "1.85rem" }}>
                    ₹{Number(formData.total || 0).toLocaleString("en-IN")}
                  </div>
                  <div className="small text-muted fw-normal" style={{ fontSize: "0.8rem" }}>
                    ({formData.person} {formData.person === 1 ? "Traveler" : "Travelers"} × ₹{Number(selectedTrip.price).toLocaleString("en-IN")})
                  </div>
                </div>
              </div>
            </div>
          </Col>

          {/* Right: Booking Form */}
          <Col lg={7}>
            <div className="tv-form-card">
              <div className="tv-form-card-body">
                <div className="mb-4 pb-2 border-bottom">
                  <h2 className="tv-booking-page-title">Confirm Your Trip</h2>
                  <p className="text-secondary small mb-0">
                    Fill in your travel group details to reserve your place. No instant charges.
                  </p>
                </div>

                {error && (
                  <Alert
                    variant="danger"
                    dismissible
                    onClose={() => setError("")}
                    className="border-0 shadow-sm"
                  >
                    ⚠️ {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  {/* Step 1: Personal Details */}
                  <div className="mb-4">
                    <div
                      className="text-uppercase small fw-bold text-primary mb-3"
                      style={{ letterSpacing: "0.06em" }}
                    >
                      👤 Primary Traveler Details
                    </div>

                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="tv-form-label">Full Name *</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="e.g. John Doe"
                            className="tv-form-control"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e)}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="tv-form-label">Email Address *</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="e.g. john@example.com"
                            className="tv-form-control"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e)}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="tv-form-label">Phone Number *</Form.Label>
                          <Form.Control
                            type="tel"
                            placeholder="10-digit mobile number"
                            className="tv-form-control"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e)}
                            pattern="[0-9]{10}"
                            maxLength={10}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="tv-form-label">Departure Date *</Form.Label>
                          <Form.Control
                            type="date"
                            min={new Date().toLocaleDateString("en-CA")}
                            className="tv-form-control"
                            value={formData.date}
                            onChange={(e) => handleChange("date", e)}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>

                  {/* Step 2: Traveler Count */}
                  <div className="mb-4">
                    <div
                      className="text-uppercase small fw-bold text-primary mb-3"
                      style={{ letterSpacing: "0.06em" }}
                    >
                      👥 Group Size
                    </div>

                    <div className="d-flex align-items-center gap-3 p-3 rounded-3" style={{ background: "#f8fafd", border: "1.5px solid rgba(0,0,0,0.06)" }}>
                      <div className="flex-grow-1">
                        <div className="fw-semibold">Number of Travelers</div>
                        <div className="small text-muted">All ages welcome (includes guide and accommodation)</div>
                      </div>

                      <div className="d-flex align-items-center gap-2">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          style={{ width: "38px", height: "38px", borderRadius: "50%", padding: 0 }}
                          onClick={() => handlePersonChange(-1)}
                          disabled={formData.person <= 1}
                        >
                          -
                        </Button>
                        <span className="fw-bold fs-5 px-2" style={{ minWidth: "30px", textAlign: "center" }}>
                          {formData.person}
                        </span>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          style={{ width: "38px", height: "38px", borderRadius: "50%", padding: 0 }}
                          onClick={() => handlePersonChange(1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Special Requests */}
                  <div className="mb-4">
                    <div
                      className="text-uppercase small fw-bold text-primary mb-3"
                      style={{ letterSpacing: "0.06em" }}
                    >
                      📝 Custom Requirements
                    </div>

                    <Form.Group>
                      <Form.Label className="tv-form-label">Special Requests (Optional)</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        className="tv-form-control"
                        placeholder="Dietary preferences, airport pick-up, room preferences, etc."
                        value={formData.request}
                        onChange={(e) => handleChange("request", e)}
                      />
                    </Form.Group>
                  </div>

                  {/* Trust badges */}
                  <div className="d-flex flex-wrap gap-3 p-3 mb-4 rounded-3 small text-muted" style={{ background: "#f8f9fa" }}>
                    <div className="d-flex align-items-center gap-1">
                      <span>🔒</span> 256-bit Secure
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <span>⚡</span> Instant Confirmation
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <span>🔄</span> Free Date Change
                    </div>
                  </div>

                  {/* Submit Actions */}
                  <div className="d-flex flex-wrap gap-3">
                    <Button
                      type="button"
                      variant="outline-secondary"
                      className="rounded-pill px-4 fw-semibold"
                      onClick={() => navigate(-1)}
                      disabled={submitting}
                    >
                      ← Back
                    </Button>

                    <Button
                      type="submit"
                      className="tv-btn-primary flex-grow-1"
                      style={{ padding: "0.75rem 2rem", fontSize: "1.05rem" }}
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Spinner
                            size="sm"
                            animation="border"
                            className="me-2"
                          />
                          Confirming Reservation...
                        </>
                      ) : (
                        `Confirm Booking • ₹${Number(formData.total || 0).toLocaleString("en-IN")}`
                      )}
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BookingForm;
