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
		<DIV>
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
		</DIV>
	);
}

function BGPhoto() {
	return (
		<>
			<BGContainer>
			</BGContainer>

			<input 
				id="bg_photo"
				type="file" accept="image/*"
				// onChange={onChangeFile}
				style={{display:"none"}}
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
			style={{marginTop: "5rem", width: "50%"}}
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
	const photoRef = useRef();
	const nameRef = useRef();
	const {userObj} = useUser();
	
	return (
		<>
			<Shared.Header><ProfileSpan /></Shared.Header>
			<ProfileContainer>

				<InputLabel htmlFor="bg_photo">
					<BGPhoto></BGPhoto>
				</InputLabel>

				<InputLabel htmlFor="profile_photo">
					<PhotoURL reference={photoRef}/>
				</InputLabel>

				<InfoContainer>
					<DisplayName reference={nameRef} />
					<span>{userObj.email}</span>
				</InfoContainer>

				<ActionContainer>
					<LogOutBTN />
					<SubmitBTN photoRef={photoRef} nameRef={nameRef}/>
				</ActionContainer>
				
			</ProfileContainer>
		</>
	);
};

//============ Styled Components ============
const ProfileContainer = styled(Shared.Container)`
	align-items: center;
	margin-top: 3.5rem;
`;

const Img = styled.img`
	width: 100%;
	height: 100%;
	border-radius: 50%;
	border: 4px solid white;
`;

const InputLabel = styled.label`
	cursor: pointer;
`;

const NavSpan = styled.span`
	margin-left: 1rem;
	font-weight: bold;
	font-size: 1.2rem;
`;

const BGContainer = styled.div`
	background: #C4CFD6;
	width: 600px;
	height: 10rem;
`;

const DIV = styled.div`
	position: absolute;
	top: 9rem;
	left: 1rem;
	width: 9em;

`;

const InfoContainer = styled(Shared.Container)`
	height: 10rem;
	padding-left: 1rem;
`;

const ActionContainer = styled(Shared.Container)`
	flex-direction: row;
	justify-content: space-around;
`;