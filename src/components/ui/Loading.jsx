import { Spinner, Container } from "react-bootstrap";

const Loading = () => {
  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Spinner
        animation="border"
        variant="primary"
        style={{
          width: "50px",
          height: "50px",
        }}
      />

      <h5 className="mt-3 text-dark">Loading...</h5>

      <p className="text-muted mb-0">Please wait while we load the page</p>
    </Container>
  );
};

export default Loading;
