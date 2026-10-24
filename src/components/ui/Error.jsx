import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--tv-bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
      }}
    >
      <Container>
        <Row className="justify-content-center text-center">
          <Col xs={12} md={8} lg={6}>
            <div className="tv-form-card p-5">
              <div style={{ fontSize: "4.5rem", lineHeight: 1 }} className="mb-3">
                🧭
              </div>

              <h1
                className="fw-bold mb-2"
                style={{
                  fontSize: "clamp(3.5rem, 8vw, 6rem)",
                  fontFamily: "Playfair Display, serif",
                  background: "var(--tv-gradient-primary)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1.1,
                }}
              >
                404
              </h1>

              <h3 className="fw-bold mb-3">Destination Not Found</h3>

              <p className="text-secondary mb-4 mx-auto" style={{ maxWidth: "420px" }}>
                It seems you have wandered off the beaten path. The page you are looking for has been moved or does not exist.
              </p>

              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Button
                  className="tv-btn-primary"
                  style={{ width: "auto", padding: "0.75rem 2rem" }}
                  onClick={() => navigate("/")}
                >
                  Return to Home
                </Button>

                <Button
                  variant="outline-secondary"
                  className="rounded-pill px-4 fw-semibold"
                  onClick={() => navigate("/trips")}
                >
                  Explore Trips →
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Error;
