import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { Shared } from 'components_view/CommonStyle';
import styled from 'styled-components';
import ContactSlot from 'components_view/ContactSlot';
import { useContact } from 'components_controll/ProvideContact';
import { FRIEND } from 'constants.js';

export default function Contact() {
  const {friend:{list}} = useContact();

  return (
    <ContactContainer>
      <Link to="/add_contact" style={{marginBottom: "2rem"}} >
        Add Contact
        <FontAwesomeIcon icon={faPlus} />
      </Link>
      
      {list.length == 0 ? (
          <h1>You don't have friend yet.</h1>
        ) : (
          <ContactScroll>
            {list.map(({id, displayName, photoURL}) => (
              <ContactSlot 
                key={id}
                displayName={displayName}
                photoURL={photoURL}
                state={FRIEND}
              />
            ))}
          </ContactScroll>
        )
      }
    </ContactContainer>
  );
}

//=========== Styled Components =============
const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
`;

const ContactScroll = styled(Shared.Container)`
  align-items: center;
`;

