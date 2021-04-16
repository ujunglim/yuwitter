import { useChat } from 'components_controll/ProvideChat';
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

export default function ChatBox() {
  const textRef = useRef();

  return(
    <ChatBoxContainer>
      <ChatHeader />
      <HistoryContainer>

      </HistoryContainer>

      <InputContainer>
        <Text reference={textRef}/>
        <SubmitBTN textRef={textRef}/>
      </InputContainer>

    </ChatBoxContainer>
  );
}

//================= Styled Components ====================
const ChatBoxContainer = styled.div`
  background-color: beige;
  width: 20rem;
  height: 35rem;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ChatHeader = styled.div`
  width: 100%;
  flex: 1;
  border-radius: 1rem 1rem 0 0;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);

`;

const HistoryContainer = styled(Shared.Container)`
  /* background-color: coral; */
  max-width: 100%;
  flex: 9;
`;

const InputContainer = styled.div`
 	display: flex;
  flex: 1;
  align-items: center;
  padding: 0 1rem 0 1rem;
  /* flex-wrap: wrap; */
`;

const Input = styled.input`
  flex-grow: 1;
  height: 40px;
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