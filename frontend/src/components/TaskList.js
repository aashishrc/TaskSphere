import React from "react";
import { useState, useEffect } from "react";
import "../styles/css/TaskList.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Container } from "react-bootstrap";
import axios from 'axios';

const TaskList = () => {
  // Row Data: The data to be displayed.
   const [rowData, setRowData] = useState([
    { column1: "Value 1A", column2: "Value 2A" },
    { column1: "Value 1B", column2: "Value 2B" },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { headerName: "Projects", field: "column1", filter: true },
    { headerName: "Status", field: "column2", filter: true },
  ]);

  useEffect(() => {
  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/projects?page=0&size=5', {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkB0YXNrc3BoZXJlIiwiaWF0IjoxNzAyMjk0MTMwLCJleHAiOjE3MDIzODA1MzB9.W10F141q_WlPVTpmxWUt-cyHqCiYY_dFQqC4NnqBHio`,
        },
      });

      const responseData = response.data;
      const projects = responseData?.data; 

      if (Array.isArray(projects)) {
        // Map the projectsData to the format expected by AgGridReact
        const formattedData = projects.map(project => ({
          column1: project.name
        }));

        setRowData(formattedData);
      } else {
        console.error('API response does not contain an array of projects:', response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);

  const handleRowClick = (event) => {
    // Access the data for the clicked row using event.data
    const clickedRowData = event.data;
    
    return (
      alert("the project clicked is : ", clickedRowData )
    )
  };

  return (
    <>
      <Container fluid className="tasklist-container">
        {/* <Container className="tasklist-title">Tasks:</Container> */}
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
