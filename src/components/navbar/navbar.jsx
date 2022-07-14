import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import "./navbar.scss";


export function NavBar({ user }) {

  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  const userAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar className="main-nav" sticky="top" expand="lg">
      {/* <Container> */}
      <Navbar.Brand className="navbar-logo" href="/">myFlix</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          {userAuth() &&
            <Nav.Link href="/">Home</Nav.Link>}
          {userAuth() &&
            <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>}
          {userAuth() &&
            <Button variant="link" onClick={() => { onLoggedOut() }}>Logout</Button>}
          {!userAuth() &&
            <Nav.Link href="/"> Sign In</Nav.Link>}
          {!userAuth() &&
            <Nav.Link href="/register">Sign Up</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
      {/* </Container> */}
    </Navbar>
  );
}
