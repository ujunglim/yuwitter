import { DEFAULT_PHOTOURL } from 'constants.js';
import styled from 'styled-components';


export default function ContactSlot ({photoURL, displayName}) {
  return(
    <ContactSlotContainer>
      <ContactPhoto src={photoURL || DEFAULT_PHOTOURL}/>
      <span>{displayName}</span>
    </ContactSlotContainer>
  );
}

// contact = { 
//   id: 1,
//   displayName: "Stephen",
//   photoURL: "https://firebasestorage.googleapis.com/v0/b/yuwitter-d54e2.appspot.com/o/ProfilePhoto%2F02GSNU55pUdtsA17dfyZ6dChi9r1?alt=media&token=31c66015-c05f-46db-9784-af3f45eaeb79"
// }

//================= Styled Components ====================
const ContactSlotContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0.8rem;
  width: 100%;
`;

const ContactPhoto = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 1rem;
  border-radius: 20px;
`;