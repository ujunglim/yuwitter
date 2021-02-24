import { Shared } from 'components/CommonStyle';
import { authService, dbService, storageService} from 'fbase';
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';

const Profile = ({ userObj, refreshUser }) => {
	const history = useHistory();
	const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
	const [profilePhoto, setProfilePhoto] = useState(userObj.photoURL);

	const onLogOutClick = () => {
		authService.signOut();
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
			setProfilePhoto(result);
		};
		reader.readAsDataURL(theFile);
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		if(newDisplayName === "" || newDisplayName == null) {
			return window.alert("Please input name.");
		}

		if(userObj.displayName !== newDisplayName) {
			const newUserObj = {
				...userObj,
				displayName: newDisplayName
			}
			await userObj.updateProfile(newUserObj);
			// --- old ----
			refreshUser();
		}	

		let profilePhotoURL = "";
		if(profilePhoto !== userObj.photoURL) {
			const profilePhotoRef = storageService
				.ref()
				.child(`ProfilePhoto/${userObj.uid}`);
			const response = await profilePhotoRef.putString(profilePhoto, "data_url");
			profilePhotoURL = await response.ref.getDownloadURL();

			await userObj.updateProfile({
				...userObj,
				photoURL: profilePhotoURL
			});
			refreshUser();
			setProfilePhoto(profilePhotoURL);
		}
		window.alert("Updated successfully");
	};

	// const getMyYuweets = async () => {
	// 	const yuweets = await dbService
	// 		.collection("yuweets")
	// 		.where("creatorId", "==", userObj.uid)
	// 		.orderBy("createdAt")
	// 		.get();
	// 	yuweets.docs.map((doc) => console.log(doc.data()));
	// };

	// useEffect(() => {
	// 	getMyYuweets();
	// }, []);

	
	return (
		<ProfileContainer>
			{profilePhoto ? (
					<Img src={profilePhoto}/>
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

export default Profile;