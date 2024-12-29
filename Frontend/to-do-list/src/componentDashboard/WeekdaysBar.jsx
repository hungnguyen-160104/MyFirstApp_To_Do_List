import React, { useState } from "react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { useNavigate } from "react-router-dom";
import styles from "./WeekdaysBar.module.css"; // CSS module để tạo giao diện

const WeekdaysBar = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 }) // Tuần bắt đầu từ Thứ 2
  );
  const navigate = useNavigate();
  const today = new Date(); // Ngày hôm nay

  // Tính toán các ngày trong tuần
  const weekDays = [...Array(7)].map((_, index) =>
    addDays(currentWeekStart, index)
  );

  // Chuyển tuần (trước hoặc sau)
  const navigateWeek = (direction) => {
    setCurrentWeekStart((prev) => addDays(prev, direction * 7));
  };

  // Định dạng ngày
  const formatDate = (date) => format(date, "yyyy-MM-dd");

  return (
    <div className={styles.weekdaysBarContainer}>
      {/* Thanh điều hướng tuần */}
      <div className={styles.navigation}>
        <button
          className={styles.navigationButton}
          onClick={() => navigateWeek(-1)}
        >
          &#8592; Tuần trước
        </button>
        <h6 className={styles.navigationTitle}>
          Tuần {format(currentWeekStart, "dd/MM/yyyy")} -{" "}
          {format(addDays(currentWeekStart, 6), "dd/MM/yyyy")}
        </h6>
        <button
          className={styles.navigationButton}
          onClick={() => navigateWeek(1)}
        >
          Tuần sau &#8594;
        </button>
      </div>

      {/* Các ngày trong tuần */}
      <div className={styles.weekdays}>
        {weekDays.map((day) => (
          <div
            key={day}
            className={`${styles.weekday} ${
              isSameDay(day, today) ? styles.today : ""
            }`}
            onClick={() => navigate(`/day/${formatDate(day)}`)}
          >
            <p className={styles.weekdayText}>{format(day, "EEEE")}</p>
            <p className={styles.weekdayDate}>{format(day, "dd/MM")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekdaysBar;
