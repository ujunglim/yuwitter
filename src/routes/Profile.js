import { Shared } from 'components_view/CommonStyle';
import React, { useRef, useState } from "react";
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';
import { useUser } from 'components_controll/ProvideAuth';

// ====================== Child Component ============================
// isolate state
function PhotoURL({reference}) {
	const {userObj} = useUser();
	// edit local state before submit
	const [newPhotoURL, setNewPhotoURL] = useState(userObj ? userObj.photoURL : "");
	reference.current = newPhotoURL;   // deliever url

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

	return(
		<>
			{newPhotoURL ? (
					<Img src={newPhotoURL}/>
				) : (
					<CenterDiv>
						<FontAwesomeIcon icon={faUserCircle} size="7x" />
					</CenterDiv>)
			}
			<input 
				id="profile_photo"
				type="file"
				accept="image/*"
				onChange={onChangeFile}
				style={{ opacity: 0 }}
			/>
		</>
	);
}

function DisplayName({reference}) {
	const {userObj} = useUser();
	// edit local state before submit
	const [newDisplayName, setNewDisplayName] = useState(userObj? userObj.displayName : "");
	reference.current = newDisplayName;

	const onChange = (event) => {
		const {target: {value}} = event;
		setNewDisplayName(value);
	};
	
	return(
		<Shared.FormInput 
			onChange={onChange}
			type="text" 
			autoFocus
			placeholder="Display Name" 
			value={newDisplayName}
			maxLength={8}
		/>
	);
}

function SubmitBTN({photoRef, nameRef}) {
	const {editUserObj} = useUser();

	const onSubmitClick = async () => {
		const newDisplayName = nameRef.current;
		const newPhotoURL = photoRef.current;

		if(newDisplayName === "" || newDisplayName == null) {
			return window.alert("Please input name.");
		}
		await editUserObj({displayName: newDisplayName, photoURL: newPhotoURL });
		window.alert("Updated successfully");		
	};

	return (
		<Shared.FormSubmit 
			onClick={onSubmitClick}
			type="submit" 
			value="Update Profile" 
			style={{ marginTop: 10 }}
		/>
	);
}

function LogOutBTN() {
	const {logOut} = useUser();
	const history = useHistory();
	const onLogOutClick = async () => {
		await logOut();
		history.push("/");
	};

	return (
		<Shared.CancelButton style={{marginTop: 50}} onClick={onLogOutClick}>
			Log Out
		</Shared.CancelButton>
	);

}

// ===================== Parent Component ================================
export default function Profile() {
	const photoRef = useRef();
	const nameRef = useRef();
	
	return (
		<ProfileContainer>
			<Label htmlFor="profile_photo">
				<PhotoURL reference={photoRef}/>
			</Label>
			<DisplayName reference={nameRef} />
				<SubmitBTN photoRef={photoRef} nameRef={nameRef}/>
			<LogOutBTN />
		</ProfileContainer>
	);
};

//============ Styled Components ============
const ProfileContainer = styled(Shared.Container)`
	align-items: center;
	overflow-y: hidden;
`;

const Img = styled.img`
	width:100px;
	height: 100px;
	border-radius: 50px;
	
	display: block;
	margin: auto;
`;

const Label = styled.label`
	cursor: pointer;
`;

const CenterDiv = styled.div`
	text-align: center; 
	width: 100%; 
`;