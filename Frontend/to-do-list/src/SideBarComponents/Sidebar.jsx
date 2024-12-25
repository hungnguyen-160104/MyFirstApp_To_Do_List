import React, { useState } from "react";
import "./Sidebar.css";
import ProfileHeader from "./ProfileHeader";
import GroupTasks from "../Group/GroupTasks";

const Sidebar = () => {
  const [items, setItems] = useState([{ name: "Công việc nhóm", editable: false }]);

  // Thêm mục mới
  const addNewItem = () => {
    const newItem = { name: `Mục mới ${items.length + 1}`, editable: false };
    setItems([...items, newItem]);
  };

  // Xóa mục
  const deleteItem = (index) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn xóa mục này không?");
    if (confirmDelete) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  // Bật chế độ chỉnh sửa
  const toggleEdit = (index) => {
    const newItems = [...items];
    newItems[index].editable = !newItems[index].editable;
    setItems(newItems);
  };

  // Cập nhật tên mục
  const updateItemName = (index, newName) => {
    const newItems = [...items];
    newItems[index].name = newName;
    setItems(newItems);
  };

  return (
    <div className="sidebar">
      <ProfileHeader />

      <div className="menu">
        {items.map((item, index) => (
          <GroupTasks
            key={index}
            item={item}
            index={index}
            toggleEdit={toggleEdit}
            updateItemName={updateItemName}
            deleteItem={deleteItem}
          />
        ))}

        <div className="add-button" onClick={addNewItem}>
          <span>+ Thêm mới</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
