import styled from 'styled-components';
import React from "react";
import { Shared } from './CommonStyle';

function ShowMore() {
  return(
    <Content>
      <span style={{color:"#04AAFF", fontSize:"15px"}}>Show more</span>
    </Content>
  );
}

export default function RightAside() {
  return (
    <RightAsideContainer>
      <SearchHeader>
        <Shared.InputForm>
          <Shared.InputText 
            placeholder="Search Google"
          />
        </Shared.InputForm>
      </SearchHeader>

      <ContentBox>
        <ContentHeader>What's Happening</ContentHeader>
        <Content>
          <leftContent>
            <SmallText>COVID-19·LIVE</SmallText>
            <Title>COVID-19: News and updates for California</Title>
          </leftContent>
          <rightContent>
            <ImageMask>
              <img src="https://pbs.twimg.com/semantic_core_img/1338525361693368320/g6ZLOAcn?format=jpg&name=240x240"/>
            </ImageMask>
          </rightContent>
        </Content>

        <Content>
          <leftContent>
            <SmallText>Pop·Trending</SmallText>
            <Title>Rihanna</Title>
            <MiddleText>Rihanna fans are loving new photos shared by the singer</MiddleText>
            <SmallText>115K Yuweets</SmallText>
          </leftContent>
          <rightContent>
            <ImageMask>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1DfSxkKXv_IeNZe4PeIzFM46ZMVjCh_FjWQ&usqp=CAU"/>
            </ImageMask>
          </rightContent>
        </Content>

        <Content>
          <leftContent>
            <SmallText>World news·LIVE</SmallText>
            <Title>Death toll climbs as violence between Israeli forces and Hamas escalates</Title>
            <SmallText>Trending with <A>Palestine</A>, <A>Netanyahu</A></SmallText>
          </leftContent>
          <rightContent>
            <ImageMask>
              <img src="https://pbs.twimg.com/semantic_core_img/1391670316003254272/QuAohtuT?format=jpg&name=120x120"/>
            </ImageMask>
          </rightContent>
        </Content>
        <ShowMore />
      </ContentBox>

      <ContentBox>
        <ContentHeader>Who to follow</ContentHeader>
        <Content>

        </Content>
        <ShowMore />
      </ContentBox>


    </RightAsideContainer>
  );
}


//=================== Styled Components ==================
const RightAsideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25rem;
  padding-top: 57px;
`;

const SearchHeader = styled(Shared.Header)`
  width: 25rem;
  padding: 0;
`;

const ContentBox = styled.div`
  background: lightblue;
  width: 22rem;
  margin: 1rem;
  border-radius: 1rem;
`;

const ContentHeader = styled.p`
  padding: 1rem;
  border-bottom: 1px solid #EBEEF0;
  font-size: 20px;
  font-weight: 800;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
  cursor: pointer;
  border-bottom: 1px solid #EBEEF0;
  transition: all 200ms ease-in-out;

  &:hover {
    background: #EFF1F2;
  }
`;

const leftContent = styled.div``;

const SmallText = styled.p`
  font-size: 13px;
  color: rgb(91, 112, 131);
  font-weight: 400;
`;

const A = styled.span`
  color: #04aaff;

  &:hover {
    text-decoration: 1px #04aaff underline;
  }
`;

const MiddleText = styled.p`
  font-size: 15px;
  color: rgb(91, 112, 131);
  font-weight: 400;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 15px;
  margin: 0.2rem 0;
`;

const rightContent = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ImageMask = styled.div`
  display: flex;
  justify-content: center;
  width: 68px;
  height: 68px;
  overflow: hidden;
  border-radius: 15%;
`;

//====================

