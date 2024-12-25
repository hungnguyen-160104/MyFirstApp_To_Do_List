import React, { useState } from "react";
import "./ToDoListPage.css"; // Import file CSS
import { useNavigate } from "react-router-dom"; // Import useNavigate từ react-router-dom
import {
  Checkbox,
  ListItemText,
  List,
  ListItem,
  Button,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";

const ToDoListPage = () => {
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
  const [tasks, setTasks] = useState([]); // Danh sách công việc
  const [newTask, setNewTask] = useState(""); // Công việc mới
  const [editIndex, setEditIndex] = useState(null); // Vị trí đang chỉnh sửa
  const [completedTasks, setCompletedTasks] = useState([]); // Trạng thái hoàn thành

  // Thêm hoặc sửa công việc
  const handleAddOrEdit = () => {
    if (newTask.trim()) {
      if (editIndex !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = newTask;
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        setTasks([...tasks, newTask]);
        setCompletedTasks([...completedTasks, false]);
      }
      setNewTask("");
    }
  };

  // Xóa công việc
  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    setCompletedTasks(completedTasks.filter((_, i) => i !== index));
  };

  // Sửa công việc
  const handleEdit = (index) => {
    setNewTask(tasks[index]);
    setEditIndex(index);
  };

  // Đánh dấu hoàn thành công việc
  const handleToggleComplete = (index) => {
    const updatedCompleted = [...completedTasks];
    updatedCompleted[index] = !updatedCompleted[index];
    setCompletedTasks(updatedCompleted);
  };

  // Hàm xử lý khi nhấn nút Thoát
  const handleExit = () => {
    navigate("/dashboard"); // Điều hướng về Dashboard
  };

  return (
    <div className="todo-page">
      <div className="main-content">
        {/* Tiêu đề */}
        

        {/* Ô nhập công việc */}
        <div className="task-input-container">
          <input
            type="text"
            placeholder="Nhập công việc mới"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={handleAddOrEdit} className="add-task-button">
            {editIndex !== null ? "Cập nhật" : "Thêm"}
          </button>
        </div>

        {/* Danh sách công việc */}
        <List className="task-list">
          {tasks.map((task, index) => (
            <ListItem key={index} className="task-list-item">
              <Checkbox
                className="task-checkbox"
                checked={completedTasks[index]}
                onChange={() => handleToggleComplete(index)}
              />
              <ListItemText
                primary={task}
                className={`task-content ${
                  completedTasks[index] ? "completed" : ""
                }`}
              />
              <div className="task-actions">
                <button onClick={() => handleEdit(index)} className="edit-button">
                  <Edit fontSize="small" />
                </button>
                <button onClick={() => handleDelete(index)} className="delete-button">
                  <Delete fontSize="small" />
                </button>
              </div>
            </ListItem>
          ))}
        </List>

        {/* Nút Thoát */}
        <Button
          variant="contained"
          color="error"
          onClick={handleExit} // Gọi đúng hàm handleExit
          className="exit-button"
        >
          Thoát
        </Button>
      </div>
    </div>
  );
};

export default ToDoListPage;
