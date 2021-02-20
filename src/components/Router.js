import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from 'routes/Profile';
import Navigation from 'components/Navigation';
import styled from 'styled-components';
import Contact from 'routes/Contact';
import AddContact from 'routes/AddContact';

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
	return (
		<Router>
			{isLoggedIn && <Navigation userObj={userObj}/>}
			<Switch>
				{isLoggedIn ? (
					<RouteContainer>
						<Route exact path="/contact">
							<Contact />
						</Route>
						<Route exact path="/add_contact">
							<AddContact />
						</Route>
						<Route exact path="/">
							<Home userObj={userObj} />
						</Route> 
						<Route exact path="/profile">
							<Profile refreshUser={refreshUser} userObj={userObj}/>
						</Route> 
					</RouteContainer>
						) : (
						<>
							<Route exact path="/"> 
								<Auth /> 
							</Route>
						</>
					)
				}
			</Switch>
		</Router>
	);
}

//====== Styled Components =====
const RouteContainer = styled.div`
	max-width: 890;
	width: 100%;
	margin: 0 auto;
	margin-top: 80;
	display: flex;
	justify-content: center;
`;

export default AppRouter;