import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { trips } from "../../data/Trips";
import { Container, Row, Col, Button, Form, Badge } from "react-bootstrap";

const Trips = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [search, setSearch] = useState(initialQuery);
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");

  const difficulties = ["All", "Easy", "Moderate", "Challenging"];

  // Filter and sort trips
  const filteredTrips = useMemo(() => {
    return trips
      .filter((t) => {
        const matchesSearch =
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.destination.toLowerCase().includes(search.toLowerCase()) ||
          (t.overview && t.overview.toLowerCase().includes(search.toLowerCase()));

        const matchesDifficulty =
          selectedDifficulty === "All" ||
          (t.difficulty && t.difficulty.toLowerCase() === selectedDifficulty.toLowerCase());

        return matchesSearch && matchesDifficulty;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
        return a.id - b.id; // recommended / default
      });
  }, [search, selectedDifficulty, sortBy]);

  const handleClearFilters = () => {
    setSearch("");
    setSelectedDifficulty("All");
    setSortBy("recommended");
    setSearchParams({});
  };

  return (
    <section className="tv-trips-section">
      <Container>
        {/* Header section */}
        <div className="tv-trips-header">
          <span
            style={{
              display: "inline-block",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--tv-primary)",
              background: "rgba(10,111,216,0.1)",
              padding: "0.3rem 0.9rem",
              borderRadius: "var(--tv-radius-full)",
              marginBottom: "0.75rem",
            }}
          >
            🌍 Handpicked Experiences
          </span>
          <h2>Explore Our Trips</h2>
          <p>Choose from our curated collection of world-class adventures</p>
        </div>

        {/* Filter & Search Bar */}
        <div
          className="p-3 p-md-4 rounded-4 bg-white shadow-sm mb-5"
          style={{ border: "1px solid var(--tv-border)" }}
        >
          <Row className="g-3 align-items-center">
            {/* Search Input */}
            <Col lg={5} md={6}>
              <Form.Control
                type="text"
                placeholder="🔍 Search destinations, cities or activities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="tv-form-control"
              />
            </Col>

            {/* Difficulty Pills */}
            <Col lg={4} md={6}>
              <div className="d-flex flex-wrap gap-2 align-items-center">
                {difficulties.map((diff) => (
                  <Button
                    key={diff}
                    size="sm"
                    variant={selectedDifficulty === diff ? "primary" : "outline-secondary"}
                    className="rounded-pill px-3 py-1 fw-semibold"
                    style={{
                      fontSize: "0.82rem",
                      background:
                        selectedDifficulty === diff
                          ? "var(--tv-gradient-primary)"
                          : "transparent",
                      border:
                        selectedDifficulty === diff
                          ? "none"
                          : "1px solid rgba(0,0,0,0.12)",
                    }}
                    onClick={() => setSelectedDifficulty(diff)}
                  >
                    {diff}
                  </Button>
                ))}
              </div>
            </Col>

            {/* Sort Options */}
            <Col lg={3} md={12}>
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="tv-form-control"
                style={{ fontSize: "0.88rem" }}
              >
                <option value="recommended">Sort: Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating: Highest First</option>
              </Form.Select>
            </Col>
          </Row>

          {/* Results count & clear filters */}
          <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top small text-secondary">
            <span>
              Showing <strong>{filteredTrips.length}</strong> of <strong>{trips.length}</strong> trips
            </span>
            {(search || selectedDifficulty !== "All" || sortBy !== "recommended") && (
              <Button
                variant="link"
                size="sm"
                className="p-0 text-decoration-none text-danger fw-semibold"
                onClick={handleClearFilters}
              >
                ✕ Clear all filters
              </Button>
            )}
          </div>
        </div>

        {/* Trips Grid */}
        {filteredTrips.length === 0 ? (
          <div className="tv-empty-state bg-white rounded-4 shadow-sm p-5">
            <div className="tv-empty-state-icon">🔍</div>
            <h4 className="fw-bold mb-2">No Matching Destinations</h4>
            <p className="text-secondary mb-4 mx-auto" style={{ maxWidth: "420px" }}>
              We couldn't find any trips matching "{search}". Try searching for another country, city, or reset your filters.
            </p>
            <Button className="tv-btn-primary" style={{ width: "auto" }} onClick={handleClearFilters}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {filteredTrips.map((t) => (
              <Col key={t.id}>
                <div
                  className="tv-trip-card"
                  onClick={() => navigate(`/trips/${t.id}`)}
                >
                  <div className="tv-trip-card-img-wrap">
                    <img src={t.image} alt={t.name} loading="lazy" />
                    {t.difficulty && (
                      <span
                        style={{
                          position: "absolute",
                          top: "0.85rem",
                          right: "0.85rem",
                          zIndex: 2,
                          background: "rgba(0,0,0,0.55)",
                          backdropFilter: "blur(4px)",
                          color: "#fff",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          padding: "0.25rem 0.65rem",
                          borderRadius: "var(--tv-radius-full)",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {t.difficulty}
                      </span>
                    )}
                  </div>
                  <div className="tv-trip-card-body">
                    <div className="tv-trip-card-title">{t.name}</div>
                    {t.destination && (
                      <div className="tv-trip-card-dest">
                        📍 {t.destination}
                      </div>
                    )}
                    {t.duration && (
                      <div
                        style={{
                          fontSize: "0.82rem",
                          color: "var(--tv-text-muted)",
                          marginBottom: "1rem",
                        }}
                      >
                        🕐 {t.duration}
                        {t.rating && (
                          <span style={{ marginLeft: "0.75rem", color: "var(--tv-warning)" }}>
                            ⭐ {t.rating}
                          </span>
                        )}
                      </div>
                    )}
                    {t.price && (
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
                    )}
                    <Button className="tv-btn-primary">View Details →</Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};

export default Trips;
