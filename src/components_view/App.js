import AppRouter from "components_view/AppRouter";
import ProvideAuth  from 'components_controll/ProvideAuth';
import styled, { createGlobalStyle } from 'styled-components';
import ProvideYuweets from 'components_controll/ProvideYuweets';
import ProvideContact from 'components_controll/ProvideContact';

import { ThemeProvider } from '@material-ui/core';
import theme from './theme.js'

export default function App() {
  return (
    <AppContainer>
      <GlobalStyle />
      <ProvideAuth>
        <ProvideYuweets>
        <ProvideContact>

        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>

        </ProvideContact>
        </ProvideYuweets>
      </ProvideAuth>
      <Footer>&copy; Yuwitter {new Date().getFullYear()}</Footer>
    </AppContainer>
  );
}

// ================ Styled Components ==============
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  border: 3px solid white;
  border-radius: 30px;
  margin-top: 2rem;
  background-color: #122c44;
`;

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    background-color: #051e34;
    font-family: "Arial";
    font-size: 14px;
    color: white;
    display: flex;
    justify-content: center;
    user-select: none;
  }

  img {
    user-drag: none; 
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    pointer-events: none;
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

const Footer = styled.footer`
 
  height: 30px;
  text-align: center;
  margin-top: 3rem;
  margin-bottom: 1rem;
`;

