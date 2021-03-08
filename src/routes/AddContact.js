import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shared } from 'components_view/CommonStyle';
import styled from 'styled-components';
import RequestSlot from 'components_view/RequestSlot';
import { useContact } from 'components_controll/ProvideContact';
import { dbService } from 'components_controll/fbase';
import ProvideSearchUser from 'components_controll/ProvideSearchUser';

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
  const [searchUser, setSearchUser] = useState(null);

  console.log(searchUser);

  const onSubmitClick = () => {
    const {current:{text, setText}} = textRef;
    setText("")

    //---- search user -----
    dbService.collection("users").doc(text).get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        setSearchUser(doc)
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });

  }

  return(
    <Arrow type="submit" onClick={onSubmitClick} value="&rarr;" />
  );
}

// function SearchUser({textRef}) {
   // searchUser == null means empty
  //  const [searchUser, setSearchUser] = useState(null);

  //  useEffect(() => {
    // dbService.collection("users").doc(textRef).get()
    // .then((doc) => {
    //   if (doc.exists) {
    //     console.log("Document data:", doc.data());
    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    //   }
    // }).catch(function(error) {
    //   console.log("Error getting document:", error);
    // });
  // }, [searchUser]);




//   return (
//     <div>
//       <h1>result</h1>
//       {/* <img src={searchObj.photoURL} width="30px" />
//       <span>{searchObj.displayName}</span>
//       <button>Add</button> */}
//     </div>
//   );

// }

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
  
  const textRef = useRef();


  return (
    <AddContactContainer>
      <Link to="/contact" style={{marginBottom: "2rem"}}> back to Contact </Link>
      
      <InputContainer>
        <Text reference={textRef} />
        <SubmitBTN textRef={textRef} />
      </InputContainer>
      {/* <SearchUser reference={textRef} /> */}

      {/* {searchUser && <SearchUser searchObj={searchUser}/>} */}

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


