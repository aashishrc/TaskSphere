import { React, useEffect } from "react";
import LeftNavigation from "./LeftNavigation";
import ActivityLog from "./ActivityLog";
import "../styles/css/Home.css";
import { Button, Container, Nav } from "react-bootstrap";
import { useState } from "react";
import NewTask from "./CreateTask";
import KanbanBoard from "./KanbanBoard";
import axios from "axios";
import { ColumnGroup, Component } from "ag-grid-community";
import ProjectForm from "./ProjectForm";
import AssignProject from "./AssignProject";
const baseUrl = process.env.REACT_APP_API_BASE_URL;
const jwtToken = localStorage.getItem("jwtToken");

const Home = () => {
  const [displayComponent, setDisplayComponent] = useState(null);
  const [allTasks, setAllTask] = useState([{}]);
  const [allProjectTasks, setAllProjectTask] = useState([{}]);

  const handleDisplayComponent = (Component) => {
    setDisplayComponent(Component);
  };

  const fetchAllTasks = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/v1/tasks`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      const result = await response.data.data;
      setAllTask(result);
    } catch (error) {
      console.log("Error", error);
    }
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
      case "AllTasks":
        return allTasks && allTasks.length > 0 ? (
          <KanbanBoard data={allTasks} />
        ) : null;
      default:
        // return <KanbanBoard data={allTasks} />;
        return null;
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const handleIdFromTaskList = async (id) => {
    console.log(id);

    const response = await axios.get(`${baseUrl}/api/v1/tasks`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      params: {
        projectId: id,
      },
    });

    const result = response.data.data;
    setAllProjectTask(result);
    console.log(allProjectTasks);
  };

  return (
    <>
      <div className="main">
        <div className="verticalNavbar">
          <LeftNavigation
            onButtonClick={handleDisplayComponent}
            selectedRowId={handleIdFromTaskList}
          />
        </div>
        <div className="main-content">{display()}</div>
      </div>
    </>
  );
};

export default Home;
