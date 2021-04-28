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
    <>
			<Shared.Header><span>Messages</span></Shared.Header>
      <ContactContainer>
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
    </>
  );
}

//=========== Styled Components =============
const ContactContainer = styled(Shared.Container)`
	align-items: center;
	margin-top: 3.5rem;
`;

const FriendContainer = styled.div`
  align-items: center;
  justify-content: center;
	margin-top: 2rem;
`;

