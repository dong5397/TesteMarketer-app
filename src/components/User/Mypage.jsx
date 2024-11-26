import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaCamera, FaTh, FaStar } from "react-icons/fa";
import { DeviceFrameset } from "react-device-frameset";

function Mypage() {
  const [selectedTab, setSelectedTab] = useState("posts");
  const [username, setUsername] = useState("jimin2570");
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // API 호출하여 데이터 가져오기
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://maketerbackend.fly.dev/api/v1/profile"
        );
        const data = await response.json();
        setPosts(data.posts || []); // 데이터 구조에 따라 posts 설정
        setFavorites(data.favorites || []); // 데이터 구조에 따라 favorites 설정
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleNicknameClick = () => {
    navigate("/ProfileEdit");
  };

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
                <Button onClick={() => navigate("/MyReviewList")}>
                  내 리뷰관리
                </Button>
              </EditButtons>
            </ProfileInfo>
          </ProfileHeader>
          <TabContainer>
            <Tab
              isActive={selectedTab === "posts"}
              onClick={() => setSelectedTab("posts")}
            >
              <FaTh />
            </Tab>
            <Tab
              isActive={selectedTab === "favorites"}
              onClick={() => setSelectedTab("favorites")}
            >
              <FaStar />
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
                <Content>작성된 식당 포스트가 없습니다.</Content>
              )}
            </PostList>
          ) : (
            <PostList>
              {favorites.length > 0 ? (
                favorites.map((favorite, index) => (
                  <PostItem key={index}>
                    <PostTitle>{favorite.name}</PostTitle>
                    <PostContent>{favorite.description}</PostContent>
                  </PostItem>
                ))
              ) : (
                <Content>즐겨찾기한 식당이 없습니다.</Content>
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
  overflow: hidden; /* DeviceFrameset이 영역을 벗어나지 않도록 제한 */
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
  font-size: 1.5rem;
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
