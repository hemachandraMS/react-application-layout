import React from "react";
import { Navbar, Container } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand>Electricity Board</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
