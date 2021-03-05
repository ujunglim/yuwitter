import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shared } from 'components_view/CommonStyle';
import styled from 'styled-components';
import RequestSlot from 'components_view/RequestSlot';
import SearchResult from 'components_view/SearchResult';
import { useContact } from 'components_controll/ProvideContact';

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

  const onSubmitClick = () => {
    const {current:{text, setText}} = textRef;

    
    console.log(text);
    setText("")
  }

  return(
    <Arrow type="submit" onClick={onSubmitClick} value="&rarr;" />
  );
}

function Request() {
  const {request:{list}} = useContact();

  return (
    <RequestContainer>
      {list.map(({email, displayName, photoURL, state}) => (
        <RequestSlot
          key={email}
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
  // searchResult == null means empty
  const [searchResult, setSearchResult] = useState(null);
  const textRef = useRef();


  return (
    <AddContactContainer>
      <Link to="/contact" style={{marginBottom: "2rem"}}> back to Contact </Link>
      
      <InputContainer>
        <Text reference={textRef} />
        <SubmitBTN textRef={textRef} />
      </InputContainer>

      {searchResult && <SearchResult searchObj={searchResult}/>}

      <Request />

    </AddContactContainer>

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


