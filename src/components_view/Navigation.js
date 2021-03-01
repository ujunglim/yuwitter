import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faAddressBook, faUser, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from 'components_controll/ProvideAuth';

export default function Navigation() {
	const {userObj} = useAuth();
	return (
		<nav style={{marginBottom: "3rem"}}>
			<ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
				<li>
					<Link to="/Contact">
						<FontAwesomeIcon icon={faAddressBook} color={"white"} size="2x" />
					</Link>
				</li>
				<li>
					<Link to="/" style={{ marginRight: 10 }}>
						<FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
					</Link>
				</li>
				<li>
					<Link 
						to="/profile"
						style={{
							marginLeft: 10,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							fontSize: 12,
          	}}
					>
						<FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
						<span style={{ marginTop: 10 }}>
							{userObj && userObj.displayName
								? `${userObj.displayName}'s Profile`
								: "My Profile"}
						</span>
					</Link>
				</li>
			</ul>	
		</nav>
	);
}