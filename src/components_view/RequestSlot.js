import { REQUESTING, ACCEPTING, DEFAULT_PHOTOURL } from 'constants.js'
import styled from 'styled-components';

export default function RequestSlot({photoURL, displayName, state}) {
  return(
    <RequestSlotContainer>
      <ContactInfo>
        <ContactPhoto src={photoURL || DEFAULT_PHOTOURL}/>
        <span>{displayName}</span>
      </ContactInfo>
      {(state === REQUESTING) && <span>Sent</span> }      
      {(state === ACCEPTING) && <button>Accept</button> }      
    </RequestSlotContainer>
  );
}

 // requestObj = { 
    //   id: 1,
    //   displayName: "Stephen",
    //   state: REQUESTING,
    //   photoURL: "https://firebasestorage.googleapis.com/v0/b/yuwitter-d54e2.appspot.com/o/ProfilePhoto%2F02GSNU55pUdtsA17dfyZ6dChi9r1?alt=media&token=31c66015-c05f-46db-9784-af3f45eaeb79"
    // }

//================= Styled Components ====================
const RequestSlotContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.8rem;
  width: 80%;
`;

const ContactPhoto = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 0.5rem;
  border-radius: 20px;
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
`;