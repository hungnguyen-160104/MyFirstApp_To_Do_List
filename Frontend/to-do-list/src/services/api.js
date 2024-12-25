import axios from "axios";

// Tạo một instance của axios với cấu hình cơ bản
const API = axios.create({
  baseURL: "http://localhost:5000/api/auth", // Đổi URL này nếu backend chạy trên server khác
  headers: {
    "Content-Type": "application/json",
  },
});

// Hàm đăng ký người dùng
export const registerUser = async (username, email, password, address) => {
  try {
    const response = await API.post("/register", {
      username,
      email,
      password,
      address,
    });
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
};

// Hàm đăng nhập người dùng
export const loginUser = async (email, password) => {
  try {
    const response = await API.post("/login", {
      email,
      password,
    });
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
};
