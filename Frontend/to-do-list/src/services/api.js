import axios from "axios";

// Tạo một instance của axios với cấu hình mặc định
const API = axios.create({
  baseURL: "http://localhost:5000/api/auth", // Thay đổi baseURL nếu backend chạy ở địa chỉ khác
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor để tự động thêm token vào header nếu có
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Thêm token vào header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Đăng ký người dùng mới
 * @param {string} username - Tên người dùng
 * @param {string} email - Email của người dùng
 * @param {string} password - Mật khẩu của người dùng
 * @param {string} address - Địa chỉ của người dùng
 * @returns {Promise<Object>} - Thông tin người dùng mới
 */
export const registerUser = async (username, email, password, address) => {
  try {
    const response = await API.post("/register", {
      username,
      email,
      password,
      address,
    });
    return response.data; // Trả về dữ liệu từ API nếu thành công
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
};

/**
 * Đăng nhập người dùng
 * @param {string} email - Email của người dùng
 * @param {string} password - Mật khẩu của người dùng
 * @returns {Promise<Object>} - Token và thông tin người dùng
 */
export const loginUser = async (email, password) => {
  try {
    const response = await API.post("/login", {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token); // Lưu token mới vào localStorage
    return response.data; // Trả về token và thông tin người dùng nếu thành công
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
};

/**
 * Lấy thông tin cá nhân người dùng
 * @returns {Promise<Object>} - Thông tin cá nhân người dùng
 */
export const getUserProfile = async () => {
  try {
    const response = await API.get("/profile");
    return response.data.user; // Trả về thông tin người dùng từ API
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
};

/**
 * Cập nhật thông tin cá nhân
 * @param {Object} updates - Dữ liệu cần cập nhật (username, address, password,...)
 * @returns {Promise<Object>} - Thông tin người dùng sau khi cập nhật
 */
export const updateUserProfile = async (updates) => {
  try {
    const response = await API.put("/profile", updates);
    return response.data.user; // Trả về thông tin đã cập nhật
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
};

/**
 * Đăng xuất người dùng
 */
export const logoutUser = () => {
  localStorage.removeItem("token"); // Xóa token khỏi localStorage
};
