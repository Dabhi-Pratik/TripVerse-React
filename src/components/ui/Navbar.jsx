import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useContext } from "react";
import { authContext } from "../../context/AuthContext";

function NavbarComponent() {
  const { user } = useContext(authContext);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="tv-navbar sticky-top">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="tv-navbar-brand d-flex align-items-center gap-2">
          <span>✈</span> TripVerse
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center gap-1 my-2 my-lg-0">
            <Nav.Link as={NavLink} to="/" end className="tv-nav-link" eventKey="1">
              Home
            </Nav.Link>

            <Nav.Link as={NavLink} to="/trips" className="tv-nav-link" eventKey="2">
              Explore Trips
            </Nav.Link>

            {!user ? (
              <Nav.Link as={NavLink} to="/auth" className="p-0 ms-lg-2 mt-2 mt-lg-0" eventKey="3">
                <Button className="tv-btn-login w-100 w-lg-auto">Sign In</Button>
              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/myBookings" className="tv-nav-link" eventKey="4">
                  My Bookings
                </Nav.Link>
                <div className="d-flex align-items-center gap-2 ms-lg-2 mt-2 mt-lg-0">
                  <span
                    className="text-white-50 small d-none d-xl-inline text-truncate"
                    style={{ maxWidth: "140px" }}
                    title={user.email}
                  >
                    👤 {user.displayName || user.email?.split("@")[0]}
                  </span>
                  <Button className="tv-btn-logout" size="sm" onClick={handleLogOut}>
                    Log out
                  </Button>
                </div>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
