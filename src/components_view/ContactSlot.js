import { dbService } from 'components_controll/fbase';
import { useUser } from 'components_controll/ProvideAuth';
import { useSearchUser } from 'components_controll/ProvideSearchUser';
import { REQUESTING, ACCEPTING, DEFAULT_PHOTOURL } from 'constants.js'
import styled from 'styled-components';

export default function ContactSlot({photoURL, displayName, state}) {
  const {userObj} = useUser();
  const {searchResult} = useSearchUser();

  const onClickAdd = () => {
    console.log("clicked add btn");

    const dbContact = {
      contact: {
        [searchResult.uid]: {
          reference: dbService.doc(`users/${searchResult.email}`),
          state: 0
        }
      }
    }
    dbService.doc(`users/${userObj.email}`).update(dbContact);
  }

  return(
    <ContactSlotContainer>
      <ContactInfo>
        <ContactPhoto src={photoURL || DEFAULT_PHOTOURL}/>
        <span>{displayName}</span>
      </ContactInfo>
      
      {(state === REQUESTING) && <span>Sent</span> }      
      {(state === ACCEPTING) && <button>Accept</button> } 
      {(state === null) && <button onClick={onClickAdd}>Add</button>}     
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