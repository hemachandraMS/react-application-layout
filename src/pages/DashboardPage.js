import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form } from "react-bootstrap";
import Chart from "chart.js/auto";
// import "./Dashboard.css"; // Import the CSS file

const Dashboard = () => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchData();
  }, [selectedYear]);

  const fetchData = () => {
    // axios
    //   .get("https://127.0.0.1:5000/")
    //   .then((response) => {
    //     const data = [
    //       {
    //         Applicant_Name: "ANDRÉS",
    //         Date_of_Application: "2021-03-15 00:00:00",
    //         Status: "Approved",
    //       },
    //       {
    //         Applicant_Name: "JOSEPHINE",
    //         Date_of_Application: "2021-04-11 00:00:00",
    //         Status: "Pending",
    //       },
    //       {
    //         Applicant_Name: "JOSEPHINE",
    //         Date_of_Application: "2021-04-11 00:00:00",
    //         Status: "Rejected ",
    //       },
    //     ];
    //     filterAndProcessData(data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   });
    const response = [
      {
        Applicant_Name: "ANDRÉS",
        Date_of_Application: "2021-03-15 00:00:00",
        Status: "Approved",
      },
      {
        Applicant_Name: "JOSEPHINE",
        Date_of_Application: "2021-04-11 00:00:00",
        Status: "Pending",
      },
      {
        Applicant_Name: "JOSEPHINE",
        Date_of_Application: "2021-04-11 00:00:00",
        Status: "Rejected ",
      },
    ];
    filterAndProcessData(response);
  };

  const filterAndProcessData = (data) => {
    let filteredData = data.filter((item) => {
      const yearMatches =
        new Date(item.Date_of_Application).getFullYear() === selectedYear;
      return yearMatches;
    });

    processChartData(filteredData);
  };

  const processChartData = (data) => {
    const dataByMonth = {
      January: { rejected: 0, approved: 0, pending: 0, connectionReleased: 0 },
      February: { rejected: 0, approved: 0, pending: 0, connectionReleased: 0 },
      March: { rejected: 0, approved: 0, pending: 0, connectionReleased: 0 },
      April: { rejected: 0, approved: 0, pending: 0, connectionReleased: 0 },
      May: { rejected: 0, approved: 0, pending: 0, connectionReleased: 0 },
      June: { rejected: 0, approved: 0, pending: 0, connectionReleased: 0 },
      July: { rejected: 0, approved: 0, pending: 0, connectionReleased: 0 },
      August: { rejected: 0, approved: 0, pending: 0, connectionReleased: 0 },
      September: {
        rejected: 0,
        approved: 0,
        pending: 0,
        connectionReleased: 0,
      },
      October: { rejected: 0, approved: 0, pending: 0, connectionReleased: 0 },
      November: { rejected: 0, approved: 0, pending: 0, connectionReleased: 0 },
      December: { rejected: 0, approved: 0, pending: 0, connectionReleased: 0 },
    };

    data.forEach((item) => {
      const monthIndex = new Date(item.Date_of_Application).getMonth();
      const monthName = Object.keys(dataByMonth)[monthIndex];
      const status = item.Status.trim().toLowerCase();
      if (
        status === "rejected" ||
        status === "approved" ||
        status === "pending" ||
        status === "connection released"
      ) {
        dataByMonth[monthName][status]++;
      }
    });

    const months = Object.keys(dataByMonth);
    const rejectedData = months.map((month) => dataByMonth[month].rejected);
    const approvedData = months.map((month) => dataByMonth[month].approved);
    const pendingData = months.map((month) => dataByMonth[month].pending);
    const connectionReleasedData = months.map(
      (month) => dataByMonth[month].connectionReleased
    );

    const updatedChartData = {
      labels: months,
      datasets: [
        {
          label: "Rejected",
          data: rejectedData,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
          label: "Approved",
          data: approvedData,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Pending",
          data: pendingData,
          backgroundColor: "rgba(255, 205, 86, 0.2)",
          borderColor: "rgba(255, 205, 86, 1)",
          borderWidth: 1,
        },
        {
          label: "Connection Released",
          data: connectionReleasedData,
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ],
    };

    setChartData(updatedChartData);
  };

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    const newChartInstance = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: {
        plugins: {
          legend: {
            position: "bottom",
          },
        },
        scales: {
          x: {
            stacked: true,
            beginAtZero: true,
          },
          y: {
            stacked: true,
            beginAtZero: true,
          },
        },
      },
    });

    setChartInstance(newChartInstance);

    return () => {
      newChartInstance.destroy();
    };
  }, [chartData]);

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  return (
    <Container className="dashboard-container">
      <Row className="align-left mb-3">
        <Col xs={12} md={4}>
          <span className="mb-0">Applications per Month</span>
        </Col>
      </Row>
      <Row className="align-items-center mb-3">
        <Col xs={12} md={6}></Col>
        <Col xs={12} md={3} className="mb-3 mb-md-0">
          <Form.Select value={selectedYear} onChange={handleYearChange}>
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
            <option value={2022}>2022</option>
            <option value={2021}>2021</option>
            <option value={2020}>2020</option>
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Col>
          <canvas ref={chartRef} id="myChart" style={{ height: "80%" }} />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
