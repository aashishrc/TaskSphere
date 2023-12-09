import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

export default function KanbanBoard() {
  const initialCompletedTasks = [
    { id: 1, title: "Task 1", completed: true },
    { id: 2, title: "Task 2", completed: true },
    // ... add more completed tasks
  ];

  const initialIncompleteTasks = [
    { id: 3, title: "Task 3", completed: false },
    { id: 4, title: "Task 4", completed: false },
    // ... add more incomplete tasks
  ];

  // Initialize state with your own data
  const [completed, setCompleted] = useState(initialCompletedTasks);
  const [incomplete, setIncomplete] = useState(initialIncompleteTasks);
  const [newTaskTitle, setNewTaskTitle] = useState(""); // Define newTaskTitle state

  const handleDragEnd = (result) => {
    if (!result.destination) {
      // Destination is null or undefined, handle accordingly
      return;
    }
    const { destination, source, draggableId } = result;

    if (source.droppableId == destination.droppableId) return;

    //REMOVE FROM SOURCE ARRAY
    if (source.droppableId == 2) {
      setCompleted(removeItemById(draggableId, completed));
    } else {
      setIncomplete(removeItemById(draggableId, incomplete));
    }

    // GET ITEM
    const task = findItemById(draggableId, [...incomplete, ...completed]);

    //ADD ITEM
    if (destination.droppableId == 2) {
      setCompleted([{ ...task, completed: !task.completed }, ...completed]);
    } else {
      setIncomplete([{ ...task, completed: !task.completed }, ...incomplete]);
    }
  };

  function findItemById(id, array) {
    return array.find((item) => item.id == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id != id);
  }

  const handleCreateTask = () => {
    // Implement logic to create a new task
    const newTask = {
      id: Date.now(), // Generate a unique ID (you can use a library for better uniqueness)
      title: newTaskTitle,
      completed: false,
    };

    // Update the state to include the new task in the "TO DO" column
    setIncomplete([...incomplete, newTask]);

    // Clear the new task title input
    setNewTaskTitle("");
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h2 style={{ textAlign: "center" }}>PROGRESS BOARD</h2>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter new task"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button onClick={handleCreateTask}>Create Task</button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Column title={"TO DO"} tasks={incomplete} id={"1"} />
        <Column title={"DONE"} tasks={completed} id={"2"} />
        <Column title={"BACKLOG"} tasks={[]} id={"3"} />
      </div>
    </DragDropContext>
  );
}
