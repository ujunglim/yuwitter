import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { REQUESTING, ACCEPTING, FRIEND } from 'constants.js'
import { Shared } from 'components/CommonStyle';
import styled from 'styled-components';

const RequestSlot = ({requestObj}) => {
  return(
    <div>
      <img src={requestObj.photoURL} width="30px" heigh="30px"/>
      <span>{requestObj.displayName}</span>
      {(requestObj.state === REQUESTING) && <span>Sent</span> }      
      {(requestObj.state === ACCEPTING) && <button>Accept</button> }      
      {(requestObj.state === FRIEND) && <span>Added</span> }      
    </div>
  );
}

const SearchResult = ({searchObj}) => {
  return (
    <div>
      <img src={searchObj.photoURL} width="30px" />
      <span>{searchObj.displayName}</span>
      <button>Add</button>
    </div>
  );
}

const AddContact = () => {
  // friendRequests == [] means empty, not null
  const [friendRequests, setFriendRequests] = useState([
    { 
      id: 1,
      displayName: "Stephen",
      state: REQUESTING,
      photoURL: "https://firebasestorage.googleapis.com/v0/b/yuwitter-d54e2.appspot.com/o/ProfilePhoto%2F02GSNU55pUdtsA17dfyZ6dChi9r1?alt=media&token=31c66015-c05f-46db-9784-af3f45eaeb79"
    },
    {
      id: 2,
      displayName: "Gouge",
      state: ACCEPTING,
      photoURL: "https://firebasestorage.googleapis.com/v0/b/yuwitter-d54e2.appspot.com/o/ProfilePhoto%2FFnpDdNB37FbWtIXp00I3G272LYS2?alt=media&token=fb19138c-a93a-4283-b0b1-67981c757d66"
    },
    {
      id: 3,
      displayName: "Wangli",
      state: FRIEND,
      photoURL: "https://firebasestorage.googleapis.com/v0/b/yuwitter-d54e2.appspot.com/o/ProfilePhoto%2FYREXHrKcRZObAQkwhbsK0i3qBWC2?alt=media&token=ff1dda1f-739c-45cf-837b-7dcc392f73bd"
    }
  ]);
  const [searchResult, setSearchResult] = useState({
    displayName: "Aliya",
    email: "aliya@gmail.com",
    photoURL: "https://firebasestorage.googleapis.com/v0/b/yuwitter-d54e2.appspot.com/o/ProfilePhoto%2FfuAvmhBexfg4LMQSGh4ZNsmTNIc2?alt=media&token=f44e24e5-19db-493f-ba59-42485d95f405"
  })


  const onSubmit = (event) => {
    
  }

  const onChange = (event) => {
    console.log(event.target.value);
  }


  return (
    <Form sumbit={onsubmit}>
      <Link to="/friends" style={{marginBottom: "2rem"}}>
        back to Contact
      </Link>
      <AddContactContainer>
        <InputContainer>
          <Input 
            type="text" 
            placeholder="Enter Friend's email" />
          <Arrow type="submit" value="&rarr;" />
        </InputContainer>

        {searchResult && <SearchResult searchObj={searchResult}/>}
      
        <div style={{marginTop:"2rem"}}>
          {friendRequests.map(request => (
            <RequestSlot
              requestObj={request}
              key={request.id}
              onChange={onChange}
            />
          ))}
        </div>
        
      </AddContactContainer>
    </Form>

  );
}

//============== Styled Components ===============

const Form= styled.form`
	display: flex;
  flex-direction: column;
  align-items: center;
	width: 100%;
`;

const AddContactContainer = styled(Shared.Container)`
  align-items: center;

`;

const InputContainer = styled.div`
 	display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  margin-bottom: 20px;
  width: 80%;
`;

const Input = styled.input`
  flex-grow: 1;
  height: 40px;
  padding: 0px 20px;
  color: white;
  border: 1px solid #04aaff;
  border-radius: 20px;
  font-weight: 500;
  font-size: 12px;
`;

const Arrow = styled.input`
	position: absolute;
	right: 0;
	background-color: #04aaff;
	height: 40px;
	width: 40px;
	padding: 10px 0px;
	text-align: center;
	border-radius: 20px;
	color: white;
	cursor: pointer;
`;


export default AddContact;