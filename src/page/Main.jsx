import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Main() {
  const [mainImg, setMainImg] = useState([]);

  useEffect(() => {
    fetch("https://makterteste.fly.dev/api/v1/restaurants")
      .then((response) => response.json())
      .then((data) => {
        setMainImg(Array.isArray(data.data) ? data.data : [data.data]);
      });
  }, []);

  return (
    <Container>
      <RestPost>
        <Carousel
          showThumbs
          autoPlay
          infiniteLoop
          showStatus={false}
          transitionTime={3}
        >
          {mainImg.map((restaurant) => (
            <div key={restaurant.restaurants_id}>
              <img src={restaurant.image} alt={restaurant.restaurants_name} />
            </div>
          ))}
        </Carousel>
      </RestPost>
    </Container>
  );
}

export default Main;

const Container = styled.div``;
const RestPost = styled.div`
  display: flex;
  align-items: center;
`;
