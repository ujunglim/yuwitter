import React from 'react';
import { Shared } from 'components_view/CommonStyle';
import styled from 'styled-components';
import ContactSlot from 'components_view/ContactSlot';
import { useContact } from 'components_controll/ProvideContact';

export default function Contact() {
  const {friend:{list}} = useContact(); // get friend list from ProvideContact
  
  return (
    <ContactContainer>
      <Shared.Header><span>Messages</span></Shared.Header>

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
	align-items: center;
`;

const FriendContainer = styled.div`
  align-items: center;
  justify-content: center;
	margin-top: 2rem;
`;

