import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaCamera, FaTh } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import { DeviceFrameset } from "react-device-frameset";

function Mypage() {
  const [selectedTab, setSelectedTab] = useState("posts");
  const [username, setUsername] = useState("");
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
          "https://maketerbackend.fly.dev/api/v1/profile",
          { credentials: "include" } // 세션 인증 포함
        );
        const data = await response.json();
        if (response.ok) {
          setUsername(data.username || "익명 사용자");
          setPosts(data.posts || []);
          setReviews(data.reviews || []);
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

  const handleNicknameClick = () => {
    navigate("/ProfileEdit");
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
              <Username>{username}</Username>
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
                  </PostItem>
                ))
              ) : (
                <Content>작성한 리뷰가 없습니다.</Content>
              )}
            </PostList>
          )}
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
  padding: 20px;
  height: 100vh;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  padding: 20px;
  color: #fff;
  font-family: Arial, sans-serif;
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
