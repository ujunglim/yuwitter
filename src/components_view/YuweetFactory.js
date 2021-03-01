import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';
import { useYuweets } from 'components_controll/ProvideYuweets';

export default function YuweetFactory() {
  const [text, setText] = useState("");
	const [attachment, setAttachment] = useState("");
	const {addYuweet} = useYuweets();

  const onSubmit = async (event) => {
		event.preventDefault();
		addYuweet(text, attachment);
		setText("");
		setAttachment("");
	}
	const onChange = (event) => {
		const {target:{value}} = event;
		setText(value);
	}
	const onChangeFile = (event) => {
		const {target:{files}} = event;
		const theFile = files[0];

		const reader = new FileReader();
		reader.onloadend = (finishedEvent) => {
			const {currentTarget:{result}} = finishedEvent;
			setAttachment(result);
		}
		reader.readAsDataURL(theFile);

	}
	const onClearAttachment = () => {
		setAttachment("");
		document.getElementById("attach_file").value = null;
  }
  
  return (
    <Form onSubmit={onSubmit}>
			<InputContainer>
        <Input
          value={text}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <Arrow type="submit" value="&rarr;" />
      </InputContainer>

			<InputLabel htmlFor="attach_file">
        <p>Add photo <FontAwesomeIcon icon={faPlus} /></p>
      </InputLabel>

			<input 
				id="attach_file"
        type="file"
        accept="image/*"
        onChange={onChangeFile}
        style={{ opacity: 0 }}
			/>
			{attachment && (
				<Attachment>
					<Img
						src={attachment}
						style={{
							backgroundImage: attachment,
						}}
					/>
					<Clear onClick={onClearAttachment}>
						<ClearSpan>Remove</ClearSpan>
						<FontAwesomeIcon icon={faTimes} />
					</Clear>
				</Attachment>
			)}
			</Form>
  );
}

//============== Styled Components ===============
const Form= styled.form`
	display: flex;
  flex-direction: column;
  align-items: center;
	width: 100%;
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

const Attachment = styled.div`
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

