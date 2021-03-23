import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faAddressBook, faUser } from "@fortawesome/free-solid-svg-icons";
import { useUser } from 'components_controll/ProvideAuth';
import styled from 'styled-components';

// ================ Children Component ==================
// isolate userObj state
function ProfileSpan() {
	const {userObj} = useUser();

	return (
		<Span>
			{userObj && userObj.displayName
				? `${userObj.displayName}'s Profile`
				: "My Profile"}
		</Span>
	);
}

// =================== Parent Component ====================
export default function Navigation() {
	
	return (
		<Navbar>
			<LinkDiv>
				<Link to="/contact" >
					<FontAwesomeIcon icon={faAddressBook} color={"white"} size="2x" />
				</Link>
			</LinkDiv>
			
			<LinkDiv>
				<Link to="/">
					<FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
				</Link>
			</LinkDiv>

			<LinkDiv>
				<LinkWithSpan to="/profile">
					<FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
					<ProfileSpan />
				</LinkWithSpan>
			</LinkDiv>
		</Navbar>
	);
}

//=================== Styled Components ==================
const Navbar = styled.div`
	display: flex;
	flex-direction: row;
	margin: 3rem 0;
	justify-content: center;
`;

const LinkDiv = styled.div`
	display: flex; 
	justify-content: center;
	width: 70px;
`;

const LinkWithSpan = styled(Link)`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Span = styled.span`
	margin-top: 0.3rem;
	text-align: center;
	font-size: 0.8rem;
`;