import styled from 'styled-components';
import React from "react";
import { Shared } from './CommonStyle';
import verified from '../image/verified.png';

function ShowMore() {
  return(
    <ShowMoreContent>
      <span style={{color:"#1DA1F2", fontSize:"15px"}}>Show more</span>
    </ShowMoreContent>
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
          <LeftContent>
            <SmallText>COVID-19·LIVE</SmallText>
            <Title>COVID-19: News and updates for California</Title>
          </LeftContent>
          <RightContent>
            <ImageMask>
              <img src="https://pbs.twimg.com/semantic_core_img/1338525361693368320/g6ZLOAcn?format=jpg&name=240x240"/>
            </ImageMask>
          </RightContent>
        </Content>

        <Content>
          <LeftContent>
            <SmallText>Pop·Trending</SmallText>
            <Title>Rihanna</Title>
            <MiddleText>Rihanna fans are loving new photos shared by the singer</MiddleText>
            <SmallText>115K Yuweets</SmallText>
          </LeftContent>
          <RightContent>
            <ImageMask>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1DfSxkKXv_IeNZe4PeIzFM46ZMVjCh_FjWQ&usqp=CAU"/>
            </ImageMask>
          </RightContent>
        </Content>

        <Content>
          <LeftContent>
            <SmallText>World news·LIVE</SmallText>
            <Title>Death toll climbs as violence between Israeli forces and Hamas escalates</Title>
            <SmallText>Trending with <A>Palestine</A>, <A>Netanyahu</A></SmallText>
          </LeftContent>
          <RightContent>
            <ImageMask>
              <img src="https://pbs.twimg.com/semantic_core_img/1391670316003254272/QuAohtuT?format=jpg&name=120x120"/>
            </ImageMask>
          </RightContent>
        </Content>
        <ShowMore />
      </ContentBox>

      <ContentBox>
        <ContentHeader>Who to follow</ContentHeader>
        <Content>
          <AccountContent>
            <AccountPhoto src="https://pbs.twimg.com/profile_images/1387421728251408385/gVcCautU_400x400.jpg"/>
            <div>
              <AccountName>
                <Title>BTS_official</Title>
                <img src={verified} width="100%" height="100%" style={{marginLeft:"3px"}} />
              </AccountName>

              <SmallText>@bts_bighit</SmallText>
            </div>
          </AccountContent>
          <FollowBox>
            <FollowBTN>Follow</FollowBTN>
          </FollowBox>
        </Content>
        
        <Content>
          <AccountContent>
            <AccountPhoto src="https://events.recode.net/wp-content/uploads/2016/05/elon-musk-square.jpg?quality=80&strip=info"/>
            <AccountInfo>
              <AccountName>
                <Title>Elon Musk</Title>
                <img src={verified} width="18px" height="18px" style={{marginLeft:"3px"}} />
              </AccountName>

              <SmallText>@elonmusk</SmallText>
            </AccountInfo>
          </AccountContent>
          <FollowBox>
            <FollowBTN>Follow</FollowBTN>
          </FollowBox>
        </Content>

        <Content>
          <AccountContent>
            <AccountPhoto src="https://pbs.twimg.com/profile_images/1262824892535373825/BiXDFDDp_400x400.jpg"/>
            <AccountInfo>
              <AccountName>
                <Title>Node.js</Title>
                <img src={verified} width="18px" height="18px" style={{marginLeft:"3px"}} />
              </AccountName>

              <SmallText>@nodejs</SmallText>
            </AccountInfo>
          </AccountContent>
          <FollowBox>
            <FollowBTN>Follow</FollowBTN>
          </FollowBox>
        </Content>

        <Content>
          <AccountContent>
            <AccountPhoto src="https://pbs.twimg.com/profile_images/1204796287696064512/6TcDDSFu_400x400.jpg"/>
            <AccountInfo>
              <AccountName>
                <Title>TikTok</Title>
                <img src={verified} width="18px" height="18px" style={{marginLeft:"3px"}} />
              </AccountName>

              <SmallText>@tiktok_us</SmallText>
            </AccountInfo>
          </AccountContent>
          <FollowBox>
            <FollowBTN>Follow</FollowBTN>
          </FollowBox>
        </Content>

        <Content>
          <AccountContent>
            <AccountPhoto src="https://pbs.twimg.com/profile_images/1363208451153821701/1VN0f5aI_400x400.png"/>
            <AccountInfo>
              <AccountName>
                <Title>Nintendo</Title>
                <img src={verified} width="18px" height="18px" style={{marginLeft:"3px"}} />
              </AccountName>

              <SmallText>@Nintendo</SmallText>
            </AccountInfo>
          </AccountContent>
          <FollowBox>
            <FollowBTN>Follow</FollowBTN>
          </FollowBox>
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
  background: #F7F9FA;
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
  /* background: pink; */

  &:hover {
    background: #EFF1F2;
  }
`;

const ShowMoreContent = styled(Content)`
  border: none;

  &:hover {
    border-radius: 0 0 1rem 1rem;
  }
`;

const LeftContent = styled.div``;

const SmallText = styled.p`
  font-size: 13px;
  color: rgb(91, 112, 131);
  font-weight: 400;
`;

const A = styled.span`
  color: #1DA1F2;

  &:hover {
    text-decoration: 1px #1DA1F2 underline;
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

const RightContent = styled.div`
  display: flex;
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

const AccountContent = styled(LeftContent)`
  display: flex;
  flex: 1;
`;

const FollowBox = styled(RightContent)`
  align-items: center;
`;

const FollowBTN = styled(Shared.BTNwithText)`
  color: #1DA1F2;
  background-color: white;
  border: 1px solid #1DA1F2;

  &:hover {
    background: #E8F5FE;
  }
`;

const AccountPhoto = styled(Shared.ProfilePhoto)``;

const AccountInfo = styled.div`
  flex: 1;
`;

const AccountName = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;