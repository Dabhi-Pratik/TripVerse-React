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

  useEffect(() => {
    if (loading) return;

    if (!user) {
      setBookings([]);
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
              : "Unable to load your bookings. Please try again.",
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
  }, [user, loading]);

  // Authentication is still being checked
  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-3">Checking authentication...</p>
      </Container>
    );
  }

  // User must be logged in
  if (!user) {
    return (
      <Container className="text-center py-5">
        <h3>Please log in to view your bookings.</h3>

        <Button className="mt-3" onClick={() => navigate("/auth")}>
          Login
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <h2 className="mb-0">My Bookings</h2>

        <Button onClick={() => navigate("/trips")}>Book a New Trip</Button>
      </div>

      {/* Loading */}
      {loadingBookings && (
        <div className="text-center py-5">
          <Spinner animation="border" />
          <p className="mt-3">Loading your bookings...</p>
        </div>
      )}

      {/* Error */}
      {!loadingBookings && error && (
        <Alert variant="danger">
          <Alert.Heading>Unable to load bookings</Alert.Heading>
          <p className="mb-3">{error}</p>

          <Button
            variant="outline-danger"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </Alert>
      )}

      {/* Empty state */}
      {!loadingBookings && !error && bookings.length === 0 && (
        <div className="text-center py-5">
          <h4>No bookings found.</h4>
          <p className="text-secondary">You haven't booked any trips yet.</p>

          <Button onClick={() => navigate("/trips")}>Explore Trips</Button>
        </div>
      )}

      {/* Booking cards */}
      {!loadingBookings && !error && bookings.length > 0 && (
        <Row className="g-4">
          {bookings.map((booking) => {
            const matchingTrip = trips.find(
              (trip) => trip.id === Number(booking.tripId),
            );

            const image = booking.tripImage || matchingTrip?.image;

            return (
              <Col key={booking.id} xs={12} md={6} lg={4}>
                <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                  {image && (
                    <Card.Img
                      variant="top"
                      src={image}
                      alt={booking.tripName || "Booked trip"}
                      style={{
                        height: "210px",
                        objectFit: "cover",
                      }}
                    />
                  )}

                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fs-4">
                      {booking.tripName || "Trip Booking"}
                    </Card.Title>

                    <div className="mb-3">
                      <Badge bg="success">Booking Confirmed</Badge>
                    </div>

                    <Card.Text className="mb-2">
                      <strong>Traveler:</strong> {booking.name}
                    </Card.Text>

                    <Card.Text className="mb-2">
                      <strong>Email:</strong> {booking.email}
                    </Card.Text>

                    <Card.Text className="mb-2">
                      <strong>Phone:</strong> {booking.phone}
                    </Card.Text>

                    <Card.Text className="mb-2">
                      <strong>Travel Date:</strong> {booking.date}
                    </Card.Text>

                    <Card.Text className="mb-2">
                      <strong>Travelers:</strong> {booking.person}
                    </Card.Text>

                    <Card.Text className="mb-2">
                      <strong>Price per person:</strong> ₹
                      {Number(booking.tripPrice || 0).toLocaleString("en-IN")}
                    </Card.Text>

                    <Card.Text className="fw-bold fs-5 mb-2">
                      Total: ₹
                      {Number(booking.total || 0).toLocaleString("en-IN")}
                    </Card.Text>

                    {booking.request && (
                      <Card.Text className="mb-3">
                        <strong>Special Request:</strong> {booking.request}
                      </Card.Text>
                    )}

                    <div className="mt-auto pt-3">
                      <Button
                        variant="outline-primary"
                        className="w-100"
                        onClick={() => navigate(`/trips/${booking.tripId}`)}
                      >
                        View Trip Details
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
  );
};

export default MyBookings;
