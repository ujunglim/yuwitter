import React, { useEffect, useState } from "react";
import AppRouter from "components/AppRouter";
import { authService } from "fbase";
import styled, { createGlobalStyle } from 'styled-components';

function App() {
  const [init, setInit] = useState(false); // not initialized yet
  const [userObj, setUserObj] = useState(null);

 useEffect(() => {
   authService.onAuthStateChanged((user) => {
      if(user) {
        const obj = {
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL || user.providerData[0].photoURL,
          updateProfile: (args) => user.updateProfile(args)
        };
        setUserObj(obj);
      }
      else {
        setUserObj(null);
      }
      // when app is ready to start
      setInit(true);
    }
   );

 }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      updateProfile: (args) => user.updateProfile(args)
    });
  };

  return (
    <AppContainer>
      <GlobalStyle />
      {init ? 
        <AppRouter 
          refreshUser={refreshUser}
          isLoggedIn={ Boolean(userObj) } 
          userObj={userObj} 
        />
         : <Paragraph>Initializing...</Paragraph>}
      <Footer>&copy; Yuwitter {new Date().getFullYear()}</Footer>
    </AppContainer>
  );
}

// ================ Styled Components ==============
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    ${'' /* padding: 0;
    margin: 0; */}
  }

  body {
    background-color: #051e34;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 14px;
    color: white;
    display: flex;
    justify-content: center;
  }
  
  form {
    width: 100%;
  }

  input {
    all: unset;
    box-sizing: border-box;
    appearance: none;
  }

  button {
    background-color: white;
    color: black;
    border: none;
    outline: none;
    cursor: pointer;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
   
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  border: 3px solid white;
  border-radius: 30px;
  margin: 50px 0 50px 0;
  background-color: #122c44;
`;

const Paragraph = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Footer = styled.footer`
 
  height: 30px;
  text-align: center;
  margin-top: 3rem;
  margin-bottom: 1rem;
`;

export default App;
