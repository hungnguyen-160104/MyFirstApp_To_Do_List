import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../services/api"; // Import các hàm API
import "./UserProfile.css";
import bk2Image from "./bk2.jpg";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa
  const [user, setUser] = useState(null); // Thông tin người dùng từ backend
  const [error, setError] = useState(""); // Thông báo lỗi
  const navigate = useNavigate();

  // Lấy thông tin người dùng từ API khi component được render
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); // Điều hướng về trang login nếu không có token
        return;
      }
      try {
        const userData = await getUserProfile(token); // Gọi API lấy thông tin người dùng
        setUser(userData); // Cập nhật state với thông tin từ backend
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", err);
        navigate("/login"); // Điều hướng về trang login nếu có lỗi
      }
    };

    fetchUserData();
  }, [navigate]);

  // Xử lý cập nhật thông tin
  const handleSaveProfile = async () => {
    setError(""); // Xóa thông báo lỗi
    try {
      console.log("Dữ liệu gửi đi:", user); // Log dữ liệu gửi tới API
      const token = localStorage.getItem("token");
      const updatedUser = await updateUserProfile(token, user); // Gọi API cập nhật thông tin
      console.log("Phản hồi từ API:", updatedUser); // Log phản hồi từ API
      setUser(updatedUser); // Cập nhật state với thông tin đã chỉnh sửa
      setIsEditing(false); // Thoát chế độ chỉnh sửa
      alert("Cập nhật thông tin thành công!");
    } catch (err) {
      console.error("Lỗi khi cập nhật thông tin:", err);
      setError(err.response?.data?.message || "Không thể cập nhật thông tin. Vui lòng thử lại.");
    }
  };

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!user) return <div>Đang tải dữ liệu...</div>; // Hiển thị khi dữ liệu đang được tải

  return (
    <div
      className="user-profile-background"
      style={{
        backgroundImage: `url(${bk2Image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="user-profile-container">
        <div className="user-profile-content">
          {/* Header thông tin cá nhân */}
          <div className="user-profile-header">
            <div className="avatar">{user.username.charAt(0).toUpperCase()}</div>
            <h1>Thông tin cá nhân</h1>
          </div>

          <hr className="divider" />

          {/* Hiển thị thông tin hoặc form chỉnh sửa */}
          {!isEditing ? (
            <div className="user-profile-info">
              <p>
                <strong>Tên:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {user.address}
              </p>
            </div>
          ) : (
            <div className="user-profile-edit-form">
              <label>
                Tên:
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  disabled // Không cho phép chỉnh sửa email
                />
              </label>
              <label>
                Địa chỉ:
                <input
                  type="text"
                  name="address"
                  value={user.address}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          )}

          {error && <p className="error-message">{error}</p>} {/* Hiển thị lỗi nếu có */}

          {/* Các nút điều hướng */}
          <div className="user-profile-buttons">
            {!isEditing ? (
              <>
                <button
                  className="btn primary"
                  onClick={() => navigate("/dashboard")}
                >
                  Quay về trang chính
                </button>
                <button
                  className="btn secondary"
                  onClick={() => setIsEditing(true)}
                >
                  Chỉnh sửa thông tin
                </button>
              </>
            ) : (
              <button className="btn primary" onClick={handleSaveProfile}>
                Lưu thông tin
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
