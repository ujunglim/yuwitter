import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faAddressBook, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';
import { faEnvelope, faUserCircle } from '@fortawesome/free-regular-svg-icons';

export default function Navigation() {
	
	return (
		<Navbar>
			<LinkBox to="/">
				<FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
				<NavSpan>Home</NavSpan>
			</LinkBox>

			<LinkBox to="/contact">
				<FontAwesomeIcon icon={faEnvelope} size="2x" />
				<NavSpan>Messages</NavSpan>
			</LinkBox>

			<LinkBox to="/add_contact">
				<FontAwesomeIcon icon={faUserPlus} size="2x" />
				<NavSpan>Add Friends</NavSpan>
			</LinkBox>
			
			<LinkBox to="/profile">
				<FontAwesomeIcon icon={faUserCircle} size="2x" />
				<NavSpan>Profile</NavSpan>
			</LinkBox>
		</Navbar>
	);
}

//=================== Styled Components ==================
const Navbar = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 15rem;
	position: fixed;
`;

const LinkBox = styled(Link)`
	display: flex; 
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	padding: 1rem;

	&:hover{
		color: #04AAFF;
	}
`;

const NavSpan = styled.span`
	margin-left: 1rem;
	font-weight: bold;
	font-size: 1.2rem;
`;
