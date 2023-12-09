import React from "react";
import { useState } from "react";
import "../styles/css/TaskList.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Container } from "react-bootstrap";

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
          />
        </div>
      </Container>
    </>
  );
};

export default TaskList;
