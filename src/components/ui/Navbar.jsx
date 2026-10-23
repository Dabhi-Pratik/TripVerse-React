import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";

import AuthContextProvider, { authContext } from "../../context/AuthContext";
import { Button } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useContext } from "react";

function NavbarComponent() {
  const { user } = useContext(authContext);

  console.log("user", user);

  const handleLogOut = async () => {
    await signOut(auth);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          TripVerse
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>

            <Nav.Link as={NavLink} to="/trips">
              Trips
            </Nav.Link>
            {!user ? (
              <Nav.Link as={NavLink} to="/auth">
                <Button>Login</Button>
              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/myBookings">
                  My Bookings
                </Nav.Link>

                <Button onClick={handleLogOut}>Log out </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
