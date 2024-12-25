import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../services/api"; // Import API
import "./Login.css";
import hinhNen from "./hust1.png";

const Login = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [isReset, setIsReset] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
    });
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setIsReset(false);
    resetForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isReset) {
      alert("Quên mật khẩu chưa được hỗ trợ.");
      return;
    }

    try {
      if (isLogin) {
        // Gọi API đăng nhập
        const data = await loginUser(formData.email, formData.password);
        console.log("Đăng nhập thành công:", data);
        navigate("/dashboard");
      } else {
        // Xử lý đăng ký
        if (formData.password !== formData.confirmPassword) {
          alert("Mật khẩu xác nhận không khớp!");
          return;
        }

        const data = await registerUser(
          formData.username,
          formData.email,
          formData.password,
          formData.address
        );
        console.log("Đăng ký thành công:", data);
        alert("Đăng ký thành công! Bây giờ bạn có thể đăng nhập.");
        setIsLogin(true);
        resetForm();
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert(error.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  const handleForgotPassword = () => {
    setIsReset(true);
    resetForm();
  };

  const handleCancelForgot = () => {
    setIsReset(false);
    setIsLogin(true);
    resetForm();
  };

  let title = "Đăng nhập";
  let buttonText = "Đăng nhập";
  let bottomText = (
    <p className="register-text">
      Bạn có tài khoản chưa?{" "}
      <a href="#" onClick={handleToggle}>
        Đăng ký
      </a>
    </p>
  );

  if (!isLogin && !isReset) {
    title = "Đăng ký";
    buttonText = "Đăng ký";
    bottomText = (
      <p className="register-text">
        Bạn có tài khoản rồi à?{" "}
        <a href="#" onClick={handleToggle}>
          Đăng nhập
        </a>
      </p>
    );
  } else if (isReset) {
    title = "Quên mật khẩu";
    buttonText = "Đặt lại mật khẩu";
    bottomText = (
      <p className="register-text">
        <a href="#" onClick={handleCancelForgot}>
          Thoát
        </a>
      </p>
    );
  }

  return (
    <div
      className="login-bg"
      style={{
        backgroundImage: `url(${hinhNen})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="login-container">
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && !isReset && (
            <div className="input-group">
              <input
                type="text"
                name="username"
                placeholder="Tên người dùng"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {!isLogin && !isReset && (
            <div className="input-group">
              <input
                type="text"
                name="address"
                placeholder="Địa chỉ"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {!isReset && (
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {!isLogin && !isReset && (
            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Xác nhận mật khẩu"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button type="submit" className="login-button">
            {buttonText}
          </button>
        </form>
        {bottomText}
      </div>
    </div>
  );
};

export default Login;
