import AppRouter from "components_view/AppRouter";
import ProvideAuth  from 'components_controll/ProvideAuth';
import styled, { createGlobalStyle } from 'styled-components';
import ProvideYuweets from 'components_controll/ProvideYuweets';
import ProvideContact from 'components_controll/ProvideContact';

import { ThemeProvider } from '@material-ui/core';
import theme from './theme.js'
import ProvideChat from 'components_controll/ProvideChat.js';

export default function App() {
  return (
    <AppContainer>
      <GlobalStyle />
      <ProvideAuth>
        <ProvideYuweets>
        <ProvideContact>

        <ProvideChat>
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
        </ProvideChat>


        </ProvideContact>
        </ProvideYuweets>
      </ProvideAuth>
      {/* <Footer>&copy; Yuwitter {new Date().getFullYear()}</Footer> */}
    
    </AppContainer>
  );
}

// ================ Styled Components ==============
const AppContainer = styled.div`
  display: flex;
	background: beige;
`;

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    background: grey;
    padding: 0 9rem;
    user-select: none;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 1rem;
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
  
  ${'' /* form {
    width: 100%;
  } */}

  input {
    all: unset;
    box-sizing: border-box;
    appearance: none;
  }

  button {
    color: white;
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

