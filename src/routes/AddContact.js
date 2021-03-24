import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shared } from 'components_view/CommonStyle';
import styled from 'styled-components';
import ProvideAddContact, { useAddContact } from 'components_controll/ProvideAddContact';
import ContactSlot from 'components_view/ContactSlot';
import { SEARCH } from 'constants.js';
import Button from '@material-ui/core/Button';

// ================ Children Component ==================
function Text({reference}) {
  const [text, setText] = useState("");
  reference.current = {text, setText};

  const onChange = (event) => {
    const {target: {value}} = event;
    setText(value);
  }

  return (
    <Input value={text} onChange={onChange} type="text" placeholder="Enter Friend's email" />
  );
}

function SubmitBTN({textRef}) {
  const {searchUser} = useAddContact();

  const onSubmitClick = () => {
    const {current:{text, setText}} = textRef;

    if(text === "" || text == null) {
			return window.alert("Please input email.");
    }
    setText("")
    searchUser(text);
  }

  return(
    <Arrow type="submit" onClick={onSubmitClick} value="&rarr;" />
  );
}

// inheritance of ContactSlot
function AddContactSlot({stateText, onClick, ...props}) {

  return(
    <ContactSlot {...props} >
      {onClick ? (
        <Button variant="contained" color="secondary" onClick={onClick}>{stateText}</Button>
      ) : (
        <span>{stateText}</span>
      )}
    </ContactSlot>
  );
}

function SearchResult() {
  const {searchResult} = useAddContact();
  
  return (
    <>
      {(searchResult === SEARCH.NO_RESULT) && (<span> &#128546; There's no matched email user</span>)}
      {(searchResult === SEARCH.SEARCHING) && (<span>searching...</span>)}
      {(typeof searchResult == 'object') && (<AddContactSlot {...searchResult}/>)}
    </>
  );
}

function Request() {
  const {requestList} = useAddContact();

  return (
    <RequestContainer>
      {requestList.map(({uid, ...rest}) => (
        <AddContactSlot key={uid} {...rest} />
      ))}
    </RequestContainer>
  );
}

// ==================== Parent Component ====================
export default function AddContact() {
  
  const textRef = useRef();

  return (
    <ProvideAddContact>
      <AddContactContainer>
        <Link to="/contact" style={{marginBottom: "2rem"}}> back to Contact </Link>
        
        <InputContainer>
          <Text reference={textRef} />
          <SubmitBTN textRef={textRef} />
        </InputContainer>

        <SearchResult />

        <Request />

      </AddContactContainer>
    </ProvideAddContact>
  );
}

//============== Styled Components ===============
const AddContactContainer= styled.div`
	display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
`;

const RequestContainer = styled(Shared.Container)`
  align-items: center;
  margin-top: 2rem;
`;

const InputContainer = styled.div`
 	display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  margin-bottom: 20px;
  width: 100%;
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
