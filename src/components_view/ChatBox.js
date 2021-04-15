import styled from 'styled-components';

export default function ChatBox() {
  return(
    <ChatBoxContainer></ChatBoxContainer>
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
  /* display: none; */
`;