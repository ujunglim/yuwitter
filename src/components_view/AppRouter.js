import { HashRouter, Route, Switch } from "react-router-dom";
import { useInit } from 'components_controll/ProvideAuth';
import Contacts from 'routes/Contacts';
import Home from 'routes/Home';
import LogIn from 'routes/LogIn';
import Profile from 'routes/Profile';
import Navigation from 'components_view/Navigation.js';
import styled from 'styled-components';
import AddContacts from 'routes/AddContacts';


export default function AppRouter() {
  const {isInit, isUserLogin} = useInit();
  
  return (
    <>
      {isInit ? (
        <HashRouter>
          {isUserLogin ? (
            <>
              <Navigation />
              <Switch>
                <RouteContainer>
                  <Route exact path="/"> <Home /> </Route>
                  <Route exact path="/profile"> <Profile /> </Route>
                  <Route exact path="/contacts"> <Contacts /> </Route>
                  <Route exact path="/add_contacts"> <AddContacts /> </Route>
                </RouteContainer>
              </Switch>
            </>
          ) : (
            <Route exact path="/"> <LogIn /> </Route>
          )}
        </HashRouter>
      ) : (
        <Paragraph>Initializing...</Paragraph>
      )}
    </>
  );
}

// ================ Styled Components ==============
const RouteContainer = styled.div`
	max-width: 890;
	width: 100%;
	margin: 0 auto;
	margin-top: 80;
	display: flex;
	justify-content: center;
`;


const Paragraph = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;


