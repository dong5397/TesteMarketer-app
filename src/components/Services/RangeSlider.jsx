import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const RangeSlider = ({ onSave }) => {
  const [value, setValue] = useState(3);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onSave(newValue); // 수정된 부분
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        value={value}
        onChange={handleChange}
        marks={[
          { value: 0, label: "매우 싫어요" },
          { value: 1, label: "싫어요" },
          { value: 2, label: "중간이에요" },
          { value: 3, label: "좋아요" },
          { value: 4, label: "매우 좋아요" },
        ]}
        step={1}
        min={0}
        max={4}
      />
    </Box>
  );
};

export default RangeSlider;
