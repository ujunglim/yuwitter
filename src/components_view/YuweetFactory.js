import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';
import { useYuweets } from 'components_controll/ProvideYuweets';
import { Shared } from './CommonStyle';
import { useUser } from 'components_controll/ProvideAuth';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { DEFAULT_PHOTOURL } from 'constants.js';
import { DateRangeOutlined, GifOutlined, ImageOutlined, PollOutlined, SentimentSatisfiedAlt } from '@material-ui/icons';
import { memo } from 'react';

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

  // get file that user selected
  const onChangeFile = (event) => {
    const {target:{files}} = event;
    const theFile = files[0]; // get one file

    // create reader and start reading file
    const reader = new FileReader();
    // add event listener to reader
    // it is triggered when reading is finished, and return finishedEvent
    reader.onloadend = (finishedEvent) => {
      const {currentTarget:{result}} = finishedEvent;
      setAttachment(result); // save to attachment state
      // onChange occurs when value of element has been changed
      document.getElementById("attach_file").value = null;
    }
    // get data after get finishedEvent
    reader.readAsDataURL(theFile);
  }

  const onClearAttachment = () => {
    // clear state
    setAttachment("");
    // clear dom
    document.getElementById("attach_file").value = null;
  }

  // --------- submitBTN ---------
  const {addYuweet} = useYuweets();

  const onSubmitClick = async () => {
    const {current: {text, setText}} = textRef;
    const {current: {attachment, setAttachment}} = attachmentRef;

    // sent text, attachment to addYuweet method
    addYuweet(text, attachment);
    // clear text, attachment state
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
          <AttachmentImg src={attachment}/>
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
export default memo(function YuweetFactory() {
  const textRef = useRef();
  const attachmentRef = useRef();
  const {userObj: {photoURL}} = useUser();
  
  return (
    <YuweetFactoryContainer>
      <div>
        <CreatorImgMask>
          <CreatorImg src={photoURL || DEFAULT_PHOTOURL}/>
        </CreatorImgMask>
      </div>
     
      <InputContainerDIV 
        textRef={textRef} 
        attachmentRef={attachmentRef} 
      />
    </YuweetFactoryContainer>
  );
})

//============== Styled Components ===============
const YuweetFactoryContainer = styled(Shared.Container)`
  flex-direction: row;
  padding: 1rem;
  border-bottom: 1px solid #EBEEF0;
`;

const CreatorImgMask = styled(Shared.ImageMask)`
  width: 3rem;
  height: 3rem;
  margin-right: 0.7rem;
`;

const CreatorImg = styled(Shared.ImgInMask)``;

const AttachmentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
	position: relative;
`;

const AttachmentImg = styled.img`
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

