import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DeviceFrameset } from "react-device-frameset";
import ListPage from "../../components/Community/ListPage";
import ListSerchPage from "../../components/Community/ListSerchPage";

function MainListpage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleRoute = () => {
    navigate("/MainWritePage");
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]); // 공백일 때 검색 결과를 빈 배열로 설정
      return;
    }
    try {
      const response = await fetch(
        `https://makterbackend.fly.dev/api/v1/posts?title=${encodeURIComponent(
          searchQuery
        )}`
      );
      if (!response.ok) {
        throw new Error("검색 중 오류가 발생했습니다.");
      }
      const data = await response.json();
      setSearchResults(data.data);
    } catch (error) {
      console.error(error);
      alert("검색 중 오류가 발생했습니다.");
    }
  };
  return (
    <MainContainer>
      <ListPageWrapper>
        <DeviceFrameset
          device="iPad Mini"
          color="black"
          width="100%"
          height="75%"
        >
          <StyledContainer>
            <DivContainer>
              <DeviceContent>
                <Container>
                  <Header>
                    <h1>Community</h1>
                    <Button onClick={handleRoute}>글쓰기</Button>
                  </Header>
                  <SearchContainer>
                    <SearchInput
                      type="text"
                      placeholder="제목으로 검색"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <SearchButton onClick={handleSearch}>검색</SearchButton>
                  </SearchContainer>
                  <ScrollableList>
                    <ListSerchPage posts={searchResults} />
                    <ListPage />
                  </ScrollableList>
                </Container>
              </DeviceContent>
            </DivContainer>
          </StyledContainer>
        </DeviceFrameset>
      </ListPageWrapper>
    </MainContainer>
  );
}

export default MainListpage;

const MainContainer = styled.div`
  height: 1200px;
  background: linear-gradient(#e7e78b, #f0f0c3);
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #e1f5fe;
`;

const DivContainer = styled.div`
  flex: 1;
  display: flex;
`;

const DeviceContent = styled.div`
  flex: 1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  padding: 20px;
  background-color: #ffcc66;
  color: white;
  text-align: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background-color: #ff6b6b;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  align-self: center;
`;

const ListPageWrapper = styled.div`
  max-width: 1000px;
  height: 1000px;
  margin: 0 auto;
  padding: 20px;
  gap: 100px;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const SearchInput = styled.input`
  width: 70%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
`;

const SearchButton = styled.button`
  background-color: #357ab7;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #285a8c;
  }
`;

const ScrollableList = styled.div`
  flex: 1;
  overflow-y: auto; /* 스크롤 가능하게 설정 */
  padding: 20px;
  margin-top: 20px;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
