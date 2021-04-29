import { Shared } from 'components_view/CommonStyle';
import React, { useRef, useState } from "react";
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';
import { useUser } from 'components_controll/ProvideAuth';

// ====================== Child Component ============================
// isolate state
function BGPhoto({reference}) {
	const [bgPhotoURL, SetBgPhotoURL] = useState(localStorage.getItem("bg_photo") ? localStorage.getItem("bg_photo") : "")

	const onChangeFile = (event) => {
		const {target: {files}} = event;
		const theFile = files[0];

		const reader = new FileReader();
		reader.onloadend = (finishedEvent) => {
			const {currentTarget:{result}} = finishedEvent;
			SetBgPhotoURL(result);
			reference.current = result;
		};
		reader.readAsDataURL(theFile);
	}

	return (
		<>
			<BGContainer>
				{bgPhotoURL && <img width="100%" src={bgPhotoURL}/>}
			</BGContainer>

			<input 
				id="bg_photo"
				type="file" accept="image/*"
				onChange={onChangeFile}
				style={{display:"none"}}
			/>
		</>
	);
}

function ProfilePhoto({reference}) {
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
		<ProfilePhotoContainer>
				{newPhotoURL ? (
						<Img src={newPhotoURL}/>
					) : (
						<FontAwesomeIcon icon={faUserCircle} size="9x" color="lightGrey" 
						style={{background: "white", border: "2px solid white", borderRadius: "50%"}}/>
					)
				}

			<input 
					id="profile_photo"
					type="file"	accept="image/*"
					onChange={onChangeFile}
					style={{display:"none"}}
			/>
		</ProfilePhotoContainer>
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
			style={{marginTop: "5rem", width: "50%"}}
		/>
	);
}

function SubmitBTN({bgPhotoRef, profilePhotoRef, nameRef}) {
	const {editUserObj} = useUser();

	const onSubmitClick = async () => {
		const newBgPhoto = bgPhotoRef.current;
		const newPhotoURL = profilePhotoRef.current;
		const newDisplayName = nameRef.current;

		localStorage.setItem("bg_photo", newBgPhoto);

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
		/>
	);
}

function ProfileSpan() {
	const {userObj} = useUser();

	return (
		<NavSpan>
			{userObj && userObj.displayName
				? userObj.displayName
				: "My Profile"
			}
		</NavSpan>
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
		<Shared.CancelButton onClick={onLogOutClick}>
			Log Out
		</Shared.CancelButton>
	);

}

// ===================== Parent Component ================================
export default function Profile() {
	const bgPhotoRef = useRef();
	const profilePhotoRef = useRef();
	const nameRef = useRef();
	const {userObj} = useUser();
	
	return (
		<ProfileContainer>
			<Shared.Header><ProfileSpan /></Shared.Header>

			<InputLabel htmlFor="bg_photo">
				<BGPhoto reference={bgPhotoRef} />
			</InputLabel>

			<InputLabel htmlFor="profile_photo">
				<ProfilePhoto reference={profilePhotoRef}/>
			</InputLabel>

			<InfoContainer>
				<DisplayName reference={nameRef} />
				<span>{userObj.email}</span>
			</InfoContainer>

			<ActionContainer>
				<SubmitBTN bgPhotoRef={bgPhotoRef} profilePhotoRef={profilePhotoRef} nameRef={nameRef}/>
				<LogOutBTN />
			</ActionContainer>
			
		</ProfileContainer>
	);
};

//============ Styled Components ============
const ProfileContainer = styled(Shared.Container)`
	align-items: center;
`;

const InputLabel = styled.label`
	cursor: pointer;
`;

const ProfilePhotoContainer = styled.div`
	position: absolute;
	top: 8rem;
	left: 1rem;
	width: 9em;
`;

const Img = styled.img`
	width: 100%;
	height: 100%;
	border-radius: 50%;
	border: 4px solid white;
`;

const NavSpan = styled.span`
	margin-left: 1rem;
	font-weight: bold;
	font-size: 1.2rem;
`;

const BGContainer = styled.div`
	background: #C4CFD6;
	width: 600px;
	height: 12.5rem;
	overflow: hidden;
`;

const InfoContainer = styled(Shared.Container)`
	height: 10rem;
	padding-left: 1rem;
`;

const ActionContainer = styled(Shared.Container)`
	flex-direction: row;
	justify-content: space-around;
`;