import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LogoutButton.module.css'; // Import file CSS module

const LogoutButton = () => {
  const navigate = useNavigate(); // Dùng hook để chuyển hướng

  const handleLogout = () => {
    const confirmLogout = window.confirm('Bạn có chắc chắn muốn đăng xuất không?');
    if (confirmLogout) {
      // Logic đăng xuất (xóa token, session, v.v.)
      localStorage.removeItem('authToken'); // Ví dụ: Xóa token nếu bạn lưu trong localStorage

      // Chuyển hướng về trang ban đầu
      navigate('/');
    }
  };

  return (
    <button className={styles.logoutButton} onClick={handleLogout}>
      Đăng xuất
    </button>
  );
};

export default LogoutButton;
