import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shared } from 'components_view/CommonStyle';
import styled from 'styled-components';
import { useContact } from 'components_controll/ProvideContact';
import ProvideAddContact, { useAddContact } from 'components_controll/ProvideAddContact';
import ContactSlot from 'components_view/ContactSlot';
import { REQUESTING, ACCEPTING } from 'constants.js';

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
function AddContactSlot({state, ...props}) {
  const {sendReuqest} = useAddContact();

  return(
    <ContactSlot {...props} >
      {(state === REQUESTING) && <span>Sent</span> }      
      {(state === ACCEPTING) && <button>Accept</button> } 
      {(state === null) && <button onClick={sendReuqest}>Add</button>}     
    </ContactSlot>
  );
}

function SearchResult() {
  const {searchResult} = useAddContact();
  
  return (
    <>
      {searchResult && (
        searchResult === -1 ? (
          <h3>There's no matched email user</h3>
        ) : (
          <AddContactSlot 
            displayName={searchResult.displayName}
            photoURL={searchResult.photoURL}
            state={searchResult.state}
          />
        )
      )} 
    </>
  );
}

function Request() {
  const {request:{list}} = useContact();

  return (
    <RequestContainer>
      {list.map(({id, displayName, photoURL, state}) => (
        <AddContactSlot
          key={id}
          displayName={displayName}
          photoURL={photoURL}
          state={state}
        />
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
