import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import styled from 'styled-components'
import { Shared } from 'components_view/CommonStyle';
import { useState } from 'react';
import { useUser } from 'components_controll/ProvideAuth';

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewAccount, setIsNewAccount] = useState(true);
  const [error, setError] = useState("");
  const {signUp, logIn} = useUser(); // get functions from ProvideAuth

  // When Input of form has changed
  const onChange = (event) => {
    const {target: {name, value}} = event;
    if(name === "email") {
      setEmail(value);
    }
    else if(name === "password") {
      setPassword(value);
    }
  };

  const onSubmitClick = async (event) => {
    try {
      if(isNewAccount) {
        // new user, create new account
        await signUp(email, password);
      }
      else {
        // old user, log in
        await logIn("email", email, password);
      }
    }
    catch(error) {
      // authService provides error message
      setError(error.message);
    }
  };

  // toggle account from new to exist.
  const toggleAuth = () => setIsNewAccount(prev => !prev);

  // get type of social login then pass it to logIn method
  const onSocialClick = async (event) => {
    const {target:{ name:type }} = event;
    logIn(type);
  };

  return(
    <AuthContainer>
      <FontAwesomeIcon icon={faTwitter} color={"#1DA1F2"} size="3x" style={{ margin:30 }} />
      <AuthInput 
        type="email" placeholder="Email" 
        name="email" required 
        value={email} onChange={onChange} 
      />
      <AuthInput 
        type="password" placeholder="Password" 
        name="password" required 
        value={password} onChange={onChange}
      />
      <AuthSubmit 
        type="submit" onClick={onSubmitClick} 
        value={isNewAccount ? "Create Account" : "Sign In"} 
      />
      {error && <AuthError>{error}</AuthError>}

      {/* switch between log in, sign up */}
      <AuthSwitch onClick={toggleAuth}>
      {isNewAccount ? "Sign In" : "Create Account"}
      </AuthSwitch>

      {/* social login */}
      <Buttons>
        <Button onClick={onSocialClick} name="google">
          Log In with Google <FontAwesomeIcon icon={faGoogle} />
        </Button>
        <Button onClick={onSocialClick} name="github">
          Log In with Github <FontAwesomeIcon icon={faGithub} />
        </Button>
      </Buttons>
    </AuthContainer>
  );
}


//============= Styled Components =============
const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
	align-items: center;
  width: 21rem;
`;

const AuthInput = styled(Shared.InputText)`
  margin-bottom: 10px;
`;

const AuthSubmit = styled(AuthInput)`
	text-align: center;
  background: #1DA1F2;
  color: white;
  cursor: pointer;
  font-weight: bold;
`;


const AuthSwitch = styled.span`
  color: #1DA1F2;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 50px;
  display: block;
  font-size: 12px;
  font-weight: bold;
  text-decoration: underline;
`;

const AuthError = styled.span`
 	color: tomato;
  text-align: center;
  font-weight: 500;
  font-size: 12px;
`;

const Buttons = styled.div`
	display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
`;

const Button = styled(Shared.BTNwithText)`
  color: #1DA1F2;
  background: white;
  border: 1px solid #1DA1F2;
  padding: 10px 1rem;
  font-size: 12px;
`;