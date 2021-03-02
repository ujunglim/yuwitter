import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { FRIEND } from 'constants.js'
import { Shared } from 'components_view/CommonStyle';
import styled from 'styled-components';
import ContactSlot from 'components_view/ContactSlot';
import { useAuth } from 'components_controll/ProvideAuth';
import { useContacts } from 'components_controll/ProvideContacts';

export default function Contacts() {
  const {userObj} = useAuth();
  const {contacts} = useContacts();

  return (
    <ContactContainer>
      <Link to="/add_contact" style={{marginBottom: "2rem"}} >
        Add Contact
        <FontAwesomeIcon icon={faPlus} />
      </Link>
      <div style={{opacity: 0.5}}>
        {`Contacts of ${userObj && userObj.email}`}
      </div>

      <div>
        {contacts.map(contact => (
          <ContactSlot
            contact={contact}
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

