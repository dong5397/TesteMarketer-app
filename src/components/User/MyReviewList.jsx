import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

function UserReviewList() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "https://maketerbackend.fly.dev/api/v1/user-reviews",
          {
            method: "GET",
            credentials: "include", // 세션 인증
          }
        );

        if (!response.ok) {
          const errorText = await response.text(); // 에러 응답 읽기
          throw new Error(
            `HTTP error! status: ${response.status}, body: ${errorText}`
          );
        }

        const data = await response.json();

        if (data.resultCode === "S-1" && Array.isArray(data.data)) {
          setReviews(data.data || []); // 데이터 설정
        } else {
          console.error("API Error:", data.msg || "데이터 로드 실패");
          setReviews([]);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error.message);
        alert(
          "리뷰 데이터를 불러오는 데 문제가 발생했습니다. 다시 시도해주세요."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    if (!window.confirm("리뷰를 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(`/api/v1/reviews/${reviewId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok && data.resultCode === "S-1") {
        setReviews(reviews.filter((review) => review.review_id !== reviewId));
        alert("리뷰가 삭제되었습니다.");
      } else {
        alert(data.msg || "리뷰 삭제 실패");
      }
    } catch (error) {
      console.error("Error deleting review:", error.message);
      alert("리뷰 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleEdit = (reviewId) => {
    navigate(`/edit-review/${reviewId}`);
  };

  if (loading) {
    return (
      <MainContainer>
        <LoadingSpinner>
          <img src="/loading-spinner.gif" alt="Loading..." />
          데이터를 불러오는 중입니다...
        </LoadingSpinner>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      {reviews.length > 0 ? (
        reviews.map((review) =>
          review ? (
            <ReviewCard key={review.review_id}>
              <RestaurantName>
                {review.restaurant_name || "알 수 없는 식당"}
              </RestaurantName>
              <ReviewDate>{review.review_date || "날짜 없음"}</ReviewDate>
              <ReviewContent>
                {review.review_content || "내용 없음"}
              </ReviewContent>
              <ReviewRating>평점: {review.rating || "N/A"}/5</ReviewRating>
              {review.hashtags && (
                <HashtagList>
                  {review.hashtags.map((tag, idx) => (
                    <Hashtag key={idx}>#{tag}</Hashtag>
                  ))}
                </HashtagList>
              )}
              <ReviewActions>
                <ActionButton onClick={() => handleEdit(review.review_id)}>
                  <FaEdit /> 수정
                </ActionButton>
                <ActionButton
                  danger
                  onClick={() => handleDelete(review.review_id)}
                >
                  <FaTrash /> 삭제
                </ActionButton>
              </ReviewActions>
            </ReviewCard>
          ) : null
        )
      ) : (
        <NoReviews>작성된 리뷰가 없습니다.</NoReviews>
      )}
    </MainContainer>
  );
}

export default UserReviewList;

const MainContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const ReviewCard = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 0.9rem;
  }
`;

const RestaurantName = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 5px;
  color: #333;
`;

const ReviewDate = styled.p`
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 10px;
`;

const ReviewContent = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 10px;
`;

const ReviewRating = styled.p`
  font-size: 1rem;
  color: #333;
  margin-bottom: 10px;
`;

const HashtagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 10px;
`;

const Hashtag = styled.span`
  background: #e8f5e9;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 0.85rem;
  color: #388e3c;
`;

const ReviewActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  background: ${(props) => (props.danger ? "#e57373" : "#64b5f6")};
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background: ${(props) => (props.danger ? "#d32f2f" : "#1976d2")};
  }
`;

const NoReviews = styled.p`
  text-align: center;
  color: #777;
  font-size: 1rem;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  padding: 50px 0;

  img {
    width: 50px;
    height: 50px;
    display: block;
    margin: 0 auto;
  }
`;
