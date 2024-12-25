import React, { useState } from "react";
import { format, addDays, startOfWeek } from "date-fns";
import styles from "./WeekdaysBar.module.css";

const WeekdaysBar = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 0 })
  );
  const [selectedDate, setSelectedDate] = useState(new Date());

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
      {/* Nút chuyển tuần */}
      <div className={styles.navigation}>
        <button
          className={styles.navigationButton}
          onClick={() => navigateWeek(-1)}
        >
          Trước
        </button>
        <h6 className={styles.navigationTitle}>
          Tuần {format(currentWeekStart, "dd/MM/yyyy")} -{" "}
          {format(addDays(currentWeekStart, 6), "dd/MM/yyyy")}
        </h6>
        <button
          className={styles.navigationButton}
          onClick={() => navigateWeek(1)}
        >
          Sau
        </button>
      </div>

      {/* Lịch ngang */}
      <div className={styles.weekdays}>
        {weekDays.map((day) => (
          <div
            key={day}
            className={`${styles.weekday} ${
              formatDate(selectedDate) === formatDate(day) ? styles.weekdayActive : ""
            }`}
            onClick={() => setSelectedDate(day)}
          >
            <p className={styles.weekdayText}>{format(day, "E")}</p>
            <p className={styles.weekdayDate}>{format(day, "dd")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekdaysBar;
