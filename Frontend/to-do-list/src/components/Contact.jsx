import React from "react";
import styles from "./Contact.module.css"; // Import CSS module

const Contact = () => {
  return (
    <section className={styles.contactSection}>
      <h2 className={styles.contactTitle}>Hỗ trợ và Liên hệ</h2>
      <p className={styles.contactText}>
        Nếu bạn cần hỗ trợ hoặc có thắc mắc, hãy liên hệ với chúng tôi qua các
        phương thức sau:
      </p>
      <div className={styles.contactDetails}>
        <p>
          <strong>Tên:</strong> Phạm Nguyễn Hùng Nguyên
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a
            href="mailto:hungnguyen16012004@gmail.com"
            className={styles.contactLink}
          >
            hungnguyen16012004@gmail.com
          </a>
        </p>
        <p>
          <strong>Số điện thoại:</strong>{" "}
          <a href="tel:0852980899" className={styles.contactLink}>
            0852980899
          </a>
        </p>
      </div>
    </section>
  );
};

export default Contact;
