import { dbService, storageService } from 'fbase';
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const YuweetFactory = ({ userObj }) => {
  const [yuweet, setYuweet] = useState("");
	const [attachment, setAttachment] = useState("");

  const onSubmit = async (event) => {
		if(yuweet === "") {
			return;
		}
		event.preventDefault();
		let attachmentUrl = "";

		if(attachment !== "") {
			const attachmentRef = storageService
				.ref()
				.child(`${userObj.uid}/${uuidv4()}`);
			const response = await attachmentRef.putString(attachment, "data_url");
			attachmentUrl = await response.ref.getDownloadURL();
		}

		const yuweetObj = {
			text: yuweet,
			createdAt: Date.now(),
			creatorId: userObj.uid,
			attachmentUrl
		}

		await dbService.collection("yuweets").add(yuweetObj);
		setYuweet("");
		setAttachment("");
	}
	const onChange = (event) => {
		const {target:{value}} = event;
		setYuweet(value);
	}
	const onFileChange = (event) => {
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
		document.getElementById("attach-file").value = null;
  }
  
  return (
    <form onSubmit={onSubmit} className="factoyForm">
			<div className="factoryInput_container">
        <input
          className="factoryInput_input"
          value={yuweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput_arrow" />
      </div>

			<label for="attach-file" className="factoryInput_label">
        <p>Add photo <FontAwesomeIcon icon={faPlus} /></p>
      </label>

			<input 
				id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
			/>
				{attachment && (
					<div className="factoryForm_attachment">
						<img
							src={attachment}
							style={{
								backgroundImage: attachment,
							}}
						/>
						<div className="factoryForm_clear" onClick={onClearAttachment}>
							<span>Remove</span>
							<FontAwesomeIcon icon={faTimes} />
						</div>
        	</div>
				)}
			</form>
  );
}

export default YuweetFactory;