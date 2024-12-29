import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format, isValid, parseISO } from "date-fns"; // Kiểm tra ngày hợp lệ
import styles from "./DayDetail.module.css";

const DayDetailPage = () => {
  const { date } = useParams(); // Lấy tham số từ URL
  const navigate = useNavigate(); // Hook để điều hướng

  // Kiểm tra xem date có hợp lệ không
  const parsedDate = parseISO(date);
  const isValidDate = isValid(parsedDate);

  if (!isValidDate) {
    return (
      <div className={styles.bodyBackground}>
        <div className={styles.dayDetailContainer}>
          <h1 className={styles.title}>Lỗi</h1>
          <p className={styles.date}>Ngày không hợp lệ. Vui lòng chọn một ngày khác.</p>
          <button className={styles.exitButton} onClick={() => navigate("/weekdays")}>
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  // Định dạng ngày thành dd/mm/yyyy
  const formattedDate = format(parsedDate, "dd/MM/yyyy");

  // Danh sách hoạt động mẫu
  const activities = [
    { id: 1, time: "07:40", description: "Bắt đầu thuyết trình!" },
    { id: 2, time: "08:20", description: "Hoàn thành bài báo cáo" },
    { id: 3, time: "08:30", description: "Đến lúc cô đặt câu hỏi và trả lời" },
    { id: 4, time: "08:35", description: "Kết thúc buổi thuyết trình nhóm 7" },
  ];

  return (
    <div className={styles.bodyBackground}>
      <div className={styles.dayDetailContainer}>
        <h1 className={styles.title}>Chi tiết ngày</h1>
        <p className={styles.date}>Ngày được chọn: {formattedDate}</p>
        <div className={styles.content}>
          <h2 className={styles.activityTitle}>Danh sách hoạt động:</h2>
          <ul className={styles.activityList}>
            {activities.map((activity) => (
              <li key={activity.id} className={styles.activityItem}>
                <span className={styles.activityTime}>{activity.time}</span>
                <span className={styles.activityDescription}>{activity.description}</span>
              </li>
            ))}
          </ul>
        </div>
        <button className={styles.exitButton} onClick={() => navigate("/dashboard")}>
          Thoát
        </button>
      </div>
    </div>
  );
};

export default DayDetailPage;
