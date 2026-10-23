import { useNavigate } from "react-router-dom";
import { trips } from "../../data/Trips";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Trips = () => {

  const navigate = useNavigate()

  return (
    <Container>
      <Row xs={1} sm={2} md={3} lg={4} className="m-1 g-4">
        {trips.map((t) => {
          return (
            <Col id={t.id}>
              <Card>
                <Card.Img
                  variant="top"
                  src={t.image}
                  style={{ height: "250px" }}
                />
                <Card.Body>
                  <Card.Title>{t.name}</Card.Title>

                  <Button variant="primary"  onClick={() => navigate(`/trips/${t.id}`)}>View Details</Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Trips;
