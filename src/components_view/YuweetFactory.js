import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';
import { useYuweets } from 'components_controll/ProvideYuweets';

// ====================== Child Component ============================
function Text({reference}) {
	const [text, setText] = useState("");
	reference.current = { text, setText };

	const onChange = (event) => {
		const {target:{value}} = event;
		setText(value);
	}
	
	return (
		<Input 
			value={text} 
			onChange={onChange} 
			type="text" 
			placeholder="What's on your mind?" 
			maxLength={120} 	
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
			<InputLabel htmlFor="attach_file">
					<p>Add photo <FontAwesomeIcon icon={faPlus} /></p>
			</InputLabel>

			<input 
				id="attach_file" 
				type="file" accept="image/*" 
				onChange={onChangeFile} 
				style={{ opacity: 0 }} 
			/>

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
		<Arrow type="submit" value="&rarr;" onClick={onSubmitClick} />
	);
}

// ===================== Parent Component ================================
export default function YuweetFactory() {
	const textRef = useRef();
	const attachmentRef = useRef();
	
  return (
    <YuweetFactoryContainer>
			<InputContainer>
        <Text reference={textRef} />
				<SubmitBTN textRef={textRef} attachmentRef={attachmentRef}
				/>
      </InputContainer>

			<Attachment reference={attachmentRef} />
		</YuweetFactoryContainer>
  );
}

//============== Styled Components ===============
const YuweetFactoryContainer= styled.div`
	display: flex;
  flex-direction: column;
  align-items: center;
	width: 80%;
`;

const InputContainer = styled.div`
 	display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  margin-bottom: 20px;
  width: 100%;
`;

const Input = styled.input`
  flex-grow: 1;
  height: 40px;
  padding: 0px 20px;
  color: white;
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

