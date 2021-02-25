import AppRouter from "components/AppRouter";
import { ProvideAuth } from 'routes/Auth';
import styled, { createGlobalStyle } from 'styled-components';

function App() {
  return (
    <AppContainer>
      <GlobalStyle />
      <ProvideAuth>

        <AppRouter />
        
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
  margin: 50px 0 50px 0;
  background-color: #122c44;
`;

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

const Footer = styled.footer`
 
  height: 30px;
  text-align: center;
  margin-top: 3rem;
  margin-bottom: 1rem;
`;

export default App;
