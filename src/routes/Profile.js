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
import { Close, Link, LocationOn, PhotoCameraOutlined } from '@material-ui/icons';
import { makeStyles, TextField } from '@material-ui/core';
import { config, useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';

// ====================== Child Component ============================
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

function EditBTN() {
	const {setIsModalOpen} = useModal();

	const onEditClick = () => {
		setIsModalOpen(true);
	}

	return (
		<EditButton onClick={onEditClick}>Edit profile</EditButton>
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
		<LogOutBTNwithText onClick={onLogOutClick}>
			Log Out
		</LogOutBTNwithText>
	);

}

//=========== Editing components ========================
function SaveBTN({bgPhotoRef, profilePhotoRef, nameRef, bioRef, locationRef, websiteRef, errorMessage}) {
	const {editUserObj, userObj} = useUser();
	const {setIsModalOpen} = useModal();

	const onClickSave = async () => {
		let newBgPhotoURL = bgPhotoRef.current;
		const newPhotoURL = profilePhotoRef.current;
		const newDisplayName = nameRef.current;
		const newBio = bioRef.current;
		const newLocation = locationRef.current;
		const newWebsite = websiteRef.current;

		if(newDisplayName === "" || newDisplayName == null) {
			return window.alert("Please input name.");
		}
		if(errorMessage.length != 0) {
			return window.alert("Check website again.");
		}

		//=========== update bgPhoto ===========
		// newBgPhotoURL starts with "d" like data:image/jpeg......
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
	
		// update displayName, profilePhoto 
		editUserObj({displayName: newDisplayName, photoURL: newPhotoURL });

		// update bio, location, website
		const otherInfoData = {
			["bio"] : newBio,
			["location"] : newLocation,
			["website"]: newWebsite
		}
		userObj.myRef.update(otherInfoData);

		window.alert("Updated successfully");		
		setIsModalOpen(false);
	};

	return (
		<Shared.BTNwithText onClick={onClickSave}>Save</Shared.BTNwithText>
	);
}

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
		<div style={{position:"relative"}}>
			<BGContainer>
				<ShadowDIV>
					<HoverDIV style={{top: "45%", left:"47%"}}>
						<PhotoCameraOutlined style={{color: "white"}}/>
					</HoverDIV>
				</ShadowDIV>

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
		</div>
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
			<ProfileImgMask>
				{newPhotoURL ? (
					<>
						<ProfileImg src={newPhotoURL}/>
						<ShadowDIV>
							<HoverDIV>
								<PhotoCameraOutlined style={{color: "white"}}/>
							</HoverDIV>
						</ShadowDIV>
					</>
				) : (
					<>
						<FontAwesomeIcon icon={faUserCircle} size="9x" color="#C4CFD6" 
						style={{background: "white", border: "2px solid white", borderRadius: "50%", position: "relative", top:"-3px"}}/>
						<ShadowDIV>
							<HoverDIV>
								<PhotoCameraOutlined style={{color: "white"}}/>
							</HoverDIV>
						</ShadowDIV>
					</>
				)}
			</ProfileImgMask>
			

			<input 
				id="profile_photo"
				type="file"	accept="image/*"
				onChange={onChangeFile}
				style={{display:"none"}}
			/>
		</ProfilePhotoContainer>
	);
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: '1rem 0',
      width: '100%',
    },
  },
}));

function TextFields({nameRef, bioRef, locationRef, websiteRef, errorMessage, setErrorMessage}) {
  const classes = useStyles();
	const {userObj} = useUser();
	// edit local state before submit
	const [newDisplayName, setNewDisplayName] = useState(userObj ? (userObj.displayName ? userObj.displayName : userObj.email.split("@")[0]) : "");
	nameRef.current = newDisplayName;

	const {bio, setBio, location, setLocation, website, setWebsite} = useProfile();

	bioRef.current = bio;
	locationRef.current = location;
	websiteRef.current = website;

	const onChangeName = (event) => {
		const {target: {value}} = event;
		setNewDisplayName(value);
	};

	const onChangeBio = (event) => {
		const {target: {value}} = event;
		setBio(value);
	};

	const onChangeLocation = (event) => {
		const {target: {value}} = event;
		setLocation(value);
	};

	const onChangeWebsite = (event) => {
		const {target: {value}} = event;
		if(!value.startsWith('http')) {
			setErrorMessage("Enter valid address");
		}
		else {
			setErrorMessage("");
		}
		setWebsite(value);
	};


  return (
    <form className={classes.root} noValidate autoComplete="off" style={{width:"95%"}}>
      <TextField id="outlined-basic" label="Name" variant="outlined" 
				onChange={onChangeName}
				value={newDisplayName}
				// maxLength={8}
			/>
			<TextField
				id="outlined-multiline-static" label="Bio" multiline rows={3} variant="outlined"
				onChange={onChangeBio}
				value={bio}
      />
      <TextField id="outlined-basic" label="Location" variant="outlined" 
				onChange={onChangeLocation}
				value={location}
			/>

			<TextField id="outlined-basic" label="Website" variant="outlined" 
				onChange={onChangeWebsite}
				value={website}
				style={{marginBottom:"0"}}
				error={(errorMessage.length != 0) ? true : false}
			/>
			{errorMessage.length != 0 && <ErrorSpan>{errorMessage}</ErrorSpan>}
    </form>
  );
}

function EditContainer({bgPhotoRef, profilePhotoRef, nameRef, bioRef, locationRef, websiteRef}) {
	const {setIsModalOpen} = useModal();
	const [errorMessage, setErrorMessage] = useState("");

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
				<SaveBTN bgPhotoRef={bgPhotoRef} profilePhotoRef={profilePhotoRef} nameRef={nameRef} bioRef={bioRef} locationRef={locationRef} websiteRef={websiteRef} errorMessage={errorMessage} />
			</EditHeader>

			<EditContent>
				<InputLabel htmlFor="bg_photo">
					<BGPhoto reference={bgPhotoRef} />
				</InputLabel>

				<div style={{display: "flex", width: "100%"}}>
					<InputLabel htmlFor="profile_photo" >
						<ProfilePhoto reference={profilePhotoRef}/>
					</InputLabel>
				</div>
				
				<TextFields nameRef={nameRef} bioRef={bioRef} locationRef={locationRef} websiteRef={websiteRef} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
			</EditContent>
		</EditDIV>
	);
}

// ===================== Parent Component ================================
export default function Profile() {
	const bgPhotoRef = useRef();
	const profilePhotoRef = useRef();
	const nameRef = useRef();
	const bioRef = useRef();
	const locationRef = useRef();
	const websiteRef = useRef();

	const {userObj} = useUser();
	const {isModalOpen} = useModal();
	const {prevBgPhotoURL, bio, location, website} = useProfile();

	return (
		<>
			<ProfileContainer>
				<Shared.Header><ProfileSpan /></Shared.Header>

				<BGContainer>
					{prevBgPhotoURL && (
						<BGImgMask>
							<BGImg src={prevBgPhotoURL} />
						</BGImgMask>
					)}
				</BGContainer>

				<ProfilePhotoContainer>
					<ProfileImgMask>
						{userObj && userObj.photoURL ? (
							<ProfileImg src={userObj.photoURL}/>
							) : (
								<FontAwesomeIcon icon={faUserCircle} size="9x" color="#C4CFD6" 
								style={{background: "white", border: "2px solid white", borderRadius: "50%", position: "relative", top: "-3px"}}/>
							)
						}
					</ProfileImgMask>
					
					<EditBTN/>
				</ProfilePhotoContainer>
				
				<InfoContainer>
					{userObj && <NameSpan>{userObj.displayName ? userObj.displayName : userObj.email.split('@')[0]}</NameSpan>}
					{userObj && <GreySpan>@{userObj.email.split('@')[0]}</GreySpan>}
					<span style={{margin:"1rem 0"}}>{bio}</span>

					<div style={{display:"flex"}}>
						{website.startsWith('http') && (
							<>
								<Link style={{color:"grey"}} />
								<WebsiteA href={website} target="_blank">{website.split('//')[1]}</WebsiteA>
							</>
						)}

						{location && (
							<>
								<LocationOn style={{marginLeft:"1rem", color:"grey"}} />
								<GreySpan>{location}</GreySpan>
							</>
						)}
					</div>
				</InfoContainer>

				<LogOutBTN />
				
			</ProfileContainer>
			{isModalOpen && (
				<>
					<Modal />
					<EditContainer bgPhotoRef={bgPhotoRef} profilePhotoRef={profilePhotoRef} nameRef={nameRef} bioRef={bioRef} locationRef={locationRef} websiteRef={websiteRef} />
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
	border-radius: 50%;
`;

const ErrorSpan = styled.span`
	color: tomato;
	font-size: 14px;
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
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 5em;
`;

const ProfileImgMask = styled(Shared.ImageMask)`
	width: 9em;
	height: 9em;
	border: 4px solid white; 
	background: #C4CFD6;

	position: relative;
	top: -2rem;
	left: 1rem;
`;

const ProfileImg = styled(Shared.ImgInMask)``;

const ShadowDIV = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	background: rgba(10,10,10,0.3);
`;

const HoverDIV = styled(Shared.HoverDIV)`
	position: absolute;
	top: 37%;
	left: 37%;

	&:hover {
		background: rgba(255,255,255,0.3);
	}
`;

const NavSpan = styled.span`
	margin-left: 1rem;
	font-weight: bold;
	font-size: 1.2rem;
`;

const InfoContainer = styled(Shared.Container)`
	padding: 1rem;
	margin-bottom: 3rem;
`;

const NameSpan = styled.span`
	font-weight: 800;
	font-size: 1.3rem;
`;

const GreySpan = styled.span`
	color: grey;
`;

const WebsiteA = styled.a`
	color: #1DA1F2;
	margin-left: 3px;

	&:hover {
		text-decoration: underline;
	}
`;

const EditButton = styled(Shared.BTNwithText)`
	background: white;
	color: #1DA1F2;
	border: 1px solid #1DA1F2;
	margin-right: 1rem;
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
	overflow-x: hidden;
	overflow-y: scroll;
	height: 100%;
	padding-bottom: 5rem;
`;

const LogOutBTNwithText = styled(Shared.BTNwithText)`
	background-color: tomato;
	width: 10rem;
`;