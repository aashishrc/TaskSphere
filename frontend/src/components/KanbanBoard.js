import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import "../styles/css/KanbanBoard.css";

export default function KanbanBoard() {
  // Initial data for tasks in different states
  const initialNotStartedTasks = [
    { id: 1, title: "Task 1", status: "notStarted" },
    { id: 2, title: "Task 2", status: "notStarted" },
    // ... add more not started tasks
  ];

  const initialInProgressTasks = [
    { id: 3, title: "Task 3", status: "inProgress" },
    { id: 4, title: "Task 4", status: "inProgress" },
    // ... add more in progress tasks
  ];

  const initialCompletedTasks = [
    { id: 5, title: "Task 5", status: "completed" },
    { id: 6, title: "Task 6", status: "completed" },
    // ... add more completed tasks
  ];

  // State variables to manage tasks and new task title
  const [notStarted, setNotStarted] = useState(initialNotStartedTasks || []);
  const [inProgress, setInProgress] = useState(initialInProgressTasks || []);
  const [completed, setCompleted] = useState(initialCompletedTasks || []);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // Function to handle the end of a drag operation
  // Function to handle the end of a drag operation
// Function to handle the end of a drag operation
// Function to handle the end of a drag operation
const handleDragEnd = (result) => {
  console.log("result:", result);

  if (!result.destination) {
    console.log("No destination");
    return;
  }

  const { destination, source, draggableId } = result;
  console.log("source:", source);
  console.log("destination:", destination);

  // If the source and destination columns are the same, do nothing
  if (source.droppableId === destination.droppableId) {
    console.log("Same column, do nothing");
    return;
  }

  // Find the task based on the dragged ID
  const task = findItemById(draggableId, [...notStarted, ...inProgress, ...completed]);
  console.log("task:", task);

  if (!task) {
    console.log("Task not found");
    return;
  }

  // Separate tasks based on their status
  const updatedNotStarted = notStarted.filter((t) => t.id !== task.id);
  const updatedInProgress = inProgress.filter((t) => t.id !== task.id);
  const updatedCompleted = completed.filter((t) => t.id !== task.id);

  // Logic for moving tasks between columns
  if (destination.droppableId === "2" && task.status === "notStarted") {
    // Move the task to "In Progress"
    console.log("Moving to In Progress");
    setNotStarted(updatedNotStarted);
    setInProgress((prevInProgress) => [...prevInProgress, { ...task, status: "inProgress" }]);
  } else if (destination.droppableId === "3" && task.status === "inProgress") {
    // Move the task to "Done"
    console.log("Moving to Done");
    setInProgress(updatedInProgress);
    setCompleted((prevCompleted) => [...prevCompleted, { ...task, status: "completed" }]);
  }
};




  // Function to find an item by its ID in an array
  const findItemById = (id, array) => array.find((item) => item && item.id.toString() === id.toString());

  // Function to handle the creation of a new task
  const handleCreateTask = () => {
    // Implement logic to create a new task
    const newTask = {
      id: Date.now(), // Generate a unique ID (you can use a library for better uniqueness)
      title: newTaskTitle,
      status: "notStarted",
    };

    // Update the state to include the new task in the "To Do" column
    setNotStarted([...notStarted, newTask]);

    // Clear the new task title input
    setNewTaskTitle("");
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="kanban-container">
        <h2 className="board-title"></h2>
        <div className="columns-container">
          {/* Render columns for "To Do", "In Progress", and "Done" */}
          <Column title={"To Do"} tasks={notStarted} id={"1"} />
          <Column title={"In Progress"} tasks={inProgress} id={"2"} />
          <Column title={"Done"} tasks={completed} id={"3"} />
        </div>
      </div>
    </DragDropContext>
  );
}