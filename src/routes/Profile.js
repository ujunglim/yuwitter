import { Shared } from 'components/CommonStyle';
import { authService, dbService} from 'fbase';
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Profile = ({ userObj, refreshUser}) => {
	const history = useHistory();
	const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
	// const [profilePhoto, setProfilePhoto] = useState("");

	const onLogOutClick = () => {
		authService.signOut();
		history.push("/");
	};
	const onChange = (event) => {
		const {target: {value}} = event;
		setNewDisplayName(value);
	};
	
	const onSubmit = async (event) => {
		event.preventDefault();
		if(userObj.displayName !== newDisplayName) {
			await userObj.updateProfile({
				displayName: newDisplayName
			});
			refreshUser();
		}

		// if(profilePhoto !== "") {
		// 	const profilePhotoRef = storageService
		// 		.ref()
		// 		.child(`ProfilePhoto/${userObj.uid}`);
		// 	const response = await profilePhotoRef.putString(profilePhoto, 'data_url');
		// 	const profilePhotoUrl = await response.ref.getDownloadURL();
		// 	await userObj.updateProfile({
		// 		photoURL: profilePhotoUrl
		// 	})
		// 	console.log("yess")
		// }
	};

	// const onFileChange = (event) => {
	// 	const {target:{files}} = event;
	// 	const theFile = files[0];

	// 	const reader = new FileReader();
	// 	reader.onloadend = (finishedEvent) => {
	// 		const {currentTarget: {result}} = finishedEvent;
	// 		setProfilePhoto(result);
	// 	}
	// 	reader.readAsDataURL(theFile);
	// }

	// const onClearAttachment = () => {
	// 	setProfilePhoto("");
	// 	document.getElementById("file").value = null;
	// }
	
	const getMyYuweets = async () => {
		const yuweets = await dbService
			.collection("yuweets")
			.where("creatorId", "==", userObj.uid)
			.orderBy("createdAt")
			.get();
		// yuweets.docs.map((doc) => console.log(doc.data()));
	};

	useEffect(() => {
		getMyYuweets();
	}, []);
	
	return (
		<Shared.Container>
			<ProfileForm onSubmit={onSubmit} >
				{/* {profilePhoto && (
						<div>
							<img src={profilePhoto} width="50px" height="50px" />
							<button onClick={onClearAttachment}>Clear</button>
						</div>
					)}
				<input id="file" type="file" accept="image/*" onChange={onFileChange}/> */}
				<Shared.FormInput 
					onChange={onChange}
					type="text" 
					autoFocus
					placeholder="Display Name" 
					value={newDisplayName}
				/>
				<Shared.FormSumbit 
					type="submit" 
					value="Update Profile" 
          style={{
            marginTop: 10,
          }}
				/>
				
			</ProfileForm>
			<Shared.CancelButton style={{marginTop: 50}} onClick={onLogOutClick}>
        Log Out
      </Shared.CancelButton>
		</Shared.Container>
	);
};

const ProfileForm = styled.form`
	border-bottom: 1px solid rgba(255, 255, 255, 0.9);
  padding-bottom: 30px;
  width: 100%;
  display: flex;
	flex-direction: column;
`;

export default Profile;