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
    <Input value={text} type="text"
    onChange={onChange} maxLength={20}
    placeholder="Enter Friend's email" />
  );
}

function SubmitBTN({textRef}) {
  const {searchUser} = useAddContact();

  const onSubmitClick = async () => {
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
        <Button variant="contained" color="secondary" onClick={onClick} style={{marginRight: 10}}>{stateText}</Button>
      ) : (
        <span style={{marginRight: 40}}>{stateText}</span>
      )}
    </ContactSlot>
  );
}

function InputFormContainer({textRef}) {
  const onSubmitChat = (e) => {
    e.preventDefault();
  }

  return (
    <InputForm style={{width: "23rem", marginTop: "1rem"}} onSubmit={onSubmitChat}>
      <Text reference={textRef}/>
      <SubmitBTN textRef={textRef}/>
    </InputForm>
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
    <>
		  <Shared.Header><span>Add Friends</span></Shared.Header>

      <ProvideAddContact>
        <AddContactContainer>

          <InputFormContainer textRef={textRef} />
          <SearchResult />
          <Request />

        </AddContactContainer>
      </ProvideAddContact>
    </>
  );
}

//============== Styled Components ===============
const AddContactContainer = styled(Shared.Container)`
	align-items: center;
	margin-top: 3.5rem;
`;

const InputForm = styled(Shared.InputForm)``;

const Input = styled(Shared.InputText)``;

const Arrow = styled(Shared.Arrow)`
  margin-right: 8rem;
`;

const RequestContainer = styled(Shared.Container)`
  align-items: center;
  margin-top: 2rem;
`;


