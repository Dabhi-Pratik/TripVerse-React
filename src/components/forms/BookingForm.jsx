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
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.displayName || "",
        email: user.email || "",
      }));
    }
  }, [user]);

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
        createdAt: serverTimestamp(),
      });

      alert("Trip booked successfully!");

      navigate("/");
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
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-3">Checking authentication...</p>
      </Container>
    );
  }

  // Handle an invalid trip ID
  if (!selectedTrip) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="warning">Trip not found.</Alert>
        <Button onClick={() => navigate("/trips")}>Back to Trips</Button>
      </Container>
    );
  }

  // Require login before booking
  if (!user) {
    return (
      <Container className="text-center mt-5">
        <h3>Please log in to book this trip.</h3>
        <Button className="mt-3" onClick={() => navigate("/auth")}>
          Login
        </Button>
      </Container>
    );
  }

  return (
    <Container className="pb-5">
      <Row className="g-4">
        {/* Selected trip details */}
        <Col md={5} className="mt-5">
          <Card className="shadow rounded-4 overflow-hidden">
            <Card.Img
              variant="top"
              src={selectedTrip.image}
              alt={selectedTrip.name}
              className="img-fluid"
              style={{
                height: "300px",
                objectFit: "cover",
              }}
            />

            <Card.Body className="d-flex flex-column align-items-center">
              <Card.Title className="fs-3 text-center">
                {selectedTrip.name}
              </Card.Title>

              <Card.Text>{selectedTrip.destination}</Card.Text>
              <Card.Text>{selectedTrip.duration}</Card.Text>

              <Badge bg="success" className="p-2">
                <h4 className="mb-0">₹ {selectedTrip.price} / person</h4>
              </Badge>
            </Card.Body>
          </Card>
        </Col>

        {/* Booking form */}
        <Col md={7} className="mt-5">
          <Card className="shadow rounded-4">
            <Card.Body className="p-4">
              <h3 className="mb-4">Book Your Trip</h3>

              {error && (
                <Alert
                  variant="danger"
                  dismissible
                  onClose={() => setError("")}
                >
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Traveler Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e)}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="10-digit phone number"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e)}
                        pattern="[0-9]{10}"
                        maxLength={10}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Travel Date</Form.Label>
                      <Form.Control
                        type="date"
                        min={new Date().toLocaleDateString("en-CA")}
                        value={formData.date}
                        onChange={(e) => handleChange("date", e)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Number of Travelers</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        step="1"
                        value={formData.person}
                        onChange={(e) => handleChange("person", e)}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Grand Total (₹)</Form.Label>
                      <Form.Control
                        type="number"
                        value={formData.total}
                        readOnly
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Special Request (Optional)</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter any special requirements"
                        value={formData.request}
                        onChange={(e) => handleChange("request", e)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex flex-wrap gap-3 mt-4">
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() => navigate(-1)}
                    disabled={submitting}
                  >
                    Back to Trips
                  </Button>

                  <Button variant="primary" type="submit" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Spinner
                          size="sm"
                          animation="border"
                          className="me-2"
                        />
                        Booking...
                      </>
                    ) : (
                      "Confirm Booking"
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingForm;
