import { Shared } from 'components_view/CommonStyle';
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';
import { useAuth } from 'components_controll/ProvideAuth';

export default function Profile() {
	const {userObj, editUserObj, logOut} = useAuth();
	const history = useHistory();
	// edit local state before submit
	const [newDisplayName, setNewDisplayName] = useState(userObj? userObj.displayName : "");
	const [newPhotoURL, setNewPhotoURL] = useState(userObj? userObj.photoURL : "");

	const onLogOutClick = async () => {
		await logOut();
		history.push("/");
	};

	const onChange = (event) => {
		const {target: {value}} = event;
		setNewDisplayName(value);
	};
	
	const onChangeFile = (event) => {
		const {target:{files}} = event;
		const theFile = files[0];

		const reader = new FileReader();
		reader.onloadend = (finishedEvent) => {
			const {currentTarget:{result}} = finishedEvent;
			setNewPhotoURL(result);
		};
		reader.readAsDataURL(theFile);
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		if(newDisplayName === "" || newDisplayName == null) {
			return window.alert("Please input name.");
		}
		await editUserObj({displayName: newDisplayName, photoURL: newPhotoURL });
		window.alert("Updated successfully");		
	};
	
	return (
		<ProfileContainer>
			{newPhotoURL ? (
					<Img src={newPhotoURL}/>
				) : (
					<FontAwesomeIcon icon={faUserCircle} size="6x" />
			)}
			<ProfileForm onSubmit={onSubmit} >
				<Label htmlFor="profile_photo">
        	<span style={{marginRight: 5}}>Add photo</span>
					<FontAwesomeIcon icon={faPlus} />
      	</Label>
				<input 
					id="profile_photo"
					type="file"
					accept="image/*"
					onChange={onChangeFile}
					style={{ opacity: 0 }}
				/>
				<Shared.FormInput 
					onChange={onChange}
					type="text" 
					autoFocus
					placeholder="Display Name" 
					value={newDisplayName}
					maxLength={10}
				/>
				<Shared.FormSumbit 
					type="submit" 
					value="Update Profile" 
          style={{ marginTop: 10 }}
				/>
			</ProfileForm>
			<Shared.CancelButton style={{marginTop: 50}} onClick={onLogOutClick}>
        Log Out
      </Shared.CancelButton>
		</ProfileContainer>
	);
};

//============ Styled Components ============
const ProfileContainer = styled(Shared.Container)`
	align-items: center;
`;

const ProfileForm = styled.form`
	border-bottom: 1px solid rgba(255, 255, 255, 0.9);
  padding-bottom: 30px;
  width: 100%;
  display: flex;
	flex-direction: column;
`;

const Img = styled.img`
	width:100px;
	height: 100px;
	border-radius: 50px;
`;

const Label = styled.label`
	color: #04aaff;
	cursor: pointer;
	display:flex;
	justify-content: center;
	margin-top: 1rem;
`;
