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


export default function AppRouter() {
  const {isInit, isUserLogin} = useInit();
  const {isChatting} = useChat();

  return (
    <div>
      {isInit ? (
        <HashRouter>
          {isUserLogin ? (
            <div style={{display: "flex", flexDirection: "row"}}>
              <Navigation />
              <Switch>
                <RouteContainer>
                  <Route exact path="/"> <Home /> </Route>
                  <Route exact path="/contact"> <Contact /> </Route>
                  <Route exact path="/add_contact"> <AddContact /> </Route>
                  <Route exact path="/profile"> <Profile /> </Route>
                </RouteContainer>
              </Switch>
              {isChatting && <ChatBox />}
              <RightAside />
            </div>
          ) : (
            <Route exact path="/"> <LogIn /> </Route>
          )}
        </HashRouter>
      ) : (
        <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="4x" style={{marginTop: "20rem"}}/>
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


