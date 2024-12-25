import React, { useState } from "react";
import { Box, TextField, IconButton, Tooltip, Typography, Button } from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const GridItem = ({ id, name, onUpdateName }) => {
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa
  const [newName, setNewName] = useState(name); // Tên mới được chỉnh sửa
  const navigate = useNavigate(); // Điều hướng giữa các trang

  // Bắt đầu chỉnh sửa
  const handleEdit = (e) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
    setIsEditing(true); // Bật chế độ chỉnh sửa
  };

  // Lưu tên mới
  const handleSave = (e) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
    if (newName.trim()) {
      onUpdateName(id, newName.trim()); // Gửi tên mới lên
      setIsEditing(false); // Tắt chế độ chỉnh sửa
    } else {
      alert("Tên không được để trống!"); // Thông báo nếu tên rỗng
    }
  };

  // Hủy chỉnh sửa
  const handleCancel = (e) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
    setNewName(name); // Khôi phục lại tên ban đầu
    setIsEditing(false); // Tắt chế độ chỉnh sửa
  };

  // Điều hướng khi click vào ô (chỉ khi không chỉnh sửa)
  const handleNavigate = () => {
    if (!isEditing) {
      navigate(`/todo/${id}`); // Điều hướng đến trang cụ thể
    }
  };

  return (
    <Box
      onClick={handleNavigate} // Điều hướng khi click vào ô
      sx={{
        width: "310px",
        height: "180px",
        padding: "20px",
        margin: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: isEditing ? "#fffbe6" : "#b94646", // Nền đỏ
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: isEditing ? "space-between" : "center", // Thay đổi căn chỉnh khi chỉnh sửa
        cursor: isEditing ? "default" : "pointer",
        "&:hover": {
          backgroundColor: isEditing ? "#fffbe6" : "#d75c5c", // Nền đỏ nhạt khi hover
        },
      }}
    >
      {isEditing ? (
        <>
          {/* Form chỉnh sửa */}
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <TextField
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              size="small"
              variant="outlined"
              placeholder="Nhập tên mới"
              autoFocus
              fullWidth
              onClick={(e) => e.stopPropagation()} // Ngăn chặn click ảnh hưởng đến ô ngoài
              onKeyDown={(e) => e.key === "Enter" && handleSave(e)} // Lưu khi nhấn Enter
            />
            <Tooltip title="Hủy">
              <IconButton color="secondary" onClick={handleCancel}>
                <Cancel sx={{ color: "#fff" }} />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Nút Lưu */}
          <Button
            onClick={handleSave}
            sx={{
              marginTop: "10px",
              backgroundColor: "#1976d2",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            Lưu
          </Button>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Tên ô */}
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              color: "#fff", // Màu chữ trắng
              fontSize: "1.4rem", // Tăng kích thước chữ
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </Typography>
          {/* Nút chỉnh sửa */}
          <Box
            onClick={(e) => e.stopPropagation()} // Ngăn sự kiện lan ra ô ngoài
          >
            <Tooltip title="Chỉnh sửa">
              <IconButton
                onClick={handleEdit} // Chỉ xử lý chỉnh sửa
                sx={{
                  color: "#fff", // Màu trắng cho biểu tượng
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)", // Nền trắng mờ khi hover
                  },
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default GridItem;
