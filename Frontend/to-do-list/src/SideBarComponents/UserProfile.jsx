import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";
import bk2Image from "./bk2.jpg";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa
  const [user, setUser] = useState({
    name: "Phạm Nguyễn Hùng Nguyên",
    email: "Nguyen.PNH226115@sis.hust.edu.vn",
    address: "Hai Bà Trưng - Hà Nội",
    bio: "Bonjour !",
    currentPassword: "123456", // Mật khẩu hiện tại (giả định)
  });
  const [passwordInputs, setPasswordInputs] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordError, setPasswordError] = useState(""); // Thông báo lỗi đổi mật khẩu

  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const handleEditProfile = () => {
    setIsEditing(true); // Bật chế độ chỉnh sửa
  };

  const handleSaveProfile = () => {
    // Kiểm tra nếu đang chỉnh sửa mật khẩu
    if (
      passwordInputs.oldPassword ||
      passwordInputs.newPassword ||
      passwordInputs.confirmNewPassword
    ) {
      // Kiểm tra mật khẩu cũ có đúng không
      if (passwordInputs.oldPassword !== user.currentPassword) {
        setPasswordError("Mật khẩu cũ không đúng.");
        return;
      }

      // Kiểm tra mật khẩu mới có khớp nhau không
      if (passwordInputs.newPassword !== passwordInputs.confirmNewPassword) {
        setPasswordError("Mật khẩu mới không khớp.");
        return;
      }

      // Kiểm tra độ dài mật khẩu mới
      if (passwordInputs.newPassword.length < 6) {
        setPasswordError("Mật khẩu mới phải có ít nhất 6 ký tự.");
        return;
      }

      // Cập nhật mật khẩu
      setUser({ ...user, currentPassword: passwordInputs.newPassword });
      setPasswordInputs({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
      setPasswordError(""); // Xóa lỗi
      alert("Mật khẩu đã được thay đổi thành công!");
    }

    setIsEditing(false); // Tắt chế độ chỉnh sửa
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in passwordInputs) {
      setPasswordInputs({ ...passwordInputs, [name]: value }); // Cập nhật mật khẩu
    } else {
      setUser({ ...user, [name]: value }); // Cập nhật thông tin cá nhân
    }
  };

  return (
    <div
      className="user-profile-background"
      style={{ backgroundImage: `url(${bk2Image})` }}
    >
      <div className="user-profile-container">
        <div className="user-profile-content">
          {/* Avatar và Tiêu đề */}
          <div className="user-profile-header">
            <div className="avatar">N</div>
            <h1>Thông tin cá nhân</h1>
          </div>

          <hr className="divider" />

          {/* Hiển thị thông tin hoặc form chỉnh sửa */}
          {!isEditing ? (
            <div className="user-profile-info">
              <p>
                <strong>Tên:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {user.address}
              </p>
              <p>
                <strong>Giới thiệu:</strong> {user.bio}
              </p>
            </div>
          ) : (
            <div className="user-profile-edit-form">
              <label>
                Tên:
                <input
                  type="text"
                  name="name"
                  value={user.name}
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
              <label>
                Giới thiệu:
                <textarea
                  name="bio"
                  value={user.bio}
                  onChange={handleInputChange}
                ></textarea>
              </label>
              <hr />
              <h3>Đổi mật khẩu</h3>
              <label>
                Mật khẩu cũ:
                <input
                  type="password"
                  name="oldPassword"
                  value={passwordInputs.oldPassword}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Mật khẩu mới:
                <input
                  type="password"
                  name="newPassword"
                  value={passwordInputs.newPassword}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Nhập lại mật khẩu mới:
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={passwordInputs.confirmNewPassword}
                  onChange={handleInputChange}
                />
              </label>
              {passwordError && <p className="error-message">{passwordError}</p>}
            </div>
          )}

          {/* Các nút điều hướng */}
          <div className="user-profile-buttons">
            {!isEditing ? (
              <>
                <button
                  className="btn primary"
                  onClick={handleBackToDashboard}
                >
                  Quay về trang chính
                </button>
                <button
                  className="btn secondary"
                  onClick={handleEditProfile}
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
