import React, { useState } from "react";
import {
  Container,
  Form,
  Table,
  Pagination,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Connections = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Show 6 items per page

  // Mock data for demonstration
  const applicationsData = [
    { id: 1, name: "Application 1", date: "2024-01-01" },
    { id: 2, name: "Application 2", date: "2024-01-02" },
    { id: 3, name: "Application 3", date: "2024-01-03" },
    { id: 4, name: "Application 4", date: "2024-01-04" },
    { id: 5, name: "Application 5", date: "2024-01-05" },
    { id: 6, name: "Application 6", date: "2024-01-06" },
    { id: 7, name: "Application 7", date: "2024-01-07" },
    { id: 8, name: "Application 8", date: "2024-01-08" },
    { id: 9, name: "Application 9", date: "2024-01-09" },
    { id: 10, name: "Application 10", date: "2024-01-10" },
    // Add more mock data as needed
  ];

  // Filter applications based on search term and date range
  const filteredApplications = applicationsData.filter((app) => {
    const withinDateRange =
      (!startDate || new Date(app.date) >= startDate) &&
      (!endDate || new Date(app.date) <= endDate);
    return (
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      withinDateRange
    );
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentApplications = filteredApplications.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="py-3">
      <h2>Connections</h2>
      <Form className="mb-3">
        <InputGroup>
          <FormControl
            type="text"
            placeholder="Search applications"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Start Date"
            className="form-control"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="End Date"
            className="form-control"
          />
        </InputGroup>
      </Form>
      <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Application Name</th>
              <th>Applied Date</th>
            </tr>
          </thead>
          <tbody>
            {currentApplications.length > 0 ? (
              currentApplications.map((app, index) => (
                <tr key={app.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{app.name}</td>
                  <td>{app.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center">
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <Pagination className="justify-content-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
};

export default Connections;
