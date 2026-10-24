import { Spinner, Container } from "react-bootstrap";

const Loading = () => {
  return (
    <div className="tv-loading-screen text-center text-white p-4">
      <div className="tv-loading-brand mb-2">TripVerse</div>
      <p className="text-white-50 small text-uppercase fw-semibold mb-4" style={{ letterSpacing: "0.2em" }}>
        Curating Your Next Journey
      </p>

      <Spinner
        animation="border"
        role="status"
        style={{
          width: "3.5rem",
          height: "3.5rem",
          color: "#93c5fd",
          borderWidth: "3.5px",
        }}
      />

      <div className="mt-4 text-white-50 small">
        Preparing destinations & experiences...
      </div>
    </div>
  );
};

export default Loading;
