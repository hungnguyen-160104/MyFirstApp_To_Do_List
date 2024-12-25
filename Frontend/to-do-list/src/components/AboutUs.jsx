import React from "react";
import styles from "./AboutUs.module.css"; // Import CSS module

const AboutUs = () => {
  return (
    <section className={styles.aboutUsSection}>
      <h2 className={styles.aboutUsTitle}>Câu chuyện của chúng tôi</h2>
      <p className={styles.aboutUsText}>
        Todolist giúp bạn quản lý thời gian hiệu quả, tổ chức công việc rõ ràng, ưu tiên nhiệm vụ quan trọng. 
        Nó giảm căng thẳng, tăng năng suất, giúp bạn đạt được mục tiêu nhanh chóng và duy trì sự tập trung trong mọi công việc.
      </p>
    </section>
  );
};

export default AboutUs;
