import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import styled from 'styled-components';
import { AccountCircleOutlined, BookmarkBorderOutlined, HomeOutlined, MailOutlined, MoreHoriz, NotificationsOutlined, PersonAddOutlined, Subject } from '@material-ui/icons';

export default function Navigation() {
  const [isActive, setIsActive] = useState(new Array(8).fill(false)); // there're 8 navigation items

  // whewn click navigate item, switch it to activated
  const switchActive = (index) => {
    isActive.fill(false); // close activation of all items
    isActive[index] = true; // open activation of a clicked item
    setIsActive([...isActive]); // set active state of all items
  }

  return (
    <Navbar>
      <LinkBox to="/">
        <HoverDIV> 
          <FontAwesomeIcon icon={faTwitter} color={"#1DA1F2"} size="2x" />
        </HoverDIV>
      </LinkBox>

      <LinkBox to="/" onClick={() => switchActive(0)}>
        <HoverDIV isActive={isActive[0]}>
          <div><HomeOutlined fontSize="large" /></div>
          <NavSpan>Home</NavSpan>
        </HoverDIV>
      </LinkBox>

      <LinkBox to="/contact" onClick={() =>switchActive(1)}>
        <HoverDIV isActive={isActive[1]}>
          <div style={{ display: "flex", alignItems: "center", width:"35px", height: "35px"}}>
            <MailOutlined style={{ fontSize: 30, marginLeft: "3px"}} />
          </div>
          <NavSpan>Messages</NavSpan>
        </HoverDIV>
      </LinkBox>

      <LinkBox to="/add_contact" onClick={() =>switchActive(2)}>
        <HoverDIV isActive={isActive[2]}>
          <div><PersonAddOutlined fontSize="large" /></div>
          <NavSpan>Add Friends</NavSpan>
        </HoverDIV>
      </LinkBox>
      
      <LinkBox to="/profile" onClick={() =>switchActive(3)}>
        <HoverDIV isActive={isActive[3]}>
          <div><AccountCircleOutlined fontSize="large" /></div>
          <NavSpan>Profile</NavSpan>
        </HoverDIV>
      </LinkBox>

      <LinkBox to="/notification" onClick={() =>switchActive(4)}>
        <HoverDIV isActive={isActive[4]}>
          <div><NotificationsOutlined fontSize="large" /></div>
          <NavSpan>Notifications</NavSpan>
        </HoverDIV>
      </LinkBox>

      <LinkBox to="" onClick={() =>switchActive(5)}>
        <HoverDIV isActive={isActive[5]}>
          <div><BookmarkBorderOutlined fontSize="large" /></div>
          <NavSpan>Bookmarks</NavSpan>
        </HoverDIV>
      </LinkBox>

      <LinkBox to="" onClick={() =>switchActive(6)}>
        <HoverDIV isActive={isActive[6]}>
          <div><Subject fontSize="large" /></div>
          <NavSpan>Lists</NavSpan>
        </HoverDIV>
      </LinkBox>

      <LinkBox to="" onClick={() =>switchActive(7)}>
        <HoverDIV isActive={isActive[7]}>
          <div><MoreHoriz fontSize="large" /></div>
          <NavSpan>More</NavSpan>
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
  position: fixed;
  z-index: 1;
`;

const HoverDIV = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 2rem;
  color: ${props => props.isActive ? "#1DA1F2" : "none"};
  transition: all 200ms ease-in-out;
`;

const LinkBox = styled(Link)`
  display: flex; 
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 0.3rem 1rem;

  &:hover ${HoverDIV} {
    background: #E8F5FE;
    color: #1DA1F2;
  }

  &:hover ${HoverDIV} > div {
    transform: rotate(-10deg);
  }
`;

const NavSpan = styled.span`
  margin-left: 1rem;
  font-weight: bold;
  font-size: 1.2rem;
  padding-right: 1.5rem;
`;
