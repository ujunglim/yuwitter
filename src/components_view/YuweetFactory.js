import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';
import { useYuweets } from 'components_controll/ProvideYuweets';
import { Shared } from './CommonStyle';
import { useUser } from 'components_controll/ProvideAuth';

// ====================== Child Component ============================
function Text({reference}) {
	const [text, setText] = useState("");
	reference.current = { text, setText };

	const onChange = (event) => {
		const {target:{value}} = event;
		setText(value);
	}
	
	return (
		<InputText
			value={text} 
			onChange={onChange} 
			type="text" 
			placeholder="What's on your mind?" 
			maxLength={120} 
			autofocus
		/>
	);
}

function Attachment({reference}) {
	const [attachment, setAttachment] = useState("");
	reference.current = { attachment, setAttachment };

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

	return (
		<>
			<input 
				id="attach_file" 
				type="file" accept="image/*" 
				onChange={onChangeFile} 
				style={{display:"none"}}
			/>

			<InputLabel htmlFor="attach_file">
					<FontAwesomeIcon icon={faImage} size="2x" />
			</InputLabel>

			{attachment && (
				<AttachmentContainer>
					<Img src={attachment}/>
					<Clear onClick={onClearAttachment}>
						<ClearSpan>Remove</ClearSpan>
						<FontAwesomeIcon icon={faTimes} />
					</Clear>
				</AttachmentContainer>
			)}
		</>
	);

}

function SubmitBTN({textRef, attachmentRef}) {
	const {addYuweet} = useYuweets();

  const onSubmitClick = async () => {
		const {current: {text, setText}} = textRef;
		const {current: {attachment, setAttachment}} = attachmentRef;

		addYuweet(text, attachment);
		setText("");
		setAttachment("");
	}

	return (
		<YuweetBTN onClick={onSubmitClick}>Yuweet</YuweetBTN>
	);
}

// ===================== Parent Component ================================
export default function YuweetFactory() {
	const textRef = useRef();
	const attachmentRef = useRef();
	const {userObj: {photoURL}} = useUser();
	
  return (
    <YuweetFactoryContainer>
			<CreatorPhoto src={photoURL}/>

			<InputContainer>
        <Text reference={textRef} />
				<OtherDIV>
					<Attachment reference={attachmentRef} />
					<SubmitBTN textRef={textRef} attachmentRef={attachmentRef} />
				</OtherDIV>
      </InputContainer>

		</YuweetFactoryContainer>
  );
}

//============== Styled Components ===============
const YuweetFactoryContainer = styled(Shared.Container)`
	flex-direction: row;
	width: 80%;
`;

const CreatorPhoto = styled(Shared.ProfilePhoto)``;


const InputContainer = styled(Shared.Container)`
	/* background: coral; */
  justify-content: space-between;
  position: relative;
`;

const OtherDIV = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.5rem 0rem;
	border-top: 1px solid red;
`;

const InputText = styled.textarea`
  background: coral;

	resize: none;
  border: none;
	outline: none;
	max-height: 10rem;
  display: block;
  overflow: hidden;
  box-sizing: padding-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: medium;
	font-weight: 500;
	margin: 0.5rem 0 1rem 0;
`;

const YuweetBTN = styled.button`
	color: white;
	background-color: #04aaff;
	padding: 0.6rem 1rem;
	border-radius: 1rem;
`;


const InputLabel = styled.label`
	color: #04aaff;
  cursor: pointer;
`;

const AttachmentContainer = styled.div`
	display: flex;
  flex-direction: column;
  align-items: center;
`;

const Img = styled.img`
	height: 80px;
  width: 80px;
  border-radius: 40px;
`;

const Clear = styled.div`
	color: #04aaff;
  cursor: pointer;
  text-align: center;
`;

const ClearSpan = styled.span`
  margin-right: 10px;
  font-size: 12px;
`;

