import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shared } from 'components_view/CommonStyle';
import styled from 'styled-components';
import RequestSlot from 'components_view/RequestSlot';
import SearchResult from 'components_view/SearchResult';
import { useRequests } from 'components_controll/ProvideRequests';

// ================ Children Component ==================
function Requests() {
  const {requests:{list}} = useRequests();

  return (
    <div style={{marginTop:"2rem"}}>
      {list.map(({email, displayName, photoURL, state}) => (
        <RequestSlot
          key={email}
          displayName={displayName}
          photoURL={photoURL}
          state={state}
        />
      ))}
    </div>
  );
}
// ==================== Parent Component ====================
export default function AddContacts() {
  // searchResult == null means empty
  const [searchResult, setSearchResult] = useState(null);


  return (
    <Form>
      <Link to="/contacts" style={{marginBottom: "2rem"}}> back to Contacts </Link>
      <InputContainer>
        <Input type="text" placeholder="Enter Friend's email" />
        <Arrow type="submit" value="&rarr;" />
      </InputContainer>
      {searchResult && <SearchResult searchObj={searchResult}/>}

      <RequestsContainer>
        <Requests />
      </RequestsContainer>
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

const RequestsContainer = styled(Shared.Container)`
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


