import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const RangeSlider = ({ onSave }) => {
  const [value, setValue] = useState(3);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSave = () => {
    onSave(value);
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
      <button onClick={handleSave}>저장</button>
    </Box>
  );
};

export default RangeSlider;
