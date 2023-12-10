import { React } from "react";
import LeftNavigation from "./LeftNavigation";
import ActivityLog from "./ActivityLog";
import "../styles/css/Home.css";
import { Button, Container, Nav } from "react-bootstrap";
import { useState } from "react";

const Home = () => {
  const [displayActivityLog, setDisplayActivityLog] = useState(null);

  const handleActivityButtonClick = (activityLog) => {
    setDisplayActivityLog((prevComponent) =>
      prevComponent === activityLog ? null : activityLog
    );
  };

  return (
    <>
      <div className="main">
        <div className="verticalNavbar">
          <LeftNavigation onClickActivityButton={handleActivityButtonClick} />
        </div>
        <div className="main-content">
          {displayActivityLog === "ActivityLog" && <ActivityLog />}
        </div>
      </div>
    </>
  );
};

export default Home;
