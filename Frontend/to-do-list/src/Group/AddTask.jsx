import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddTask.module.css";
import EditIcon from "@mui/icons-material/Edit"; // Biểu tượng chỉnh sửa
import DeleteIcon from "@mui/icons-material/Delete"; // Biểu tượng xóa

const AddTask = () => {
  const [members, setMembers] = useState([]); // Danh sách thành viên và công việc
  const [newTask, setNewTask] = useState(""); // Công việc mới
  const [selectedMember, setSelectedMember] = useState(""); // Thành viên được chọn
  const [editing, setEditing] = useState(null); // Công việc đang chỉnh sửa
  const [editingTask, setEditingTask] = useState(""); // Nội dung công việc đang chỉnh sửa
  const navigate = useNavigate();

  // Thêm công việc cho thành viên
  const handleAddTask = (e) => {
    e.preventDefault();
    if (selectedMember && newTask.trim()) {
      const memberIndex = members.findIndex(
        (member) => member.name === selectedMember
      );
      if (memberIndex !== -1) {
        const updatedMembers = [...members];
        updatedMembers[memberIndex].tasks.push(newTask.trim());
        setMembers(updatedMembers);
      } else {
        setMembers((prevMembers) => [
          ...prevMembers,
          { name: selectedMember, tasks: [newTask.trim()] },
        ]);
      }
      setNewTask(""); // Reset công việc mới
      setSelectedMember(""); // Reset thành viên
    } else {
      alert("Vui lòng chọn thành viên và nhập tên công việc!");
    }
  };

  // Xóa công việc của thành viên và xóa thành viên nếu không còn công việc
  const handleDeleteTask = (memberName, taskIndex) => {
    setMembers((prevMembers) =>
      prevMembers
        .map((member) =>
          member.name === memberName
            ? {
                ...member,
                tasks: member.tasks.filter((_, index) => index !== taskIndex),
              }
            : member
        )
        .filter((member) => member.tasks.length > 0) // Xóa thành viên nếu không còn công việc
    );
  };

  // Bắt đầu chỉnh sửa công việc
  const handleEditTask = (memberName, taskIndex) => {
    setEditing({ memberName, taskIndex });
    const taskContent = members.find(
      (member) => member.name === memberName
    ).tasks[taskIndex];
    setEditingTask(taskContent);
  };

  // Lưu công việc sau khi chỉnh sửa
  const handleSaveTask = () => {
    if (editing && editingTask.trim()) {
      const { memberName, taskIndex } = editing;
      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.name === memberName
            ? {
                ...member,
                tasks: member.tasks.map((task, index) =>
                  index === taskIndex ? editingTask.trim() : task
                ),
              }
            : member
        )
      );
      setEditing(null); // Kết thúc chỉnh sửa
      setEditingTask(""); // Xóa nội dung chỉnh sửa tạm thời
    } else {
      alert("Nội dung công việc không được để trống!");
    }
  };

  // Hủy chỉnh sửa
  const handleCancelEdit = () => {
    setEditing(null);
    setEditingTask("");
  };

  return (
    <div className={styles.addTaskContainer}>
      <h1 className={styles.title}>Quản Lý Công Việc Thành Viên</h1>
      <form onSubmit={handleAddTask} className={styles.form}>
        <select
          value={selectedMember}
          onChange={(e) => setSelectedMember(e.target.value)}
          required
          className={styles.select}
        >
          <option value="">Chọn thành viên</option>
          <option value="Thành viên 1">Thành viên 1</option>
          <option value="Thành viên 2">Thành viên 2</option>
          <option value="Thành viên 3">Thành viên 3</option>
        </select>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Tên công việc"
          required
          className={styles.input}
        />
        <button type="submit" className={styles.btn}>
          Thêm Công Việc
        </button>
      </form>

      <div className={styles.membersTasks}>
        {members.map((member) => (
          <div key={member.name} className={styles.memberTask}>
            <h3>{member.name}</h3>
            <ul>
              {member.tasks.map((task, index) => (
                <li key={index} className={styles.taskItem}>
                  {editing?.memberName === member.name &&
                  editing?.taskIndex === index ? (
                    <div className={styles.editContainer}>
                      <input
                        type="text"
                        value={editingTask}
                        onChange={(e) => setEditingTask(e.target.value)}
                        required
                        className={styles.editInput}
                      />
                      <button
                        onClick={handleSaveTask}
                        className={`${styles.btn} ${styles.saveButton}`}
                      >
                        Lưu
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className={`${styles.btn} ${styles.cancelButton}`}
                      >
                        Hủy
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className={styles.taskContent}>{task}</span>
                      <div className={styles.taskActions}>
                        <button
                          onClick={() => handleEditTask(member.name, index)}
                          className={styles.actionButton}
                        >
                          <EditIcon className={styles.editIcon} />
                        </button>
                        <button
                          onClick={() => handleDeleteTask(member.name, index)}
                          className={styles.actionButton}
                        >
                          <DeleteIcon className={styles.deleteIcon} />
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <button
        className={`${styles.btn} ${styles.btnBack}`}
        onClick={() => navigate("/dashboard")}
      >
        Quay lại trang chính
      </button>
    </div>
  );
};

export default AddTask;
