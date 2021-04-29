import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faAddressBook, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';
import { faEnvelope, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { AccountCircleOutlined, EmailOutlined, Home, HomeOutlined, MailOutlined, Person, PersonAddOutlined, PersonOutlineOutlined } from '@material-ui/icons';

export default function Navigation() {
	
	return (
		<Navbar>
			<LinkBox to="/">
				<HoverDIV>
					<FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
				</HoverDIV>
			</LinkBox>

			<LinkBox to="/">
				<HoverDIV>
					<HomeOutlined fontSize="large" />
					<NavSpan>Home</NavSpan>
				</HoverDIV>
			</LinkBox>

			<LinkBox to="/contact">
				<HoverDIV>
					<div style={{ display: "flex", alignItems: "center", width:"35px", height: "35px"}}>
						<MailOutlined style={{ fontSize: 30, marginLeft: "3px"}} />
					</div>
					<NavSpan>Messages</NavSpan>
				</HoverDIV>
			</LinkBox>

			<LinkBox to="/add_contact">
				<HoverDIV>
					<PersonAddOutlined fontSize="large"  />
					<NavSpan>Add Friends</NavSpan>
				</HoverDIV>
			</LinkBox>
			
			<LinkBox to="/profile">
				<HoverDIV>
					<AccountCircleOutlined fontSize="large" />
					<NavSpan>Profile</NavSpan>
				</HoverDIV>
			</LinkBox>

		</Navbar>
	);
}

//=================== Styled Components ==================
const Navbar = styled.nav`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 16rem;
	background: yellow;
	position: fixed;
	z-index: 1;
`;

const HoverDIV = styled.div`
	display: flex;
	align-items: center;
	padding: 0.5rem;
	border-radius: 2rem;
`;

const LinkBox = styled(Link)`
	display: flex; 
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	padding: 0.3rem 1rem;
  transition: all 200ms ease-in-out;

	&:hover ${HoverDIV}{
		background: #E8F5FE;
		color: #04AAFF;
	}
`;

const NavSpan = styled.span`
	margin-left: 1rem;
	font-weight: bold;
	font-size: 1.2rem;
	padding-right: 1.5rem;

`;
