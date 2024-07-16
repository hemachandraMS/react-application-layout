import React from "react";
import { Nav } from "react-bootstrap";

const Sidebar = ({ onSelectTab }) => {
  return (
    <Nav className="flex-column">
      <Nav.Link onClick={() => onSelectTab("dashboard")}>Dashboard</Nav.Link>
      <Nav.Link onClick={() => onSelectTab("connections")}>
        Connections
      </Nav.Link>
    </Nav>
  );
};

export default Sidebar;
