import styled from 'styled-components';
import { DEFAULT_PHOTOURL } from 'constants.js';
import { useChat } from 'components_controll/ProvideChat';
import { Shared } from './CommonStyle';
import { useContact } from 'components_controll/ProvideContact';

export default function ContactSlot({id, displayName, photoURL, children}) {
  const {setIsChatting, setChatterObj} = useChat();
  const {friend: {list}} = useContact();
  
  const friendUID = [];
  list.map(friend => friendUID.push(friend.uid));

  const onClick = () => {
    if(friendUID.includes(id)) {
      setIsChatting(true);
      const chatterObj = {id, displayName, photoURL};
      setChatterObj(chatterObj);
    }
  }
  
  return(
    <ContactSlotContainer key={id} onClick={onClick}>
      <ContactInfo>
        <ContactImgMask>
          <ContactImg src={photoURL || DEFAULT_PHOTOURL} />
        </ContactImgMask>

        <span>{displayName}</span>
      </ContactInfo>
      
      {children}     
    </ContactSlotContainer>
  );
}

//================= Styled Components ====================
const ContactSlotContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* margin-top: 0.8rem; */
  width: 25rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 200ms ease-in-out;

  &:hover {
    background: #EBEEF0;
  }
`;

const ContactImgMask = styled(Shared.ImageMask)`
  width: 3rem;
  height: 3rem;
`;

const ContactImg = styled(Shared.ImgInMask)``;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
`;