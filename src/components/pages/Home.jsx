import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Image, Container, Row, Col, Button, Form, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { trips } from "../../data/Trips";

function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/trips?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/trips");
    }
  };

  // Top 4 featured trips for the showcase
  const featuredTrips = trips.slice(0, 4);

  const features = [
    {
      icon: "🎯",
      title: "Handcrafted Itineraries",
      desc: "Each route is meticulously planned by local travel connoisseurs for deep, authentic cultural immersion.",
    },
    {
      icon: "💎",
      title: "Best Rate Guarantee",
      desc: "Transparent rates without hidden fees. We match any verified lower price for the same itinerary.",
    },
    {
      icon: "🛡️",
      title: "Flexible & Insured",
      desc: "Free date adjustments up to 48 hours prior to departure, comprehensive protection, and seamless refunds.",
    },
    {
      icon: "⭐",
      title: "24/7 Personal Concierge",
      desc: "Dedicated real-time travel assistance from arrival to departure, wherever in the world you roam.",
    },
  ];

  const testimonials = [
    {
      name: "Sophia Martinez",
      location: "San Francisco, USA",
      trip: "Swiss Alps Adventure",
      rating: 5,
      review:
        "The Swiss Alps tour exceeded every single expectation. The Glacier Express views, our private guide, and the boutique chalet in Zermatt were pure perfection!",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    },
    {
      name: "Alexander Wright",
      location: "London, UK",
      trip: "Tropical Bali Escape",
      rating: 5,
      review:
        "Booking through TripVerse was completely effortless. From airport pickup to the private temple blessings in Ubud, everything felt tailored just for us.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    {
      name: "Ananya Patel",
      location: "Mumbai, India",
      trip: "Santorini Island Retreat",
      rating: 5,
      review:
        "Watching the sunset in Oia from our cliffside hotel was a dream come true. The customer support team was always available within minutes!",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <div>
      {/* 1. Hero Carousel */}
      <Carousel fade className="tv-hero-carousel">
        <Carousel.Item style={{ height: "88vh", minHeight: "550px" }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            src="https://www.pexels.com/download/video/5735794/"
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
          />

          <Carousel.Caption>
            <span
              style={{
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
                padding: "0.35rem 1rem",
                borderRadius: "var(--tv-radius-full)",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                display: "inline-block",
                marginBottom: "0.75rem",
              }}
            >
              ✨ Curated Luxury Journeys
            </span>
            <h3>Explore the World Beyond Limits</h3>
            <p>
              Discover breathtaking destinations, hidden gems, and unforgettable experiences with our handpicked travel collections.
            </p>
            <div className="d-flex flex-wrap gap-3 mt-3">
              <Button
                className="tv-btn-primary"
                style={{ width: "auto", padding: "0.75rem 2rem", fontSize: "1rem" }}
                onClick={() => navigate("/trips")}
              >
                Explore Destinations →
              </Button>
              <Button
                variant="outline-light"
                className="rounded-pill px-4 fw-semibold"
                style={{ backdropFilter: "blur(6px)" }}
                onClick={() => navigate("/auth")}
              >
                Join TripVerse
              </Button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item style={{ height: "88vh", minHeight: "550px" }}>
          <Image
            src="https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg"
            alt="slide-2"
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
          />
          <Carousel.Caption>
            <span
              style={{
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
                padding: "0.35rem 1rem",
                borderRadius: "var(--tv-radius-full)",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                display: "inline-block",
                marginBottom: "0.75rem",
              }}
            >
              🏝️ Tropical Escapes
            </span>
            <h3>Discover Serene Island Paradises</h3>
            <p>
              From crystal-clear beaches in Bali to dramatic Mediterranean coastlines, rejuvenate your senses in unparalleled luxury.
            </p>
            <Button
              className="tv-btn-primary mt-3"
              style={{ width: "auto", padding: "0.75rem 2rem", fontSize: "1rem" }}
              onClick={() => navigate("/trips")}
            >
              Start Your Journey →
            </Button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item style={{ height: "88vh", minHeight: "550px" }}>
          <Image
            src="https://images.pexels.com/photos/2649403/pexels-photo-2649403.jpeg"
            alt="third-slide"
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
          />
          <Carousel.Caption>
            <span
              style={{
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
                padding: "0.35rem 1rem",
                borderRadius: "var(--tv-radius-full)",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                display: "inline-block",
                marginBottom: "0.75rem",
              }}
            >
              🏔️ Mountain Expeditions
            </span>
            <h3>Majestic Peaks & Alpine Trails</h3>
            <p>
              Ascend to cloud-level vistas, traverse ancient paths, and create memories that echo across lifetimes.
            </p>
            <Button
              className="tv-btn-primary mt-3"
              style={{ width: "auto", padding: "0.75rem 2rem", fontSize: "1rem" }}
              onClick={() => navigate("/trips")}
            >
              View Mountain Trips →
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* 2. Floating Search / Filter Bar */}
      <Container className="tv-search-banner">
        <div className="tv-search-box">
          <Form onSubmit={handleSearch}>
            <Row className="g-3 align-items-center">
              <Col lg={5} md={6}>
                <div className="d-flex align-items-center gap-2">
                  <span style={{ fontSize: "1.4rem" }}>🔍</span>
                  <div className="flex-grow-1">
                    <Form.Label className="tv-form-label mb-1">Where do you want to go?</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. Paris, Bali, Switzerland, Tokyo..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border-0 p-0 shadow-none fw-semibold"
                      style={{ fontSize: "1rem", background: "transparent" }}
                    />
                  </div>
                </div>
              </Col>

              <Col lg={4} md={6}>
                <div className="d-flex align-items-center gap-2 border-start-md ps-md-3">
                  <span style={{ fontSize: "1.4rem" }}>✨</span>
                  <div>
                    <Form.Label className="tv-form-label mb-1">Experience Type</Form.Label>
                    <div className="small text-secondary fw-semibold">
                      Luxury Retreats • Cultural • Nature
                    </div>
                  </div>
                </div>
              </Col>

              <Col lg={3} xs={12}>
                <Button
                  type="submit"
                  className="tv-btn-primary w-100"
                  style={{ padding: "0.75rem 1.5rem" }}
                >
                  Search Adventures
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>

      {/* 3. Why Choose TripVerse Section */}
      <section className="py-5" style={{ marginTop: "2rem" }}>
        <Container>
          <div className="text-center mb-5">
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--tv-primary)",
                background: "rgba(10,111,216,0.08)",
                padding: "0.3rem 0.9rem",
                borderRadius: "var(--tv-radius-full)",
                display: "inline-block",
                marginBottom: "0.6rem",
              }}
            >
              Why TripVerse
            </span>
            <h2
              className="fw-bold"
              style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 3.5vw, 2.7rem)" }}
            >
              Travel Designed for Discerning Explorers
            </h2>
            <p className="text-secondary mx-auto mt-2" style={{ maxWidth: "580px" }}>
              We eliminate the stress of planning and guarantee exceptional stays, unforgettable local encounters, and complete peace of mind.
            </p>
          </div>

          <Row className="g-4">
            {features.map((feat, idx) => (
              <Col key={idx} xs={12} sm={6} lg={3}>
                <div className="tv-feature-card">
                  <div className="tv-feature-icon">{feat.icon}</div>
                  <h5 className="fw-bold mb-2">{feat.title}</h5>
                  <p className="text-secondary small mb-0" style={{ lineHeight: 1.65 }}>
                    {feat.desc}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* 4. Trending Destinations Showcase */}
      <section className="py-5" style={{ background: "rgba(10,111,216,0.02)" }}>
        <Container>
          <div className="d-flex flex-wrap justify-content-between align-items-end mb-4 gap-3">
            <div>
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--tv-primary)",
                  background: "rgba(10,111,216,0.08)",
                  padding: "0.3rem 0.9rem",
                  borderRadius: "var(--tv-radius-full)",
                  display: "inline-block",
                  marginBottom: "0.6rem",
                }}
              >
                Top Rated This Season
              </span>
              <h2
                className="fw-bold mb-0"
                style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
              >
                Trending Adventures
              </h2>
            </div>

            <Button
              variant="outline-primary"
              className="rounded-pill px-4 fw-semibold"
              onClick={() => navigate("/trips")}
            >
              View All {trips.length} Experiences →
            </Button>
          </div>

          <Row className="g-4">
            {featuredTrips.map((t) => (
              <Col key={t.id} xs={12} sm={6} lg={3}>
                <div
                  className="tv-trip-card"
                  onClick={() => navigate(`/trips/${t.id}`)}
                >
                  <div className="tv-trip-card-img-wrap">
                    <img src={t.image} alt={t.name} />
                  </div>
                  <div className="tv-trip-card-body">
                    <div className="tv-trip-card-title">{t.name}</div>
                    <div className="tv-trip-card-dest">📍 {t.destination}</div>
                    <div
                      style={{
                        fontSize: "0.82rem",
                        color: "var(--tv-text-muted)",
                        marginBottom: "0.8rem",
                      }}
                    >
                      🕐 {t.duration}
                      <span style={{ marginLeft: "0.75rem" }}>⭐ {t.rating}</span>
                    </div>

                    <div
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: 800,
                        color: "var(--tv-primary)",
                        marginBottom: "1rem",
                      }}
                    >
                      ₹{Number(t.price).toLocaleString("en-IN")}
                      <span
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 500,
                          color: "var(--tv-text-muted)",
                          marginLeft: "4px",
                        }}
                      >
                        / person
                      </span>
                    </div>

                    <Button className="tv-btn-primary">View Itinerary →</Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* 5. Statistics Banner */}
      <section className="py-5">
        <Container>
          <div className="tv-stats-section">
            <Row className="g-4 text-center">
              <Col xs={6} md={3}>
                <div className="tv-stat-num">50,000+</div>
                <div className="text-white-50 small fw-semibold text-uppercase" style={{ letterSpacing: "0.08em" }}>
                  Happy Travelers
                </div>
              </Col>
              <Col xs={6} md={3}>
                <div className="tv-stat-num">16+</div>
                <div className="text-white-50 small fw-semibold text-uppercase" style={{ letterSpacing: "0.08em" }}>
                  Global Wonders
                </div>
              </Col>
              <Col xs={6} md={3}>
                <div className="tv-stat-num">4.9 / 5</div>
                <div className="text-white-50 small fw-semibold text-uppercase" style={{ letterSpacing: "0.08em" }}>
                  Average Rating
                </div>
              </Col>
              <Col xs={6} md={3}>
                <div className="tv-stat-num">24 / 7</div>
                <div className="text-white-50 small fw-semibold text-uppercase" style={{ letterSpacing: "0.08em" }}>
                  Concierge Support
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* 6. Traveler Testimonials */}
      <section className="py-5" style={{ background: "rgba(10,111,216,0.02)" }}>
        <Container>
          <div className="text-center mb-5">
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--tv-primary)",
                background: "rgba(10,111,216,0.08)",
                padding: "0.3rem 0.9rem",
                borderRadius: "var(--tv-radius-full)",
                display: "inline-block",
                marginBottom: "0.6rem",
              }}
            >
              Real Stories
            </span>
            <h2
              className="fw-bold"
              style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 3.5vw, 2.7rem)" }}
            >
              Loved by Travelers Worldwide
            </h2>
          </div>

          <Row className="g-4">
            {testimonials.map((item, idx) => (
              <Col key={idx} md={4}>
                <div className="tv-testimonial-card">
                  <div className="d-flex align-items-center gap-1 text-warning mb-3">
                    {"★".repeat(item.rating)}
                  </div>
                  <p className="text-secondary small fst-italic mb-4 flex-grow-1" style={{ lineHeight: 1.7 }}>
                    "{item.review}"
                  </p>

                  <div className="d-flex align-items-center gap-3 pt-3 border-top">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover" }}
                    />
                    <div>
                      <div className="fw-bold small text-dark">{item.name}</div>
                      <div className="text-muted" style={{ fontSize: "0.78rem" }}>
                        📍 {item.trip}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* 7. Call To Action Banner */}
      <section className="py-5">
        <Container>
          <div className="tv-cta-banner text-center text-lg-start">
            <Row className="align-items-center gy-4">
              <Col lg={8}>
                <span
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(6px)",
                    padding: "0.35rem 0.9rem",
                    borderRadius: "var(--tv-radius-full)",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    display: "inline-block",
                    marginBottom: "0.9rem",
                  }}
                >
                  🚀 Start Exploring Today
                </span>
                <h2
                  className="fw-bold text-white mb-2"
                  style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}
                >
                  Your Next Great Journey Awaits
                </h2>
                <p className="text-white-50 mb-0" style={{ maxWidth: "600px", fontSize: "1.05rem" }}>
                  Join thousands of adventurers who discover paradise with TripVerse. Secure your reservation today with our Best Price Guarantee.
                </p>
              </Col>

              <Col lg={4} className="text-lg-end">
                <Button
                  className="tv-btn-login px-4 py-3 fs-6"
                  style={{ background: "#ffffff !important",}}
                  onClick={() => navigate("/trips")}
                >
                  Browse All Trips Now →
                </Button>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Home;
