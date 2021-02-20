import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FRIEND } from 'constants.js'
import { Shared } from 'components/CommonStyle';
import styled from 'styled-components';


const ContactSlot = ({contactObj}) => {
  return(
    <div>
      <img src={contactObj.photoURL} width="30px" heigh="30px"/>
      <span>{contactObj.displayName}</span>
    </div>
  );
}

const Contact = () => {
  const [contact, setContact] = useState([
    { 
      id: 1,
      displayName: "Stephen",
      photoURL: "https://firebasestorage.googleapis.com/v0/b/yuwitter-d54e2.appspot.com/o/ProfilePhoto%2F02GSNU55pUdtsA17dfyZ6dChi9r1?alt=media&token=31c66015-c05f-46db-9784-af3f45eaeb79"
    },
    {
      id: 2,
      displayName: "Gouge",
      photoURL: "https://firebasestorage.googleapis.com/v0/b/yuwitter-d54e2.appspot.com/o/ProfilePhoto%2FFnpDdNB37FbWtIXp00I3G272LYS2?alt=media&token=fb19138c-a93a-4283-b0b1-67981c757d66"
    },
    {
      id: 3,
      displayName: "Wangli",
      photoURL: "https://firebasestorage.googleapis.com/v0/b/yuwitter-d54e2.appspot.com/o/ProfilePhoto%2FYREXHrKcRZObAQkwhbsK0i3qBWC2?alt=media&token=ff1dda1f-739c-45cf-837b-7dcc392f73bd"
    }
  ]);

  return (
    <ContactContainer>
      <Link to="/add_contact" style={{marginBottom: "2rem"}} >
        Add Contact
        <FontAwesomeIcon icon={faPlus} />
      </Link>

      <div>
        {contact.map(contact => (
          <ContactSlot
            contactObj={contact}
            key={contact.id} 
          />)  
        )}
        
      </div>
    </ContactContainer>
  );
}

//=========== Styled Components =============
const ContactContainer = styled(Shared.Container)`
  align-items: center;
`;

export default Contact;