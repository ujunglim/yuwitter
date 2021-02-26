import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FRIEND } from 'constants.js'
import { Shared } from 'components_view/CommonStyle';
import styled from 'styled-components';
import ContactSlot from 'components_view/ContactSlot';
import { authService, dbService } from 'components_controll/fbase';

export default function Contact() {
  // contact == [] means empty, not null
  const [contact, setContact] = useState([]);

  useEffect(() => {
    dbService
    .collection("users")
    .onSnapshot((snapshot) => {
    // const contactArray = snapshot.docs.map(doc => ({
    // 	id: doc.id,
    // 	...doc.data()
    // 	})
    // );
    // setContact(contactArray);
  });
	}, []);

  return (
    <ContactContainer>
      <Link to="/add_contact" style={{marginBottom: "2rem"}} >
        Add Contact
        <FontAwesomeIcon icon={faPlus} />
      </Link>

      <div>
        {authService.currentUser && authService.currentUser.email}
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

