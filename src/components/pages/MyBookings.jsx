
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
  Badge,
} from "react-bootstrap";

import { db } from "../../config/firebase";
import { authContext } from "../../context/AuthContext";
import { trips } from "../../data/Trips";

import { query, getDocs, collection, where, orderBy } from "firebase/firestore";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [error, setError] = useState("");

  const { user, loading } = useContext(authContext);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (loading) return;

    if (!currentUser) {
      setBookings([]);
      setLoadingBookings(false);
      return;
    }

    if (isPreview) {
      setBookings([
        {
          id: "TV-89421",
          tripId: 1,
          tripName: "Romantic Paris Getaway",
          destination: "Paris, France",
          image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg",
          name: "Alexander Wright",
          email: "alexander.wright@example.com",
          phone: "9876543210",
          date: "2026-11-15",
          person: 2,
          total: 215800,
          createdAt: { seconds: 1729700000 },
        },
        {
          id: "TV-74103",
          tripId: 4,
          tripName: "Swiss Alps Adventure",
          destination: "Zermatt, Switzerland",
          image: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
          name: "Alexander Wright",
          email: "alexander.wright@example.com",
          phone: "9876543210",
          date: "2026-12-20",
          person: 2,
          total: 298600,
          createdAt: { seconds: 1729600000 },
        },
      ]);
      setLoadingBookings(false);
      return;
    }

    let cancelled = false;

    const fetchBookings = async () => {
      setLoadingBookings(true);
      setError("");

      try {
        const bookingsQuery = query(
          collection(db, "bookings"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc"),
        );

        const snapshot = await getDocs(bookingsQuery);

        const bookingsData = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        if (!cancelled) {
          setBookings(bookingsData);
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);

        if (!cancelled) {
          setError(
            err.code === "failed-precondition"
              ? "Firestore index is required. Open the index creation link in your browser console and wait until the index is enabled."
              : "Unable to load your bookings. Please check your connection and try again.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingBookings(false);
        }
      }
    };

    fetchBookings();

    return () => {
      cancelled = true;
    };
  }, [currentUser, loading, isPreview, user]);

  // Authentication is still being checked
  if (loading) {
    return (
      <div className="tv-mybookings-page d-flex align-items-center justify-content-center">
        <Container className="text-center py-5">
          <Spinner animation="border" variant="primary" style={{ width: "3.5rem", height: "3.5rem" }} />
          <h5 className="mt-4 fw-bold">Checking authentication...</h5>
          <p className="text-secondary">Please wait a moment while we load your profile</p>
        </Container>
      </div>
    );
  }

  // User must be logged in
  if (!currentUser) {
    return (
      <div className="tv-mybookings-page">
        <Container className="text-center py-5">
          <div className="tv-form-card p-5 mx-auto" style={{ maxWidth: "520px" }}>
            <div style={{ fontSize: "3.5rem" }} className="mb-3">🔒</div>
            <h3 className="mb-2">Authentication Required</h3>
            <p className="text-secondary mb-4">
              Please sign in to view your itinerary, active reservations, and past trips.
            </p>
            <Button
              className="tv-btn-primary"
              style={{ width: "auto", padding: "0.75rem 2.5rem" }}
              onClick={() => navigate("/auth")}
            >
              Sign In to Your Account →
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="tv-mybookings-page">
      <Container>
        {/* Header section */}
        <div className="tv-mybookings-header d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <h2 className="mb-0 fw-bold">My Bookings</h2>
              {bookings.length > 0 && (
                <Badge
                  pill
                  bg="primary"
                  style={{
                    background: "var(--tv-gradient-primary) !important",
                    fontSize: "0.85rem",
                    padding: "0.4rem 0.8rem",
                  }}
                >
                  {bookings.length} {bookings.length === 1 ? "Trip" : "Trips"}
                </Badge>
              )}
            </div>
            <p className="text-secondary mb-0 small">
              Manage your confirmed travels, download itineraries, and plan upcoming adventures.
            </p>
          </div>

          <Button
            className="tv-btn-primary"
            style={{ width: "auto", padding: "0.6rem 1.6rem" }}
            onClick={() => navigate("/trips")}
          >
            + Book a New Trip
          </Button>
        </div>

        {/* Loading Spinner */}
        {loadingBookings && (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" style={{ width: "3rem", height: "3rem" }} />
            <p className="mt-3 text-secondary fw-semibold">Loading your travel bookings...</p>
          </div>
        )}

        {/* Error Alert */}
        {!loadingBookings && error && (
          <Alert variant="danger" className="rounded-4 p-4 shadow-sm border-0">
            <Alert.Heading className="fw-bold">Unable to load bookings</Alert.Heading>
            <p className="mb-3 text-secondary">{error}</p>
            <Button
              variant="outline-danger"
              className="rounded-pill px-4"
              onClick={() => window.location.reload()}
            >
              🔄 Try Again
            </Button>
          </Alert>
        )}

        {/* Empty state */}
        {!loadingBookings && !error && bookings.length === 0 && (
          <div className="tv-empty-state bg-white rounded-4 shadow-sm p-5 my-4">
            <div className="tv-empty-state-icon">🧭</div>
            <h3 className="fw-bold mb-2">No Adventures Booked Yet</h3>
            <p className="text-secondary mb-4 mx-auto" style={{ maxWidth: "420px" }}>
              Your passport is waiting! Explore our handpicked destinations and start booking unforgettable journeys today.
            </p>
            <Button
              className="tv-btn-primary"
              style={{ width: "auto", padding: "0.8rem 2.2rem" }}
              onClick={() => navigate("/trips")}
            >
              Discover Top Destinations →
            </Button>
          </div>
        )}

        {/* Booking cards grid */}
        {!loadingBookings && !error && bookings.length > 0 && (
          <Row className="g-4">
            {bookings.map((booking) => {
              const matchingTrip = trips.find(
                (trip) => trip.id === Number(booking.tripId),
              );

              const image =
                booking.tripImage || matchingTrip?.image || "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg";
              const destination = booking.destination || matchingTrip?.destination || "Global Destination";
              const duration = matchingTrip?.duration || "Multiple Days";

              return (
                <Col key={booking.id} xs={12} md={6} lg={4}>
                  <Card className="tv-booking-card h-100">
                    {/* Top Image Banner */}
                    <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                      <Card.Img
                        variant="top"
                        src={image}
                        alt={booking.tripName || "Booked trip"}
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                          transition: "transform 0.4s ease",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "1rem",
                          right: "1rem",
                        }}
                      >
                        <span className="tv-status-confirmed">
                          ● Confirmed
                        </span>
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          bottom: "0.85rem",
                          left: "1rem",
                          right: "1rem",
                          color: "#fff",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            letterSpacing: "0.06em",
                            background: "rgba(0,0,0,0.45)",
                            backdropFilter: "blur(4px)",
                            padding: "0.2rem 0.6rem",
                            borderRadius: "var(--tv-radius-full)",
                            display: "inline-block",
                            marginBottom: "0.25rem",
                          }}
                        >
                          📍 {destination}
                        </span>
                        <h5 className="fw-bold mb-0 text-white text-truncate">
                          {booking.tripName || "Trip Reservation"}
                        </h5>
                      </div>
                    </div>

                    {/* Card Body */}
                    <Card.Body className="d-flex flex-column p-4">
                      {/* Booking meta info */}
                      <div className="d-flex justify-content-between text-muted small pb-3 mb-3 border-bottom">
                        <span>
                          <strong>Ref:</strong> #{booking.id.slice(0, 8).toUpperCase()}
                        </span>
                        <span>
                          <strong>Duration:</strong> {duration}
                        </span>
                      </div>

                      {/* Details list */}
                      <div className="small mb-3 d-flex flex-column gap-2 text-secondary">
                        <div className="d-flex justify-content-between">
                          <span>👤 Traveler</span>
                          <strong className="text-dark">{booking.name}</strong>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>📅 Travel Date</span>
                          <strong className="text-dark">{booking.date}</strong>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>👥 Travelers</span>
                          <strong className="text-dark">
                            {booking.person} {booking.person === 1 ? "Person" : "Persons"}
                          </strong>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>💵 Rate / person</span>
                          <strong className="text-dark">
                            ₹{Number(booking.tripPrice || 0).toLocaleString("en-IN")}
                          </strong>
                        </div>
                        {booking.phone && (
                          <div className="d-flex justify-content-between">
                            <span>📱 Contact</span>
                            <span className="text-dark">{booking.phone}</span>
                          </div>
                        )}
                      </div>

                      {/* Special Request */}
                      {booking.request && (
                        <div
                          className="p-2 px-3 rounded-3 mb-3 small"
                          style={{ background: "#f8fafd", border: "1px dashed rgba(0,0,0,0.12)" }}
                        >
                          <span className="fw-semibold text-dark">Notes:</span>{" "}
                          <span className="text-muted">{booking.request}</span>
                        </div>
                      )}

                      {/* Total Amount Banner */}
                      <div className="tv-booking-total-bar mt-auto">
                        <span style={{ fontSize: "0.85rem", opacity: 0.9 }}>Total Paid / Due</span>
                        <span style={{ fontSize: "1.2rem", fontWeight: 800 }}>
                          ₹{Number(booking.total || 0).toLocaleString("en-IN")}
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-3 d-flex gap-2">
                        <Button
                          variant="outline-primary"
                          className="w-100 rounded-pill fw-semibold py-2"
                          size="sm"
                          onClick={() => navigate(`/trips/${booking.tripId}`)}
                        >
                          View Trip Itinerary →
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default MyBookings;
