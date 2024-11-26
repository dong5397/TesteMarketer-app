import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTrash, FaEdit } from "react-icons/fa";
import { DeviceFrameset } from "react-device-frameset";

function MyReviewList() {
  const navigate = useNavigate();

  // 샘플 리뷰 데이터 (API 연동 시 대체 가능)
  const [reviews, setReviews] = useState([
    {
      id: 1,
      restaurant: "김밥천국",
      content: "맛있고 저렴한 식사가 가능했습니다!",
      date: "2024-11-15",
    },
    {
      id: 2,
      restaurant: "홍콩반점",
      content: "탕수육이 너무 맛있었어요.",
      date: "2024-11-10",
    },
  ]);

  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleDelete = (id) => {
    if (window.confirm("정말로 이 리뷰를 삭제하시겠습니까?")) {
      setReviews(reviews.filter((review) => review.id !== id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-review/${id}`); // 리뷰 수정 페이지로 이동
  };

  return (
    <MainContainer>
      <DeviceFrameset device="iPad Mini">
        <Container>
          <Header>
            <BackButton onClick={handleGoBack}>
              <FaArrowLeft />
            </BackButton>
            <Title>내 리뷰 관리</Title>
          </Header>

          <ReviewList>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewCard key={review.id}>
                  <RestaurantName>{review.restaurant}</RestaurantName>
                  <ReviewDate>{review.date}</ReviewDate>
                  <ReviewContent>{review.content}</ReviewContent>
                  <ReviewActions>
                    <ActionButton onClick={() => handleEdit(review.id)}>
                      <FaEdit /> 수정
                    </ActionButton>
                    <ActionButton onClick={() => handleDelete(review.id)}>
                      <FaTrash /> 삭제
                    </ActionButton>
                  </ReviewActions>
                </ReviewCard>
              ))
            ) : (
              <NoReviews>아직 작성한 리뷰가 없습니다.</NoReviews>
            )}
          </ReviewList>
        </Container>
      </DeviceFrameset>
    </MainContainer>
  );
}

export default MyReviewList;

const MainContainer = styled.div`
  background-color: #e7e78b;
  display: flex;
  justify-content: center;
  padding: 20px;
  height: 100vh;
  overflow: hidden; /* DeviceFrameset이 영역을 벗어나지 않도록 제한 */
`;

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  padding: 20px;
  color: #fff;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: #1e90ff;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-left: 10px;
`;

const ReviewList = styled.div`
  margin-top: 20px;
`;

const ReviewCard = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
`;

const RestaurantName = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const ReviewDate = styled.p`
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 10px;
`;

const ReviewContent = styled.p`
  font-size: 1rem;
  margin-bottom: 10px;
`;

const ReviewActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  background: #1e90ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  font-size: 0.9rem;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background: #0056b3;
  }

  &:last-child {
    background: #ff4d4d;

    &:hover {
      background: #b30000;
    }
  }
`;

const NoReviews = styled.p`
  text-align: center;
  font-size: 1rem;
  color: #777;
  margin-top: 50px;
`;
