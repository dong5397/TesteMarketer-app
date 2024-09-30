import styled from "styled-components";

function Mypage() {
  return (
    <Background>
      <MypageContainer>
        <ProfileContainer>
          <ProfileCard></ProfileCard>
          <ProfileContents>
            <h2>프로필 내용</h2>
            <Button>프로필 수정</Button>
          </ProfileContents>
        </ProfileContainer>

        <ReviewLikeFavoriteContainer>
          <ReviewCard>
            <ImageContainer>
              <ImagePencil />
            </ImageContainer>
          </ReviewCard>

          <ReviewCard>
            <ImageContainer>
              <ImageLike />
            </ImageContainer>
          </ReviewCard>

          <ReviewCard>
            <ImageContainer>
              <ImageBookmark />
            </ImageContainer>
          </ReviewCard>
        </ReviewLikeFavoriteContainer>

        <h1 className="FoodiePocket">FoodiePocket</h1>
        <FoodiePocketContainer>
          <FoodiePocketCard />
        </FoodiePocketContainer>
      </MypageContainer>
    </Background>
  );
}

export default Mypage;

const Background = styled.div`
  background: linear-gradient(#e7e78b, #f0f0c3, #e7e78b);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

const MypageContainer = styled.div`
  background: white;
  max-width: 960px;
  width: 100%;
  border-radius: 10px; /* 둥근 모서리 추가 */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
  padding: 20px;
  font-family: "GowunDodum-Regular", sans-serif;

  .FoodiePocket {
    font-family: "GowunDodum-Regular", sans-serif;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 2rem; /* 여유로운 간격 */
  flex-wrap: wrap; /* 화면이 좁을 때 자동 줄바꿈 */
  font-family: "GowunDodum-Regular", sans-serif;
`;

const ProfileCard = styled.div`
  border-radius: 50%;
  background-color: #333;
  background-image: url("public/images/Users/user.png");
  background-position: center;
  background-size: cover; /* 더 나은 이미지 처리 */
  background-repeat: no-repeat;
  height: 15rem;
  width: 15rem;
`;

const ProfileContents = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;

  h2 {
    font-size: 2.2rem;
    margin: 0;
    color: #333; /* 텍스트 색상 조정 */
    font-family: "GowunDodum-Regular", sans-serif;
  }
`;

const ReviewLikeFavoriteContainer = styled.div`
  display: flex;
  justify-content: space-around; /* 간격 넉넉하게 */
  gap: 1.5rem;
  margin: 20px 0;
  flex-wrap: wrap; /* 화면이 좁을 때 줄바꿈 */
`;

const ReviewCard = styled.div`
  width: 280px;
  border: 1px solid #ddd;
  border-radius: 12px;
  height: 120px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2); /* 부드러운 호버 효과 */
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/* 연필 이미지 */
const ImagePencil = styled.div`
  background-image: url("public/images/Users/pen.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 60px;
  height: 60px;
`;

/* 좋아요 이미지 */
const ImageLike = styled.div`
  background-image: url("public/images/Users/like.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 60px;
  height: 60px;

  &:hover {
    background-image: url("public/images/Users/likehover.png");
  }
`;

/* 북마크 이미지 */
const ImageBookmark = styled.div`
  background-image: url("public/images/Users/bookmark.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 60px;
  height: 60px;
`;

const FoodiePocketContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1.5rem;
  padding: 20px;
`;

const FoodiePocketCard = styled.div`
  background-image: url("public/images/Users/plus.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  width: 170px;
  height: 200px;
  background-color: #f5f5f5;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Button = styled.button`
  padding: 15px 30px;
  width: auto;
  background-color: #3050d0;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1.8rem;
  transition: background-color 0.3s ease;
  font-family: "GowunDodum-Regular", sans-serif;

  &:hover {
    background-color: #203090;
  }
`;
