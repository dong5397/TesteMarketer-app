import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaCamera, FaTh, FaTrash, FaEdit } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import { DeviceFrameset } from "react-device-frameset";
import { useRecoilState } from "recoil";
import { authState } from "../../state/userAtoms";

function Mypage() {
  const [selectedTab, setSelectedTab] = useState("posts");
  const [username, setUsername] = useRecoilState(authState);
  const [posts, setPosts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // API 호출하여 데이터 가져오기
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://makterback.fly.dev/api/v1/profile",
          { credentials: "include" } // 세션 인증 포함
        );
        const data = await response.json();
        if (response.ok) {
          setUsername(data.username || "익명 사용자");
          setPosts(data.posts || []);
        } else {
          console.error("API Error:", data.msg);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedTab === "reviews") {
      // 리뷰 데이터 가져오기
      const fetchReviews = async () => {
        setLoading(true);
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
        } finally {
          setLoading(false);
        }
      };

      fetchReviews();
    } else if (selectedTab === "posts") {
      // 포스트 데이터 가져오기
      const fetchPosts = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            "https://maketerbackend.fly.dev/api/v1/user-posts",
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
            setPosts(data.data || []); // 데이터 설정
          } else {
            console.error("API Error:", data.msg || "데이터 로드 실패");
            setPosts([]);
          }
        } catch (error) {
          console.error("Error fetching posts:", error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchPosts();
    }
  }, [selectedTab]);

  const handleNicknameClick = () => {
    navigate("/ProfileEdit");
  };

  const handleDelete = async (reviewId) => {
    console.log("Attempting to delete review with ID:", reviewId); // 로그 추가
    if (!window.confirm("리뷰를 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(
        `https://maketerbackend.fly.dev/api/v1/reviews/${reviewId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log("Delete API Response:", data); // 응답 확인

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
        <DeviceFrameset device="iPad Mini">
          <Container>
            <Content>로딩 중...</Content>
          </Container>
        </DeviceFrameset>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <DeviceFrameset device="iPad Mini">
        <Container>
          <ProfileHeader>
            <ProfileImageContainer>
              <ProfileImage
                src="https://www.studiopeople.kr/common/img/default_profile.png"
                alt="Profile"
              />
              <FaCamera />
            </ProfileImageContainer>
            <ProfileInfo>
              <Username>{username.username}</Username>
              <EditButtons>
                <Button onClick={handleNicknameClick}>프로필 편집</Button>
              </EditButtons>
            </ProfileInfo>
          </ProfileHeader>
          <TabContainer>
            <Tab
              isActive={selectedTab === "posts"}
              onClick={() => setSelectedTab("posts")}
            >
              <FaTh /> 포스트
            </Tab>
            <Tab
              isActive={selectedTab === "reviews"}
              onClick={() => setSelectedTab("reviews")}
            >
              <MdOutlineRateReview /> 리뷰
            </Tab>
          </TabContainer>
          <ScrollableList>
            {selectedTab === "posts" ? (
              <PostList>
                {posts.length > 0 ? (
                  posts.map((post, index) => (
                    <PostItem key={index}>
                      <PostTitle>{post.title}</PostTitle>
                      <PostContent>{post.content}</PostContent>
                    </PostItem>
                  ))
                ) : (
                  <Content>작성한 포스트가 없습니다.</Content>
                )}
              </PostList>
            ) : (
              <PostList>
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <PostItem key={index}>
                      <PostTitle>{review.restaurant_name}</PostTitle>
                      <PostContent>{review.review_content}</PostContent>
                      <PostContent>평점: {review.rating}/5</PostContent>
                      <ReviewDate>
                        {review.review_date || "날짜 없음"}
                      </ReviewDate>
                      {review.hashtags && (
                        <HashtagList>
                          {review.hashtags.map((tag, idx) => (
                            <Hashtag key={idx}>#{tag}</Hashtag>
                          ))}
                        </HashtagList>
                      )}
                      <ReviewActions>
                        <ActionButton
                          onClick={() => handleEdit(review.review_id)}
                        >
                          <FaEdit /> 수정
                        </ActionButton>
                        <ActionButton
                          danger
                          onClick={() => handleDelete(review.review_id)}
                        >
                          <FaTrash /> 삭제
                        </ActionButton>
                      </ReviewActions>
                    </PostItem>
                  ))
                ) : (
                  <Content>작성한 리뷰가 없습니다.</Content>
                )}
              </PostList>
            )}
          </ScrollableList>
        </Container>
      </DeviceFrameset>
    </MainContainer>
  );
}

export default Mypage;

const MainContainer = styled.div`
  background-color: #e7e78b;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  overflow: hidden;
`;

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  padding: 20px;
  color: #fff;
  font-family: Arial, sans-serif;
`;
const ScrollableList = styled.div`
  max-height: 500px;
  overflow-y: auto;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #aaa;
    border-radius: 4px;
  }
`;
const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid #ddd;
`;

const ProfileInfo = styled.div`
  margin-left: 20px;
  flex: 1;
`;

const Username = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const EditButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  flex: 1;
  padding: 8px;
  font-size: 0.9rem;
  color: #fff;
  background-color: #333;
  border: 1px solid #555;
  border-radius: 5px;
  cursor: pointer;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  border-top: 1px solid #333;
`;

const Tab = styled.div`
  flex: 1;
  text-align: center;
  padding: 10px 0;
  font-size: 1rem;
  color: ${(props) => (props.isActive ? "black" : "#666")};
  border-bottom: ${(props) => (props.isActive ? "2px solid #666" : "none")};
  cursor: pointer;
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`;

const PostItem = styled.div`
  background: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  color: #333;
`;

const PostTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const PostContent = styled.p`
  font-size: 1rem;
  color: #555;
`;

const Content = styled.div`
  text-align: center;
  font-size: 1rem;
  color: #999;
  padding-top: 20px;
`;

const ReviewDate = styled.p`
  font-size: 0.9rem;
  color: #777;
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
