import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { Shared } from 'components_view/CommonStyle';
import styled from 'styled-components';
import ContactSlot from 'components_view/ContactSlot';
import { useContact } from 'components_controll/ProvideContact';

export default function Contact() {
  const {friend:{list}} = useContact();
  
  return (
    <ContactContainer>
      <Link to="/add_contact" style={{marginBottom: "2rem"}} >
        Add Contact
        <FontAwesomeIcon icon={faPlus} style={{marginLeft: "0.5rem"}} />
      </Link>
      
      {list.length == 0 ? (
        <span>Add friends by searching</span>
      ) : (
        <FriendContainer>
          {list.map(({uid, displayName, photoURL}) => (
            <ContactSlot 
              key={uid}
              id={uid}
              displayName={displayName}
              photoURL={photoURL}
            />
          ))}
        </FriendContainer>
      )
      }
    </ContactContainer>
  );
}

//=========== Styled Components =============
const ContactContainer = styled(Shared.Container)`
  width: 250px; 
  overflow-y: hidden;
	align-items: center;
`;

const FriendContainer = styled(Shared.Container)`
  align-items: center;
`;

