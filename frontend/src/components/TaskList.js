import React from "react";
import { useState, useEffect } from "react";
import "../styles/css/TaskList.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([]);
  const navigate = useNavigate();

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { headerName: "Projects", field: "column1", filter: true },
    { headerName: "ProjectID", field: "column2", filter: true },
  ]);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/projects?page=0&size=5",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkB0YXNrc3BoZXJlIiwiaWF0IjoxNzAyMjk0MTMwLCJleHAiOjE3MDIzODA1MzB9.W10F141q_WlPVTpmxWUt-cyHqCiYY_dFQqC4NnqBHio`,
            },
          }
        );

        const responseData = response.data;
        const projects = responseData?.data;

        if (Array.isArray(projects)) {
          // Map the projectsData to the format expected by AgGridReact
          const formattedData = projects.map((project) => ({
            column1: project.name,
            column2: project.id,
          }));

          setRowData(formattedData);
        } else {
          console.error(
            "API response does not contain an array of projects:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (event) => {
    const projectId = event.data.column2;
    navigate(`/projectDetail/${projectId}`);
  };

  return (
    <>
      <Container fluid className="tasklist-container">
        <div
          className="ag-theme-alpine custom-ag-grid"
          style={{ height: "40vh", width: "100%" }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            headerHeight={50}
            rowHeight={40}
            onRowClicked={handleRowClick}
          />
        </div>
      </Container>
    </>
  );
};

export default TaskList;
