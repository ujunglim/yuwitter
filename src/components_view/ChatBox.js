import { faChevronLeft, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useChat } from 'components_controll/ProvideChat';
import { DEFAULT_PHOTOURL } from 'constants.js';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { Shared } from './CommonStyle';

// ====================== Child Component ============================
function Text({reference}) {
  const [text, setText] = useState("");
  reference.current = {text, setText};

  const onChange = (e) => {
    const {target:{value}} = e;
    setText(value);
  }

  return(
    <Input 
      value={text}
      type="text"
      autoFocus
      placeholder="Write Message"
      onChange={onChange}
    />
  );
}

function SubmitBTN({textRef}) {
  const {pushChat} = useChat();

  const onSubmitClick = async () => {
		const {current: {text, setText}} = textRef;

    pushChat(text);
    setText("");
  }

  return(
    <Arrow type="submit" value="&rarr;" onClick={onSubmitClick} />
  );
}

function InputFormContainer({textRef}) {
  const onSubmitChat = (e) => {
    e.preventDefault();
  }

  return (
    <InputForm onSubmit={onSubmitChat}>
      <Text reference={textRef}/>
      <SubmitBTN textRef={textRef}/>
    </InputForm>
  );
}

// ====================== Parend Component ============================
export default function ChatBox() {
  const textRef = useRef();
  const {chatterObj: {id, photoURL, displayName}, setIsChatting, localChats} = useChat();
  let chatArray = [];

  if(localChats && localChats[id]) {
    chatArray = localChats[id];
  }

  const onCloseClick = () => {
    setIsChatting();
  }

  return(
    <ChatBoxContainer>
      <ChatHeader>
        <CloseAction onClick={onCloseClick}>
          <FontAwesomeIcon icon={faChevronLeft} color={"#04aaff"} size="2x" />
        </CloseAction>
        <ChatterName>{displayName}</ChatterName>
        <SettingAction>
          <FontAwesomeIcon icon={faEllipsisV} color={"lightGrey"} size="lg"/>
        </SettingAction>
      </ChatHeader>

      <ChatContainer>
        {chatArray.length !== 0 && chatArray.map(({chats, state}, id) => 
          (
            state === 0 ? (
              <MyChat key={id}>
                <MyChatBox>
                  <ChatText>{chats}</ChatText>
                </MyChatBox>
              </MyChat>
            ) : (
              <ChatterChat key={id}>
                <ChatterPhoto src={photoURL || DEFAULT_PHOTOURL}/>
                <ChatterChatBox>
                  <ChatText style={{color: "black"}}>{chats}</ChatText>
                </ChatterChatBox>
              </ChatterChat>
            )
          )
        )}
      </ChatContainer>

      <InputFormContainer textRef={textRef} />

    </ChatBoxContainer>
  );
}

//================= Styled Components ====================
const ChatBoxContainer = styled.div`
  background-color: white;
  width: 21rem;
  height: 36rem;
  position: fixed;
  bottom: 4rem;
  right: 8rem;
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.5);
`;

const ChatHeader = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  border-radius: 1rem 1rem 0 0;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
`;

const CloseAction = styled.span`
  cursor: pointer;
`;

const ChatterName = styled.span`
  color: black; 
  font-weight: bold;
  font-size: 1rem;
`;

const SettingAction = styled.span`
  cursor: pointer;
`;

const MyChat = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  position: relative;
`;

const ChatterChat = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  
  position: relative;
`;

const ChatterPhoto = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 0.8rem;
  border-radius: 15px;
`;

const ChatContainer = styled(Shared.Container)`
  max-width: 100%;
  flex: 9;
	overflow-x: hidden;
  padding: 1rem 1.5rem 1rem 1rem;
`;

const MyChatBox = styled.div`
  background: #04aaff;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 70%;

  &:before {
    content: "";
    position: absolute;
    top: 0.5rem;
    left: 100%;
    border-top: 3.5px solid transparent;
    border-left: 7px solid #04aaff;
    border-bottom: 3.5px solid transparent;
  } 
`;


const ChatterChatBox = styled.div`
  background: lightgrey;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  max-width: 70%;

  &:before {
    content: "";
    position: absolute;
    top: 0.5rem;
    left: 2.3rem;
    border-top: 3.5px solid transparent;
    border-right: 7px solid lightgrey;
    border-bottom: 3.5px solid transparent;
  } 
`;

const ChatText = styled.span`
  /* display: block; */
  /* box-sizing: padding-box; */
  /* overflow: hidden; */
  padding: 0.5rem;
`;


const InputForm = styled(Shared.InputForm)``;

const Input = styled(Shared.InputText)``;

const Arrow = styled(Shared.Arrow)`
  margin-right: 1rem;
`;

