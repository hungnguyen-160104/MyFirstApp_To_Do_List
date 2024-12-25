import React from "react";
import styles from "./Header.module.css"; // Import CSS module

const Header = () => {
  return (
    <header className={styles.header}>
      {/* Logo và text bên trái */}
      <div className={styles.logoContainer}>
        {/* Logo */}
        <img
          src="/images/logo-dhbk-1-02_130_191.png" // Đường dẫn ảnh logo
          alt="Logo Đại học Bách Khoa Hà Nội"
          className={styles.logoImage}
        />
        {/* Text bên cạnh logo */}
        <div>
          <h2 className={styles.logoText}>
            ĐẠI HỌC <br />
            BÁCH KHOA HÀ NỘI
          </h2>
          <p className={styles.logoSubText}>
            HANOI UNIVERSITY <br /> OF SCIENCE AND TECHNOLOGY
          </p>
        </div>
      </div>

      {/* Phần tiêu đề chính ở giữa */}
      <div className={styles.titleContainer}>
        <h1 className={styles.mainTitle}>Lên kế hoạch. Hoàn thành mục tiêu.</h1>
        <p className={styles.subTitle}>One Task. One Step. One Goal.</p>
      </div>
    </header>
  );
};

export default Header;
