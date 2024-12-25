import React from "react";
import styles from "./Features.module.css"; // Import CSS module

const Features = () => {
  return (
    <section className={styles.featuresSection}>
      <h2 className={styles.featuresTitle}>Tính năng nổi bật</h2>
      <ul className={styles.featuresList}>
        <li>Ghi chú nhanh: Thêm ghi chú kèm checklist.</li>
        <li>Đặt nhắc nhở.</li>
        <li>Chia sẻ công việc: Mời người khác cùng cộng tác.</li>
        <li>Quản lí hiệu quả các công việc.</li>
      </ul>
    </section>
  );
};

export default Features;
