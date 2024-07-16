import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Connections from "./components/Connections";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [selectedTab, setSelectedTab] = useState("dashboard"); // Default selected tab

  const handleTabSelect = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="App d-flex flex-column">
      <Header />
      <Container fluid className="flex-grow-1" style={{ paddingTop: "60px" }}>
        <Row className="h-100">
          <Col md={3} className="bg-light p-0">
            <Sidebar onSelectTab={handleTabSelect} />
          </Col>
          <Col md={9} className="bg-light p-0">
            {selectedTab === "dashboard" && <Dashboard />}
            {selectedTab === "connections" && <Connections />}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
