import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get("http://127.0.0.1:8000/tasks/");
    setTasks(response.data);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    const task = { id: tasks.length + 1, title: newTask, completed: false };
    await axios.post("http://127.0.0.1:8000/tasks/", task);
    fetchTasks();
    setNewTask("");
  };

  const deleteTask = async (taskId) => {
    await axios.delete(`http://127.0.0.1:8000/tasks/${taskId}`);
    fetchTasks();
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>TO-DO List</h1>
      <input 
        type="text" 
        value={newTask} 
        onChange={(e) => setNewTask(e.target.value)} 
        placeholder="Enter task..."
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => deleteTask(task.id)} style={{ marginLeft: "10px" }}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
