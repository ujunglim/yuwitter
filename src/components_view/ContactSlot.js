import styled from 'styled-components';
import { DEFAULT_PHOTOURL } from 'constants.js';

export default function ContactSlot({id, displayName, photoURL, children}) {
  return(
    <ContactSlotContainer key={id}>
      <ContactInfo>
        <ContactPhoto src={photoURL || DEFAULT_PHOTOURL}/>
        <span>{displayName}</span>
      </ContactInfo>
      
      {children}     
    </ContactSlotContainer>
  );
}

// contact = { 
//   id: 1,
//   displayName: "Stephen",
//   state: REQUESTING
//   photoURL: "https://firebasestorage.googleapis.com/v0/b/yuwitter-d54e2.appspot.com/o/ProfilePhoto%2F02GSNU55pUdtsA17dfyZ6dChi9r1?alt=media&token=31c66015-c05f-46db-9784-af3f45eaeb79"
// }

//================= Styled Components ====================
const ContactSlotContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.8rem;
  width: 100%;
`;

const ContactPhoto = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 1rem;
  border-radius: 20px;
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
`;