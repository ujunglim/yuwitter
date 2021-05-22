import { Shared } from 'components_view/CommonStyle';
import React, { useRef, useState } from "react";
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';
import { useUser } from 'components_controll/ProvideAuth';
import { storageService } from 'components_controll/fbase';
import { useProfile } from 'components_controll/ProvideProfile';
import { useModal } from 'components_controll/ProvideModal';
import Modal from 'components_view/Modal';
import { Close } from '@material-ui/icons';
import { makeStyles, TextField } from '@material-ui/core';
import { config, useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';

// ====================== Child Component ============================
// isolate state
function BGPhoto({reference}) {
	const {newBgPhotoURL, setNewBgPhotoURL} = useProfile();
	reference.current = newBgPhotoURL;

	const onChangeFile = (event) => {
		const {target: {files}} = event;
		const theFile = files[0];

		const reader = new FileReader();
		reader.onloadend = (finishedEvent) => {
			const {currentTarget:{result}} = finishedEvent;
			setNewBgPhotoURL(result);
		};
		reader.readAsDataURL(theFile);
	}
	
	return (
		<>
			<BGContainer>
				{newBgPhotoURL && (
					<BGImgMask>
						<BGImg src={newBgPhotoURL} />
					</BGImgMask>
				)}
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
					<ProfileImgMask>
						<ProfileImg src={newPhotoURL}/>
					</ProfileImgMask>
					) : (
						<FontAwesomeIcon icon={faUserCircle} size="9x" color="#C4CFD6" 
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

function EditBTN() {
	const {setIsModalOpen} = useModal();

	const onEditClick = () => {
		setIsModalOpen(true);
	}

	return (
		<EditButtonDIV>
			<EditButton onClick={onEditClick}>Edit profile</EditButton>
		</EditButtonDIV>
	);
}


//==============================================
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: '1rem 0',
      width: '100%',
    },
  },
}));

function TextFields({nameRef}) {
  const classes = useStyles();
	const {userObj} = useUser();
	// edit local state before submit
	const [newDisplayName, setNewDisplayName] = useState(userObj ? (userObj.displayName ? userObj.displayName : userObj.email.split("@")[0]) : "");
	nameRef.current = newDisplayName;

	const onChangeName = (event) => {
		const {target: {value}} = event;
		setNewDisplayName(value);
	};

  return (
    <form className={classes.root} noValidate autoComplete="off" style={{width:"95%"}}>
      <TextField id="outlined-basic" label="Name" variant="outlined" 
				onChange={onChangeName}
				value={newDisplayName}
				// maxLength={8}
			/>
			<TextField
				id="outlined-multiline-static"
				label="Bio"
				multiline
				rows={3}
				variant="outlined"
      />
      <TextField id="outlined-basic" label="Location" variant="outlined" />
      <TextField id="outlined-basic" label="Website" variant="outlined" />
    </form>
  );
}

//==================================================
function EditContainer({bgPhotoRef, profilePhotoRef, nameRef}) {
	const {setIsModalOpen} = useModal();
	const onCloseEditClick = () => {
		setIsModalOpen(false);
	}

	const props = useSpring({from:{scale:0}, to:{scale:1}, config:config.wobbly})

	return (
		<EditDIV style={{transform:props.scale.to((scale) => `scale(${scale})`)}}>
			<EditHeader>
				<EditHeader_left>
					<CloseHoverDIV>
						<Close onClick={onCloseEditClick} style={{color:"#1DA1F2", cursor:"pointer"}} />
					</CloseHoverDIV>
					Edit profile
				</EditHeader_left>
				<SaveBTN bgPhotoRef={bgPhotoRef} profilePhotoRef={profilePhotoRef} nameRef={nameRef} />
			</EditHeader>

			<EditContent>
				<InputLabel htmlFor="bg_photo">
					<BGPhoto reference={bgPhotoRef} />
				</InputLabel>

				<InputLabel htmlFor="profile_photo">
					<ProfilePhoto reference={profilePhotoRef}/>
				</InputLabel>

				
				<TextFields nameRef={nameRef} />
			</EditContent>
		</EditDIV>
	);
}

function SaveBTN({bgPhotoRef, profilePhotoRef, nameRef}) {
	const {editUserObj, userObj} = useUser();
	const {setIsModalOpen} = useModal();

	const onClickSave = async () => {
		let newBgPhotoURL = bgPhotoRef.current;
		const newPhotoURL = profilePhotoRef.current;
		const newDisplayName = nameRef.current;

		if(newDisplayName === "" || newDisplayName == null) {
			return window.alert("Please input name.");
		}

		//=========== update bgPhoto ===========
		if(newBgPhotoURL && newBgPhotoURL.charAt(0) === "d") {
			//get ref
			const bgPhotoStorageRef = storageService
				.ref()
				.child(`BackgroundPhoto/${userObj.email}`);
				
			// upload photo from local url to storage by using storage reference
			const response = await bgPhotoStorageRef.putString(newBgPhotoURL, "data_url");
			// then get remote url from storage 
			newBgPhotoURL = await response.ref.getDownloadURL();

			const bgData = {
				["bgPhotoURL"] : newBgPhotoURL
			}
			userObj.myRef.update(bgData);
		}
	
		//=========== update displayName, profilePhoto ==============
		editUserObj({displayName: newDisplayName, photoURL: newPhotoURL });
		window.alert("Updated successfully");		
		setIsModalOpen(false)
	};

	return (
		<Shared.BTNwithText onClick={onClickSave}>Save</Shared.BTNwithText>
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
	const {isModalOpen} = useModal();

	return (
		<>
			<ProfileContainer>
				<Shared.Header><ProfileSpan /></Shared.Header>
				<BGPhoto reference={bgPhotoRef} />
				<ProfilePhoto reference={profilePhotoRef}/>


				<InfoContainer>
					<EditBTN/>
					<h3>{userObj && userObj.displayName}</h3>
					{userObj && <span>@{userObj.email.split('@')[0]}</span>}
				</InfoContainer>

				<LogOutBTN />
				
			</ProfileContainer>
			{isModalOpen && (
				<>
					<Modal />
					<EditContainer bgPhotoRef={bgPhotoRef} profilePhotoRef={profilePhotoRef} nameRef={nameRef} />
				</>

				)}
		</>
	);
};

//============ Styled Components ============
const ProfileContainer = styled(Shared.Container)`
	align-items: center;
`;

const InputLabel = styled.label`
	cursor: pointer;
`;

//---------- background ----------
const BGContainer = styled.div`
	width: 600px;
	height: 12.5rem;
	overflow: hidden;
	background: #C4CFD6;

`;

const BGImgMask = styled(Shared.ImageMask)`
	width: 100%;
	height: auto; 
	border-radius: 0;
`;

const BGImg = styled.img`
	width: 100%;
	height: auto;
	`;

//---------- profile ----------
const ProfilePhotoContainer = styled.div`
	position: absolute;
	top: 8rem;
	left: 1rem;
	width: 9em;
	height: 9em;
	background: #C4CFD6;
	border-radius: 50%;
`;

const ProfileImgMask = styled(Shared.ImageMask)`
	width: 9em;
	height: 9em;
	border: 4px solid white; 
`;

const ProfileImg = styled(Shared.ImgInMask)``;

const NavSpan = styled.span`
	margin-left: 1rem;
	font-weight: bold;
	font-size: 1.2rem;
`;

const InfoContainer = styled(Shared.Container)`
	padding: 1rem;
`;

const EditButtonDIV = styled.div`
	display: flex;
	justify-content: flex-end;
	/* background: coral; */
`;

const EditButton = styled(Shared.BTNwithText)`
	background: white;
	color: #1DA1F2;
	border: 1px solid #1DA1F2;
	width: 20%;
`;

//=========== isEditing ==========
const EditDIV = styled(animated.div)`
	width: 38%;
	height: 90%;
	background: white;
	padding-top: 4rem;
	z-index: 3;
	border-radius: 1rem;
	overflow: hidden;

	position: fixed;
	top: 5%;
  left: 30%;
	/* if used scale transform you have to wrtie below */
	will-change: transform;
`;

const EditHeader = styled(Shared.Header)`
	width: 100%;
`;

const EditHeader_left = styled.div`
	display: flex;
	align-items: center;
`;

const CloseHoverDIV = styled(Shared.HoverDIV)`
	position: relative;
	left: -8px;
	margin-right: 1rem;
`;

const EditContent = styled(Shared.Container)`
	align-items: center;
	/* background: pink; */
	/* width: 100%;
	margin: 4rem 1rem 1rem 1rem; */
`;