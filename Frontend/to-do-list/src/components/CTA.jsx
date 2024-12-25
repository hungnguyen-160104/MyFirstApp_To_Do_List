import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CTA.module.css"; // Import CSS module

const CTA = () => {
  const navigate = useNavigate(); // Hook điều hướng trang

  const handleClick = () => {
    navigate("/login"); // Chuyển hướng đến trang đăng nhập
  };

  return (
    <section className={styles.ctaSection}>
      <h2 className={styles.ctaTitle}>Bắt đầu hành trình của bạn</h2>
      <p className={styles.ctaText}>
        Tạo danh sách công việc của bạn ngay hôm nay!
      </p>
      <button
        className={styles.ctaButton}
        onClick={handleClick} // Gọi hàm chuyển hướng khi click
      >
        Bắt đầu
      </button>
    </section>
  );
};

export default CTA;
