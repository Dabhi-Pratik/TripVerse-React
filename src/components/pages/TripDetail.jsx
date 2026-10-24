import React from "react";
import { trips } from "../../data/Trips";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Accordion,
  Button,
  Badge,
} from "react-bootstrap";

const TripDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const trip = trips.find((t) => t.id === Number(id));

  const handleBooking = () => {
    navigate(`/booking/${id}`);
  };

  if (!trip) {
    return (
      <Container className="text-center py-5">
        <div className="tv-empty-state">
          <div className="tv-empty-state-icon">🗺️</div>
          <h4>Trip not found</h4>
          <p>The trip you're looking for doesn't exist.</p>
          <Button className="tv-btn-primary" style={{ width: "auto" }} onClick={() => navigate("/trips")}>
            Browse Trips
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <div style={{ background: "var(--tv-bg)", paddingBottom: "4rem" }}>
      <Container>
        {/* Hero Image */}
        <Row className="mt-4">
          <Col>
            <div className="tv-detail-hero">
              <img
                src={trip.image}
                alt={trip.name}
                className="tv-detail-hero-img"
              />
              {/* Overlay gradient */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)",
                borderRadius: "var(--tv-radius-xl)",
                pointerEvents: "none",
              }} />
            </div>
          </Col>
        </Row>

        <Row className="mt-2">
          {/* Left: Trip Content */}
          <Col lg={8}>
            <h1 className="tv-detail-title">{trip.name}</h1>
            <p className="tv-detail-subtitle">📍 {trip.destination}</p>

            {/* Badges */}
            <div className="d-flex flex-wrap gap-2 mb-4">
              {trip.duration && (
                <Badge style={{
                  background: "rgba(10,111,216,0.1)", color: "var(--tv-primary)",
                  border: "1px solid rgba(10,111,216,0.2)",
                  borderRadius: "var(--tv-radius-full)", fontSize: "0.82rem",
                  fontWeight: 600, padding: "0.4rem 0.9rem",
                }}>
                  🕐 {trip.duration}
                </Badge>
              )}
              {trip.rating && (
                <Badge style={{
                  background: "rgba(245,158,11,0.12)", color: "var(--tv-warning)",
                  border: "1px solid rgba(245,158,11,0.25)",
                  borderRadius: "var(--tv-radius-full)", fontSize: "0.82rem",
                  fontWeight: 600, padding: "0.4rem 0.9rem",
                }}>
                  ⭐ {trip.rating} Rating
                </Badge>
              )}
              {trip.difficulty && (
                <Badge style={{
                  background: "rgba(16,185,129,0.1)", color: "var(--tv-success)",
                  border: "1px solid rgba(16,185,129,0.2)",
                  borderRadius: "var(--tv-radius-full)", fontSize: "0.82rem",
                  fontWeight: 600, padding: "0.4rem 0.9rem",
                }}>
                  🎯 {trip.difficulty}
                </Badge>
              )}
            </div>

            {/* Overview */}
            <div className="tv-info-card p-4 mb-3">
              <div className="tv-info-card-title">📋 Overview</div>
              <p style={{ color: "var(--tv-text-secondary)", lineHeight: 1.75, margin: 0 }}>
                {trip.overview}
              </p>
            </div>

            {/* Highlights */}
            <div className="tv-info-card p-4 mb-3">
              <div className="tv-info-card-title">✨ Trip Highlights</div>
              <ListGroup variant="flush">
                {trip.highlights.map((h, i) => (
                  <ListGroup.Item key={i} className="tv-listgroup-item">
                    ✅ {h}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>

            {/* Itinerary */}
            <div className="tv-info-card p-4 mb-3">
              <div className="tv-info-card-title">🗓️ Day-wise Itinerary</div>
              <Accordion flush className="tv-accordion">
                {trip.itinerary.map((item, index) => (
                  <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header>
                      <span style={{ fontWeight: 700, color: "var(--tv-primary)", marginRight: "0.5rem" }}>
                        Day {item.day}
                      </span>
                      {item.title}
                    </Accordion.Header>
                    <Accordion.Body>{item.description}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>

            {/* Inclusions & Exclusions */}
            <Row className="mb-3">
              <Col md={6} className="mb-3 mb-md-0">
                <div className="tv-info-card p-4 h-100">
                  <div className="tv-info-card-title">✅ Inclusions</div>
                  <ListGroup variant="flush">
                    {trip.inclusions.map((item, i) => (
                      <ListGroup.Item key={i} className="tv-listgroup-item">
                        ✓ {item}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              </Col>
              <Col md={6}>
                <div className="tv-info-card p-4 h-100" style={{ borderLeftColor: "var(--tv-danger)" }}>
                  <div className="tv-info-card-title" style={{ color: "var(--tv-danger)" }}>❌ Exclusions</div>
                  <ListGroup variant="flush">
                    {trip.exclusions.map((item, i) => (
                      <ListGroup.Item key={i} className="tv-listgroup-item">
                        ✗ {item}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              </Col>
            </Row>

            {/* Best Time */}
            {trip.bestTimeToVisit && (
              <div className="tv-info-card p-4 mb-4">
                <div className="tv-info-card-title">🌤️ Best Time to Visit</div>
                <p style={{ color: "var(--tv-text-secondary)", lineHeight: 1.7, margin: 0 }}>
                  {trip.bestTimeToVisit}
                </p>
              </div>
            )}

            <Button
              onClick={() => navigate(-1)}
              style={{
                background: "transparent",
                border: "1.5px solid rgba(0,0,0,0.15)",
                color: "var(--tv-text-primary)",
                borderRadius: "var(--tv-radius-md)",
                padding: "0.6rem 1.4rem",
                fontWeight: 600,
                transition: "var(--tv-transition)",
              }}
            >
              ← Back to Trips
            </Button>
          </Col>

          {/* Right: Booking Sidebar */}
          <Col lg={4} className="mt-4 mt-lg-0">
            <div className="tv-booking-sidebar sticky-top" style={{ top: "90px" }}>
              <div className="tv-booking-sidebar-header">
                <h3>₹{Number(trip.price).toLocaleString("en-IN")}</h3>
                <p>per person</p>
                <div style={{ fontSize: "0.85rem", opacity: 0.8, marginTop: "0.5rem" }}>
                  {trip.duration} • {trip.difficulty}
                </div>
              </div>
              <div className="tv-booking-sidebar-body">
                <div className="d-grid gap-2">
                  <Button
                    className="tv-btn-primary"
                    style={{ fontSize: "1rem", padding: "0.8rem" }}
                    onClick={handleBooking}
                  >
                    🎒 Book Now
                  </Button>
                  <Button
                    style={{
                      background: "transparent",
                      border: "1.5px solid rgba(0,0,0,0.12)",
                      color: "var(--tv-text-primary)",
                      borderRadius: "var(--tv-radius-md)",
                      padding: "0.75rem",
                      fontWeight: 600,
                      transition: "var(--tv-transition)",
                    }}
                  >
                    💬 Enquire
                  </Button>
                </div>
                <hr style={{ margin: "1.2rem 0", borderColor: "var(--tv-border)" }} />
                <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.9rem" }}>
                  <li style={{ padding: "0.4rem 0", color: "var(--tv-text-secondary)" }}>✅ Instant Confirmation</li>
                  <li style={{ padding: "0.4rem 0", color: "var(--tv-text-secondary)" }}>✅ Free Cancellation (48h)</li>
                  <li style={{ padding: "0.4rem 0", color: "var(--tv-text-secondary)" }}>✅ 24/7 Customer Support</li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TripDetail;
