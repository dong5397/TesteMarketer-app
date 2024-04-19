import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Service = () => {
  const [tasteLevels, setTasteLevels] = useState({
    sweetness: 0,
    saltiness: 0,
    sourness: 0,
    bitterness: 0,
  });

  return (
    <>
      <div>
        <div>
          <h1>좋아하는 맛 선호도 검사 테스트</h1>
        </div>
        <div>
          <h2>대충 설명글</h2>
        </div>
        <button>검사하기</button>
      </div>

      <div>
        <div>
          <h1>
            사용자님께서 좋아하는 맛을 확인하기 위해 몇가지 설문조사를 하도록
            하겠습니다.
          </h1>
        </div>
        <div>
          <form action="">
            <Fildset>
              <h1>
                질문 1: 배가 고파 컵라면을 먹으려고합니다. 어떤 컵라면을
                드시겠습니까?
              </h1>
              <input type="radio" id="survey1-1" />
              <label for="survey1-1">1. 육개장 사발면</label>
              <input type="radio" id="survey1-2" />
              <label for="survey1-2">2. 비빔면</label>
              <input type="radio" id="survey1-3" />
              <label for="survey1-3">3. 짜왕</label>
            </Fildset>
            <Fildset>
              <h1>
                질문 2: 주말에 카페에서 시간을 보내려고 합니다. 어떤 음료를
                주문하시겠습니까?
              </h1>
              <input type="radio" id="survey1-1" />
              <label for="survey2-1">1. 아메리카노</label>
              <input type="radio" id="survey1-2" />
              <label for="survey2-2">2. 카페라떼</label>
              <input type="radio" id="survey1-3" />
              <label for="survey2-3">3. 아이스티</label>
            </Fildset>
            <Fildset>
              <h1>질문 3: 영화를 보러갈 때 간식으로 무엇을 선호하시나요?</h1>
              <input type="radio" id="survey1-1" />
              <label for="survey3-1">1. 팝콘</label>
              <input type="radio" id="survey1-2" />
              <label for="survey3-2">2. 나쵸</label>
              <input type="radio" id="survey1-3" />
              <label for="survey3-3">3. 핫도그</label>
            </Fildset>
            <Fildset>
              <h1>질문 4: 브런치 카페에 갔을 때 어떤 브런치를 선호하시나요?</h1>
              <input type="radio" id="survey1-1" />
              <label for="survey4-1">1. 프렌치 토스트</label>
              <input type="radio" id="survey1-2" />
              <label for="survey4-2">2. 베리 팬케이크</label>
              <input type="radio" id="survey1-3" />
              <label for="survey4-3">3. 와플</label>
            </Fildset>
          </form>
        </div>
      </div>
    </>
  );
};
export default Service;

const Fildset = styled.div`
  max-width: 1000px;
  max-height: 100vh;
  border: 1px solid black;
  margin-bottom: 18px;
`;
