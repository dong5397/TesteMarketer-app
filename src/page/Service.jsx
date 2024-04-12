import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Service = () => {
  const [tasteLevels, setTasteLevels] = useState({
    sweetness: 50,
    saltiness: 50,
    sourness: 50,
    bitterness: 50,
  });

  const handleChange = (e) => {
    // ex) e.target == <input type="range" id="saltinessSlider" name="saltiness" min="0" max="100" value="64">
    // 구조 분해할당 name이랑 value 객체에 넣기
    const { name, value } = e.target;
    setTasteLevels({ ...tasteLevels, [name]: parseInt(value) });
  };

  return (
    <div>
      <label htmlFor="sweetnessSlider">단맛에 대한 선호도:</label>
      <input
        type="range"
        id="sweetnessSlider"
        name="sweetness"
        min="0"
        max="100"
        value={tasteLevels.sweetness}
        onChange={handleChange}
      />
      <p>선택한 단맛 선호도: {tasteLevels.sweetness}</p>

      <label htmlFor="saltinessSlider">짠맛에 대한 선호도:</label>
      <input
        type="range"
        id="saltinessSlider"
        name="saltiness"
        min="0"
        max="100"
        value={tasteLevels.saltiness}
        onChange={handleChange}
      />
      <p>선택한 짠맛 선호도: {tasteLevels.saltiness}</p>

      <label htmlFor="sournessSlider">신맛에 대한 선호도:</label>
      <input
        type="range"
        id="sournessSlider"
        name="sourness"
        min="0"
        max="100"
        value={tasteLevels.sourness}
        onChange={handleChange}
      />
      <p>선택한 신맛 선호도: {tasteLevels.sourness}</p>

      <label htmlFor="bitternessSlider">쓴맛에 대한 선호도:</label>
      <input
        type="range"
        id="bitternessSlider"
        name="bitterness"
        min="0"
        max="100"
        value={tasteLevels.bitterness}
        onChange={handleChange}
      />
      <p>선택한 쓴맛 선호도: {tasteLevels.bitterness}</p>
    </div>
  );
};
export default Service;
