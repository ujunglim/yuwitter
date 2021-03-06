import styled from 'styled-components';
import React, { useState } from "react";
import { Shared } from './CommonStyle';
import verified from '../image/verified.png';
import { Search } from '@material-ui/icons';

function SearchHeaderContainer() {
  const [searchText, setSearchText] = useState("");

  const onSubmitSearch = (event) => {
    event.preventDefault();
    window.open(`https://www.google.com/search?q=${searchText}`);
    setSearchText("");
  }

  const onChangeSearch = (event) => {
    setSearchText(event.target.value);
  }

  return (
    <SearchHeader>
      <SearchHeaderForm  onSubmit={onSubmitSearch}>
        <Search />
        <input 
          placeholder="Search Google"
          value={searchText}
          onChange={onChangeSearch}
          required
          style={{marginLeft: "1rem"}}
        />
      </SearchHeaderForm>
    </SearchHeader>
  );
}

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

      <SearchHeaderContainer />

      <ContentBox>
        <ContentHeader>What's Happening</ContentHeader>
        <Content>
          <div>
            <SmallText>COVID-19 · LIVE</SmallText>
            <Title>COVID-19: News and updates for California</Title>
          </div>

          <div>
            <NewsMask>
              <img src="https://pbs.twimg.com/semantic_core_img/1338525361693368320/g6ZLOAcn?format=jpg&name=240x240"/>
            </NewsMask>
          </div>
        </Content>

        <Content>
          <div>
            <SmallText>Pop · Trending</SmallText>
            <Title>Rihanna</Title>
            <MiddleText>Rihanna fans are loving new photos shared by the singer</MiddleText>
            <SmallText>115K Yuweets</SmallText>
          </div>
          <div>
            <NewsMask>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1DfSxkKXv_IeNZe4PeIzFM46ZMVjCh_FjWQ&usqp=CAU"/>
            </NewsMask>
          </div>
        </Content>

        <Content>
          <div>
            <SmallText>World news · LIVE</SmallText>
            <Title>Death toll climbs as violence between Israeli forces and Hamas escalates</Title>
            <SmallText>Trending with <A>Palestine</A>, <A>Netanyahu</A></SmallText>
          </div>
          <div>
            <NewsMask>
              <img src="https://pbs.twimg.com/semantic_core_img/1391670316003254272/QuAohtuT?format=jpg&name=120x120"/>
            </NewsMask>
          </div>
        </Content>
        <ShowMore />
      </ContentBox>

      <ContentBox>
        <ContentHeader>Who to follow</ContentHeader>
        <Content>
          <AccountContent>
            <WhoMask>
              <img src="https://pbs.twimg.com/profile_images/1387421728251408385/gVcCautU_400x400.jpg"/>
            </WhoMask>
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
            <WhoMask>
              <img src="https://events.recode.net/wp-content/uploads/2016/05/elon-musk-square.jpg?quality=80&strip=info"/>
            </WhoMask>
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
            <WhoMask>
              <img src="https://pbs.twimg.com/profile_images/1262824892535373825/BiXDFDDp_400x400.jpg"/>
            </WhoMask>
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
  display: flex;
  align-items: center;  
  width: 25rem;
  padding: 1.5rem;
  font-weight: 300;
  font-size: medium;
`;

const SearchHeaderForm = styled(Shared.InputForm)`
  border-radius: 20px;
  background: #EBEEF0; 
  color: #5B7083;
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

const NewsMask = styled(Shared.ImageMask)`
  border-radius: 15%;
  background: lightgrey;
  margin-right: 0;
`;

const WhoMask = styled(Shared.ImageMask)`
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
`;

//====================
const AccountContent = styled.div`
  display: flex;
  flex: 1;
`;

const FollowBox = styled.div`
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

const AccountInfo = styled.div`
  flex: 1;
`;

const AccountName = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;