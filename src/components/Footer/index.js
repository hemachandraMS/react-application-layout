import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <Container>
        <span className="text-muted">
          © 2024 Electricity Board. All rights reserved.
        </span>
      </Container>
    </footer>
  );
};

export default Footer;
