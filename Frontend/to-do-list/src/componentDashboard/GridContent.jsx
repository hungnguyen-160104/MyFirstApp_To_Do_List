import React from "react";
import GridItem from "./GridItem";
import { Box } from "@mui/material";

const GridContent = ({ boxes, onUpdateBoxName, onBoxClick }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
        padding: "10px",
      }}
    >
      {boxes.map((box) => (
        <GridItem
          key={box.id}
          id={box.id}
          name={box.name}
          onUpdateName={onUpdateBoxName} // Truyền hàm cập nhật tên cho GridItem
          onClick={() => onBoxClick(box.id)} // Gọi hàm điều hướng khi click vào ô
        />
      ))}
    </Box>
  );
};

export default GridContent;
