import { React } from "react";
import LeftNavigation from "./LeftNavigation";
import ActivityLog from "./ActivityLog";
import "../styles/css/Home.css";
import { Button, Container, Nav } from "react-bootstrap";
import { useState } from "react";
import NewTask from "./CreateTask";
import { ColumnGroup, Component } from "ag-grid-community";
import ProjectForm from "./ProjectForm";
import KanbanBoard from "./KanbanBoard";
import AssignProject from "./AssignProject";

const Home = () => {
  const [displayComponent, setDisplayComponent] = useState(null);

  const handleDisplayComponent = (Component) => {
    setDisplayComponent(Component);
  };

  const display = () => {
    switch (displayComponent) {
      case "ActivityLog":
        return <ActivityLog />;
      case "CreateTask":
        return <NewTask onButtonClick={handleDisplayComponent}/>;
      case "CreateProject":
        return <ProjectForm />;
      case "viewAlltasks":
        return <KanbanBoard />;
      case "AssignProject":
        return <AssignProject />;
      default:
        return <KanbanBoard />;
    }
  };

  return (
    <>
      <div className="main">
        <div className="verticalNavbar">
          <LeftNavigation onButtonClick={handleDisplayComponent} />
        </div>
        <div className="main-content">{display()}</div>
      </div>
    </>
  );
};

export default Home;