import { faChevronLeft, faEllipsisV, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
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
              <MyChat>
                <MyChatBox key={id}>
                  <ChatText>{chats}</ChatText>
                </MyChatBox>
              </MyChat>
            ) : (
              <ChatterChat>
                <ChatterPhoto src={photoURL || DEFAULT_PHOTOURL}/>
                <ChatterChatBox key={id}>
                  <ChatText style={{color: "black"}}>{chats}</ChatText>
                </ChatterChatBox>
              </ChatterChat>
            )
          )
        )}
      </ChatContainer>

      <InputContainer>
        <Text reference={textRef}/>
        <SubmitBTN textRef={textRef}/>
      </InputContainer>

    </ChatBoxContainer>
  );
}

//================= Styled Components ====================
const ChatBoxContainer = styled.div`
  background-color: white;
  width: 20rem;
  height: 35rem;
  position: absolute;
  bottom: 2rem;
  right: 3rem;
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  font-size: 1.2rem;
`;

const SettingAction = styled.span`
  cursor: pointer;
`;

const MyChat = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

const ChatterChat = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ChatterPhoto = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 0.3rem;
  border-radius: 15px;
`;

const ChatContainer = styled(Shared.Container)`
  max-width: 100%;
  flex: 9;
	overflow-x: hidden;
  padding: 1rem;
`;

const MyChatBox = styled.div`
  background: #04aaff;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  max-width: 70%;

`;

const ChatterChatBox = styled.div`
  background: lightgrey;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  max-width: 70%;

  /* &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 33%;
    right: 84%;
    
    top: 26px;
    width: 0;
    height: 0;
    border-top: 13px solid transparent;
    border-right: 26px solid red;
    border-bottom: 13px solid transparent; 
  } */

`;

const ChatText = styled.span`
  /* display: block; */
  /* box-sizing: padding-box; */
  /* overflow: hidden; */
  padding: 0.5rem;
`;


const InputContainer = styled.div`
 	display: flex;
  flex: 1;
  align-items: center;
  padding: 0 1rem 0.5rem 1rem;
  /* flex-wrap: wrap; */
  padding-top: 0.5rem;
`;

const Input = styled.input`
  flex-grow: 1;
  min-height: 40px;
  padding: 0px 20px;
  color: black;
  border: 1px solid #04aaff;
  border-radius: 20px;
  font-weight: 500;
  font-size: 12px;
  
`;

const Arrow = styled.input`
	position: absolute;
	right: 0;
	background-color: #04aaff;
	height: 40px;
	width: 40px;
	padding: 10px 0px;
	text-align: center;
	border-radius: 20px;
	color: white;
	cursor: pointer;
  margin-right: 1rem;
`;

