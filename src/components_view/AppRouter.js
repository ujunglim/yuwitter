import { HashRouter, Route, Switch } from "react-router-dom";
import { useInit } from 'components_controll/ProvideAuth';
import Contact from 'routes/Contact';
import Home from 'routes/Home';
import LogIn from 'routes/LogIn';
import Profile from 'routes/Profile';
import Navigation from 'components_view/Navigation.js';
import styled from 'styled-components';
import AddContact from 'routes/AddContact';
import ChatBox from './ChatBox';
import { useChat } from 'components_controll/ProvideChat';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RightAside from './RightAside';
import Notification from 'routes/Notification';

export default function AppRouter() {
  const {isInit, isUserLogin} = useInit();
  const {isChatting} = useChat();

  return (
    <div>
      {/*  app initializing has been finished  */}
      {isInit ? (
        <HashRouter>
          {isUserLogin ? (
            //user logged in
            <div style={{display: "flex", flexDirection: "row"}}>              
              <Navigation />
              <Switch>
                <RouteContainer>
                  <Route exact path="/"> <Home /> </Route>
                  <Route exact path="/contact"> <Contact /> </Route>
                  <Route exact path="/add_contact"> <AddContact /> </Route>
                  <Route exact path="/profile"> <Profile /> </Route>
                  <Route exact path="/notification"> <Notification /> </Route>
                </RouteContainer>
              </Switch>
              {isChatting && <ChatBox />} {/*  If user is chatting, ChatBox appears  */}
              <RightAside />
            </div>
          ) : (
            // no user logged in
            <Route exact path="/"> <LogIn /> </Route>
          )}
        </HashRouter>
      ) : (
        // show loading page when app is initializing
        <FontAwesomeIcon icon={faTwitter} color={"#1DA1F2"} size="4x" style={{marginTop: "20rem"}}/>
      )}
    </div>
  );
}

// ================ Styled Components ==============
const RouteContainer = styled.div`
  border-left: 1px solid #EBEEF0;
  border-right: 1px solid #EBEEF0;
  
  position: relative;
  width: 600px;
  margin-left: 16rem;
  margin-top: 3.5rem;
`;