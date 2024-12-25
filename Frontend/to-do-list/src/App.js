import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";





// Import các component chính
import Header from "./components/Header";
import Features from "./components/Features";

import CTA from "./components/CTA";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Login from "./auth/Login";

// Import Dashboard Layout
import DashboardLayout from "./layouts/DashboardLayout";

// Import Group Components
import GroupTasks from "./Group/GroupTasks";
import GroupDetail from "./Group/GroupDetail";
import AddTask from "./Group/AddTask";

// Import Trang Cá Nhân và ToDoListPage
import UserProfile from "./SideBarComponents/UserProfile";
import ToDoListPage from "./ToDoListPage/ToDoListPage";

function App() {
  // State quản lý danh sách các ô
  const [boxes, setBoxes] = useState([
    { id: 1, name: "Ô 1" },
    { id: 2, name: "Ô 2" },
  ]);

  // Thêm ô mới
  const addBox = () => {
    const newBox = { id: boxes.length + 1, name: `Ô ${boxes.length + 1}` };
    setBoxes((prev) => [...prev, newBox]);
  };

  // Xóa ô cuối cùng (không cho nhỏ hơn 1 ô)
  const removeBox = () => {
    if (boxes.length > 1) {
      setBoxes((prev) => prev.slice(0, -1));
    }
  };

  // Cập nhật tên ô
  const updateBoxName = (id, newName) => {
    setBoxes((prev) =>
      prev.map((box) => (box.id === id ? { ...box, name: newName } : box))
    );
  };

  // Điều hướng giữa các trang
  return (
    <Router>
      <Routes>
        {/* Trang Chính */}
        <Route
          path="/"
          element={
          <div
            className="App"
          >
            <Header />
            <CTA />
            <Features />
            <AboutUs />
            <Contact />
          </div>

          }
        />

        {/* Trang Đăng Nhập */}
        <Route path="/login" element={<Login />} />

        {/* Trang Dashboard */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout
              boxes={boxes}
              onAddBox={addBox}
              onRemoveBox={removeBox}
              onUpdateBoxName={updateBoxName} // Truyền props để cập nhật ô
            />
          }
        />

        {/* Trang Cá Nhân */}
        <Route path="/user-profile" element={<UserProfile />} />

        {/* Trang ToDoList */}
        <Route path="/todo/:id" element={<ToDoListPage />} />

        {/* Nhóm Công Việc */}
        <Route path="/group/tasks" element={<GroupTasks />} />

        {/* Chi Tiết Nhóm */}
        <Route path="/group/detail" element={<GroupDetail />} />

        {/* Thêm Công Việc */}
        <Route path="/group/add-task" element={<AddTask />} />
      </Routes>
    </Router>
  );
}

export default App;
