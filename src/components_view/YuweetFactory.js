import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';
import { useYuweets } from 'components_controll/ProvideYuweets';
import { Shared } from './CommonStyle';
import { useUser } from 'components_controll/ProvideAuth';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { DEFAULT_PHOTOURL } from 'constants.js';
import { DateRangeOutlined, GifOutlined, ImageOutlined, PollOutlined, SentimentSatisfiedAlt } from '@material-ui/icons';

// ====================== Child Component ============================
function InputContainerDIV({textRef, attachmentRef}) {
  // ------- text ---------
  const [text, setText] = useState("");
  textRef.current = { text, setText };

  const onChange = (event) => {
    const {target:{value}} = event;
    setText(value);
  }

  // --------- attachment ---------
  const [attachment, setAttachment] = useState("");
  attachmentRef.current = { attachment, setAttachment };

  const onChangeFile = (event) => {
    const {target:{files}} = event;
    const theFile = files[0];

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {currentTarget:{result}} = finishedEvent;
      setAttachment(result);
      // onChange occurs when value of element has been changed
      document.getElementById("attach_file").value = null;
    }
    reader.readAsDataURL(theFile);
  }

  const onClearAttachment = () => {
    // state
    setAttachment("");
    // dom
    document.getElementById("attach_file").value = null;
  }

  // --------- submitBTN ---------
  const {addYuweet} = useYuweets();

  const onSubmitClick = async () => {
    const {current: {text, setText}} = textRef;
    const {current: {attachment, setAttachment}} = attachmentRef;

    addYuweet(text, attachment);
    setText("");
    setAttachment("");
  }

  return (
    <Shared.Container>
      {/* ================= text ==================== */}
      <Shared.InputTextArea
        value={text} 
        onChange={onChange} 
        type="text" 
        placeholder="What's on your mind?" 
        maxLength={100} 
      />

      {/* ================ attachment ================= */}
      {attachment && (
        <AttachmentContainer>
          <Img src={attachment}/>
          <Clear onClick={onClearAttachment}>
            <FontAwesomeIcon icon={faTimesCircle} size="2x" />
          </Clear>
        </AttachmentContainer>
      )}

      <InputContainer_bottom>
        <OtherAttachments>
          <input 
            id="attach_file" type="file" accept="image/*" 
            onChange={onChangeFile} style={{display:"none"}}
          />

          <HoverDIV>
            <label htmlFor="attach_file" style={{cursor: "pointer", height: "24px"}}>
              <ImageOutlined />
            </label>
          </HoverDIV>
          
          <HoverDIV>
            <GifOutlined />
          </HoverDIV>

          <HoverDIV>
            <PollOutlined />
          </HoverDIV>

          <HoverDIV>
            <SentimentSatisfiedAlt />
          </HoverDIV>

          <HoverDIV>
            <DateRangeOutlined />
          </HoverDIV>

        </OtherAttachments>

      {/* ================ submitBTN ================== */}
        <YuweetBTN onClick={onSubmitClick}>Yuweet</YuweetBTN>
      </InputContainer_bottom>
		</Shared.Container>
  );
}

// ===================== Parent Component ================================
export default function YuweetFactory() {
  const textRef = useRef();
  const attachmentRef = useRef();
  const {userObj: {photoURL}} = useUser();
  
  return (
    <YuweetFactoryContainer>
      <CreatorPhoto src={photoURL || DEFAULT_PHOTOURL} />

      <InputContainerDIV 
        textRef={textRef} 
        attachmentRef={attachmentRef} 
      />
    </YuweetFactoryContainer>
  );
}

//============== Styled Components ===============
const YuweetFactoryContainer = styled(Shared.Container)`
  flex-direction: row;
  padding: 1rem;
  border-bottom: 1px solid #EBEEF0;
`;

const CreatorPhoto = styled(Shared.ProfilePhoto)``;

const AttachmentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
	position: relative;
`;

const Img = styled.img`
  width: 100%;
  border-radius: 1rem;
  margin-bottom: 1rem;
`;

const Clear = styled.div`
  background: #292B2C;
  color: #dadbdc;
  border-radius: 50%;
  cursor: pointer;
  text-align: center;
  position: absolute;
  top: 5px;
  left: 5px;

  &:hover {
    color: white;
  }
`;

const InputContainer_bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #EBEEF0;
  padding: 1rem 0;
  margin-top: 1rem;
`;

const OtherAttachments = styled.div`
  display: flex;
  color: #1DA1F2;
  cursor: pointer;
`;

const HoverDIV = styled(Shared.HoverDIV)``;

const YuweetBTN = styled(Shared.BTNwithText)``;

