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
        <FontAwesomeIcon icon={faPlus} />
      </Link>

      <ContactScroll>
        {list.map(({email, displayName, photoURL}) => (
          <ContactSlot 
            key={email}
            displayName={displayName}
            photoURL={photoURL}
          />
        ))}
      </ContactScroll>
    </ContactContainer>
  );
}

//=========== Styled Components =============
const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContactScroll = styled(Shared.Container)`
  align-items: center;
`;

