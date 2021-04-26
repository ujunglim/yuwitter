import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';
import { useYuweets } from 'components_controll/ProvideYuweets';
import { Shared } from './CommonStyle';
import { useUser } from 'components_controll/ProvideAuth';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

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
		<InputContainer>
			{/* ================= text ==================== */}
			<InputText
				value={text} 
				onChange={onChange} 
				type="text" 
				placeholder="What's on your mind?" 
				maxLength={120} 
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
				<input 
					id="attach_file" 
					type="file" accept="image/*" 
					onChange={onChangeFile} 
					style={{display:"none"}}
				/>

				<InputLabel htmlFor="attach_file">
						<FontAwesomeIcon icon={faImage} size="2x" />
				</InputLabel>

			{/* ================ submitBTN ================== */}
				<YuweetBTN onClick={onSubmitClick}>Yuweet</YuweetBTN>
			</InputContainer_bottom>
			</InputContainer>
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
	border-top: 1px solid #EBEEF0;
  border-bottom: 1px solid #EBEEF0;

`;

const CreatorPhoto = styled(Shared.ProfilePhoto)``;

const InputContainer = styled(Shared.Container)`
  justify-content: space-between;
  position: relative;
`;

const InputText = styled.textarea`
  background: none;
	resize: none;
  border: none;
	outline: none;
	height: 5rem;
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
	border-radius: 1.5rem;
	font-weight: bold;
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
	/* top: 5rem; */
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
