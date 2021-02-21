import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shared } from 'components/CommonStyle';
import styled from 'styled-components';
import RequestSlot from 'components/RequestSlot';
import SearchResult from 'components/SearchResult';
import { REQUESTING, ACCEPTING, FRIEND } from 'constants.js'
import { dbService } from 'fbase';

const AddContact = () => {
  // friendRequests == [] means empty, not null
  const [friendRequests, setFriendRequests] = useState([]);
  // friendRequests == null means empty
  const [searchResult, setSearchResult] = useState(null);


  return (
    <Form>
      <Link to="/friends" style={{marginBottom: "2rem"}}>
        back to Contact
      </Link>
      <InputContainer>
        <Input 
          type="text" 
          placeholder="Enter Friend's email" 
        />
        <Arrow type="submit" value="&rarr;" />
      </InputContainer>
      {searchResult && <SearchResult searchObj={searchResult}/>}

      <AddContactContainer>
        <div style={{marginTop:"2rem"}}>
          {friendRequests.map(request => (
            <RequestSlot
              requestObj={request}
              key={request.id}
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