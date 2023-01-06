// Navbar
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProfilePictureComponent, SomethingElse } from './ProfilePictureComponent';
import toast, { Toaster } from 'react-hot-toast';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

// Return the header component for the site. (navbar)
export const Header = () => {

  // Reload app with new data
  const handleReload = () => {
    SomethingElse(); // This is the function from ProfilePictureComponent.jsx
    toast.success("Reloaded app with fresh sample data");
  };


  return (
    // Navbar
    <Navbar bg="dark" variant="dark">
    <Toaster/> {/* This is the toast notification */}
    <Container>
      <Navbar.Brand href="#home">ToDo</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/create">Create</Nav.Link>
        {/* link to the github through the navbar */}
        <Nav.Link href="https://github.com/">Github</Nav.Link>
      </Nav>

      {/* right side of the navbar */}
      <Nav className="justify-content-end">
        {/* Add user avatar as the navbar felt empty */}
        <Nav.Link>
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="button-tooltip-2">
                Click me reload app with fresh sample data
              </Tooltip>
            }
          >
          <img
            src="https://xsgames.co/randomusers/avatar.php?g=pixel"
            width="40"
            height="40"
            className="d-inline-block align-top rounded-circle"
            alt="User profile picture"
            onClick={() => handleReload()}
          />
          </OverlayTrigger>
        </Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  );
};
