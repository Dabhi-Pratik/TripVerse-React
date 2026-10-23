import React from "react";
import { trips } from "../../data/Trips";
import { useParams, useNavigate } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  ListGroup,
  Accordion,
  Button,
} from "react-bootstrap";

const TripDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const trip = trips.find((t) => t.id === Number(id));

  const handleBooking = () => {
    navigate(`/booking/${id}`);
  };

  return (
    <>
      <Container>
        <Row className="mt-5">
          <Col>
            <Card className="shadow rounded-5">
              <img
                src={trip.image}
                className="rounded-5"
                alt={trip.name}
                style={{ height: "450px", width: "100%", objectFit: "cover" }}
              />
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
            <h2 className="mt-3">{trip.name}</h2>
            <h6 className="text-secondary">{trip.destination}</h6>

            <div className="d-flex gap-2">
              <Badge bg="primary">{trip.duration}</Badge>
              <Badge bg="secondary">⭐{trip.rating}</Badge>
              <Badge bg="info">{trip.difficulty}</Badge>
              <Badge bg="success">₹{trip.price}</Badge>
            </div>

            <Row>
              <Col className="mt-3">
                <Card className="shadow p-3">
                  <h5>Overview</h5>
                  <h6>{trip.overview}</h6>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col className="mt-3">
                <Card className="shadow p-3">
                  <h5>Trip Highlights</h5>
                  <ListGroup variant="flush" className="mt-2">
                    {trip.highlights.map((t, index) => (
                      <ListGroup.Item key={index}>✅ {t}</ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col className="mt-3">
                <Card className="shadow p-3">
                  <h5>Day-wise Itinerary</h5>
                  <Accordion className="mt-2" flush>
                    {trip.itinerary.map((t, index) => {
                      return (
                        <>
                          <Accordion.Item eventKey={index} key={index}>
                            <Accordion.Header>
                              Day{t.day} - {t.title}{" "}
                            </Accordion.Header>
                            <Accordion.Body>{t.description}</Accordion.Body>
                          </Accordion.Item>
                        </>
                      );
                    })}
                  </Accordion>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col className="mt-3" lg={6}>
                <Card className="shadow p-3">
                  <h5> Inclusion</h5>
                  <ListGroup variant="flush">
                    {trip.inclusions.map((t) => {
                      return <ListGroup.Item>{t}</ListGroup.Item>;
                    })}
                  </ListGroup>
                </Card>
              </Col>
              <Col className="mt-3" lg={6}>
                <Card className="shadow p-3">
                  <h5> Exclusion</h5>
                  <ListGroup variant="flush">
                    {trip.exclusions.map((t) => {
                      return <ListGroup.Item>{t}</ListGroup.Item>;
                    })}
                  </ListGroup>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col className="mt-3">
                <Card className="shadow p-3">
                  <h5>Best time to visit</h5>
                  <p>{trip.bestTimeToVisit}</p>
                </Card>
              </Col>
            </Row>

            <Button
              variant="outline-dark"
              className="mt-3 mb-5"
              onClick={() => navigate(-1)}
            >
              {" "}
              Back to Trips
            </Button>
          </Col>
          <Col className="mt-3" lg={4}>
            <Card className="shadow p-3 sticky-top" style={{ top: "90px" }}>
              <h4>₹ {trip.price}</h4>
              <h6 className="text-secondary">
                {trip.duration} • {trip.difficulty}{" "}
              </h6>
              <div className="d-grid gap-2">
                <Button onClick={handleBooking}>Book Now</Button>
                <Button variant="outline-secondary">Enquire</Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TripDetail;
