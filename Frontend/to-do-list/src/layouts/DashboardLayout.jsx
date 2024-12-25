import React from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "../SideBarComponents/Sidebar";
import WeekdaysBar from "../componentDashboard/WeekdaysBar";
import SearchBar from "../componentDashboard/SearchBar";
import ActionButtons from "../componentDashboard/ActionButtons";
import GridContent from "../componentDashboard/GridContent";
import LogoutButton from "../componentDashboard/LogoutButton"; // Import LogoutButton
import "./DashboardLayout.css"; // Import file CSS

const DashboardLayout = ({ boxes, onAddBox, onRemoveBox, onUpdateBoxName }) => {
  const navigate = useNavigate(); // Hook để điều hướng

  // Hàm xử lý khi click vào một ô
  const handleBoxClick = (id) => {
    navigate(`/todo/${id}`); // Điều hướng đến ToDoListPage tương ứng
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Nút Đăng xuất */}
        <div className="logout-button-container">
          <LogoutButton />
        </div>

        {/* Header cho Dashboard */}
        <Typography variant="h4" className="dashboard-header">
          
        </Typography>

        {/* Weekdays Bar */}
        <WeekdaysBar />

        {/* Search Bar */}
        <SearchBar />

        {/* Actions và Grid Content */}
        <div className="dashboard-actions">
          {/* Action Buttons */}
          <ActionButtons onAdd={onAddBox} onRemove={onRemoveBox} />

          {/* Grid Content */}
          <GridContent
            boxes={boxes}
            onUpdateBoxName={onUpdateBoxName} // Truyền hàm cập nhật tên box
            onBoxClick={handleBoxClick} // Truyền hàm click xuống GridContent
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
