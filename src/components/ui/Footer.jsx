import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing! Check your inbox for exclusive travel offers.");
    e.target.reset();
  };

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #0a0f1e 0%, #060913 100%)",
        color: "#cbd5e1",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        paddingTop: "4.5rem",
        paddingBottom: "2rem",
      }}
    >
      <Container>
        <Row className="gy-4 gx-5 mb-5">
          {/* Brand info */}
          <Col lg={4} md={6}>
            <div
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "1.9rem",
                fontWeight: 800,
                background: "linear-gradient(135deg, #ffffff 30%, #93c5fd 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "1rem",
                display: "inline-block",
              }}
            >
              TripVerse
            </div>
            <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.7 }} className="mb-4">
              Discover breathtaking destinations, curated itineraries, and seamless booking experiences. The world is waiting for your story.
            </p>

            <div className="d-flex gap-2">
              {["✈️", "📸", "🌍", "💬"].map((emoji, idx) => (
                <div
                  key={idx}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--tv-primary)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} sm={6} xs={6}>
            <h6
              className="text-white text-uppercase fw-bold mb-3"
              style={{ fontSize: "0.85rem", letterSpacing: "0.08em" }}
            >
              Navigation
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: "0.92rem" }}>
              <li>
                <NavLink to="/" className="text-decoration-none" style={{ color: "#94a3b8" }}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/trips" className="text-decoration-none" style={{ color: "#94a3b8" }}>
                  Explore Trips
                </NavLink>
              </li>
              <li>
                <NavLink to="/myBookings" className="text-decoration-none" style={{ color: "#94a3b8" }}>
                  My Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/auth" className="text-decoration-none" style={{ color: "#94a3b8" }}>
                  Account Login
                </NavLink>
              </li>
            </ul>
          </Col>

          {/* Destinations */}
          <Col lg={2} sm={6} xs={6}>
            <h6
              className="text-white text-uppercase fw-bold mb-3"
              style={{ fontSize: "0.85rem", letterSpacing: "0.08em" }}
            >
              Destinations
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: "0.92rem", color: "#94a3b8" }}>
              <li>Bali, Indonesia</li>
              <li>Swiss Alps</li>
              <li>Kyoto, Japan</li>
              <li>Amalfi Coast, Italy</li>
              <li>Santorini, Greece</li>
            </ul>
          </Col>

          {/* Newsletter subscription */}
          <Col lg={4} md={6}>
            <h6
              className="text-white text-uppercase fw-bold mb-3"
              style={{ fontSize: "0.85rem", letterSpacing: "0.08em" }}
            >
              Stay Inspired
            </h6>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem" }} className="mb-3">
              Subscribe to get secret travel deals, seasonal discounts, and handpicked destination guides.
            </p>

            <Form onSubmit={handleNewsletterSubmit}>
              <div className="d-flex gap-2">
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  required
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "var(--tv-radius-md)",
                    color: "#fff",
                    fontSize: "0.9rem",
                    padding: "0.6rem 0.9rem",
                  }}
                />
                <Button
                  type="submit"
                  className="tv-btn-login text-nowrap"
                  style={{ borderRadius: "var(--tv-radius-md)", padding: "0.6rem 1.2rem" }}
                >
                  Join
                </Button>
              </div>
            </Form>
          </Col>
        </Row>

        {/* Bottom copyright and legal */}
        <div
          className="d-flex flex-wrap justify-content-between align-items-center pt-4 border-top"
          style={{ borderColor: "rgba(255,255,255,0.08) !important", fontSize: "0.85rem", color: "#64748b" }}
        >
          <div>© {new Date().getFullYear()} TripVerse Inc. All rights reserved.</div>
          <div className="d-flex gap-3 mt-2 mt-sm-0">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Support</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
