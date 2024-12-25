import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GroupTasks.css";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const GroupTasks = () => {
  const navigate = useNavigate();

  const [groupVisible, setGroupVisible] = useState(true);
  const [groupName, setGroupName] = useState("NHÓM");
  const [isEditing, setIsEditing] = useState(false);

  const handleEditGroup = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = (e) => {
    if (e.key === "Enter" || e.type === "blur") {
      setIsEditing(false);
    }
  };

  const handleDeleteGroup = () => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa nhóm không?");
    if (confirmDelete) {
      setGroupVisible(false);
    }
  };

  return (
    <>
      {groupVisible && (
        <div className="group-container">
          <div className="group-header">
            {isEditing ? (
              <input
                className="group-input"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                onKeyDown={handleSaveEdit}
                onBlur={handleSaveEdit}
                autoFocus
              />
            ) : (
              <span className="group-title">{groupName}</span>
            )}
            <div className="group-icon">
              <IconButton
                size="small"
                onClick={handleEditGroup}
                aria-label="Chỉnh sửa nhóm"
                title="Chỉnh sửa nhóm"
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={handleDeleteGroup}
                aria-label="Xóa nhóm"
                title="Xóa nhóm"
              >
                <DeleteIcon fontSize="small" style={{ color: "red" }} />
              </IconButton>
            </div>
          </div>
          <div className="group-buttons">
            <button
              className="group-task-button"
              onClick={() => navigate("/group/detail")}
            >
              Xem Chi Tiết Nhóm
            </button>
            <button
              className="group-task-button"
              onClick={() => navigate("/group/add-task")}
            >
              Thêm Công Việc Chung
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GroupTasks;
