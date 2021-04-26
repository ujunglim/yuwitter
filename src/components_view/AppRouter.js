import { HashRouter, Route, Switch } from "react-router-dom";
import { useInit, useUser } from 'components_controll/ProvideAuth';
import Contact from 'routes/Contact';
import Home from 'routes/Home';
import LogIn from 'routes/LogIn';
import Profile from 'routes/Profile';
import Navigation from 'components_view/Navigation.js';
import styled from 'styled-components';
import AddContact from 'routes/AddContact';
import ChatBox from './ChatBox';
import { useChat } from 'components_controll/ProvideChat';


export default function AppRouter() {
  const {isInit, isUserLogin} = useInit();
  const {isChatting} = useChat();

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
                  <Route exact path="/contact"> <Contact /> </Route>
                  <Route exact path="/add_contact"> <AddContact /> </Route>
                </RouteContainer>
              </Switch>
              {isChatting && <ChatBox />}
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
	width: 65%;
	margin: 0 auto;
	margin-top: 80;
	display: flex;
	justify-content: center;

  background: pink;
  
`;

const Paragraph = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;


