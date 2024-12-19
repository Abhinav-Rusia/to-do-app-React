import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

const TodoList = () => {
  const [tasks, setTasks] = React.useState([]);
  const [newTask, setNewTask] = React.useState("");
  const [editIndex, setEditIndex] = React.useState(null);
  const [editTaskValue, setEditTaskValue] = React.useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() === "") {
      // Display a custom message below the input instead of alert
      return;
    }
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTask("");
  }

  function removeTask(index) {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  }

  function startEditing(index) {
    setEditIndex(index);
    setEditTaskValue(tasks[index]);
  }

  function handleEditChange(event) {
    setEditTaskValue(event.target.value);
  }

  function saveTask(index) {
    if (editTaskValue.trim() === "") {
      return; // Prevent empty edits
    }
    setTasks((prevTasks) =>
      prevTasks.map((task, i) => (i === index ? editTaskValue : task))
    );
    setEditIndex(null);
    setEditTaskValue("");
  }

  return (
    <div className="to-do-list">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter your task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-btn" onClick={addTask}>
          Add Task
        </button>
      </div>
      <ol>
        {tasks.map((elem, index) => (
          <li key={index}>
            {editIndex === index ? (
              <div className="edit-container">
                <input
                  type="text"
                  value={editTaskValue}
                  onChange={handleEditChange}
                />
                <button className="save-btn" onClick={() => saveTask(index)}>
                  Save
                </button>
                
              </div>
            ) : (
              <>
                <span className="text">{elem}</span>
                <div id="btn-div">
                <button className="delete-btn" onClick={() => removeTask(index)}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
                <button
                  className="edit-btn"
                  onClick={() => startEditing(index)}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TodoList;
