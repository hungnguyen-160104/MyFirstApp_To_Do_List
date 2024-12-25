import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./GroupDetail.module.css"; // Sử dụng CSS module để tránh ảnh hưởng toàn cục
import DeleteIcon from "@mui/icons-material/Delete";

const GroupDetail = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState(["Thành viên 1", "Thành viên 2", "Thành viên 3"]);

  // Thêm thành viên mới
  const handleAddMember = () => {
    const newMember = prompt("Nhập tên thành viên mới:");
    if (newMember) {
      setMembers([...members, newMember]);
    }
  };

  // Xóa thành viên
  const handleDeleteMember = (index) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa thành viên này?");
    if (confirmDelete) {
      const updatedMembers = members.filter((_, i) => i !== index);
      setMembers(updatedMembers);
    }
  };

  return (
    <div className={styles.groupDetail}>
      <div className={styles.groupDetailContainer}>
        <h1 className={styles.groupDetailTitle}>Chi Tiết Nhóm</h1>
        <div className={styles.groupDetailContent}>
          <p>
            <strong>Tên nhóm:</strong> Nhóm 7
          </p>
          <p>
            <strong>Mô tả:</strong> Đây là bài tập để gửi cô.
          </p>
          <p>
            <strong>Ngày tạo:</strong> 24/12/2024
          </p>
          <p>
            <strong>Thành viên:</strong>
          </p>
          <ul className={styles.memberList}>
            {members.map((member, index) => (
              <li key={index} className={styles.memberItem}>
                <span className={styles.memberName}>{member}</span>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteMember(index)}
                  aria-label="Xóa thành viên"
                >
                  <DeleteIcon style={{ color: "red" }} />
                </button>
              </li>
            ))}
          </ul>
          <button className={styles.addMemberButton} onClick={handleAddMember}>
            Thêm Thành Viên
          </button>
        </div>
        <button className={styles.backButton} onClick={() => navigate("/dashboard")}>
          Quay lại trang chính
        </button>
      </div>
    </div>
  );
};

export default GroupDetail;
