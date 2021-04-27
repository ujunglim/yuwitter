import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faAddressBook, faUser } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';

export default function Navigation() {
	
	return (
		<Navbar>
			<LinkBox to="/">
				<FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
				<NavSpan>Home</NavSpan>
			</LinkBox>

			<LinkBox to="/contact">
				<FontAwesomeIcon icon={faAddressBook} color={"#04AAFF"} size="2x" />
				<NavSpan>Contact</NavSpan>
			</LinkBox>
			
			<LinkBox to="/profile">
				<FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
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
`;

const NavSpan = styled.span`
	margin-left: 1rem;
	font-weight: bold;
	font-size: 1.2rem;
`;
