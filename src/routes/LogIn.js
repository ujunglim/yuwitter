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
  const {signUp, logIn} = useUser();

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
    // create account or signin
    try {
      if(isNewAccount) {
        signUp(email, password);
      }
      else {
        logIn("email", email, password);
      }
    }
    catch(error) {
      setError(error.message);
    }
  };

  const toggleAuth = () => setIsNewAccount(prev => !prev);

  const onSocialClick = async (event) => {
    const {target:{ name:type }} = event;
    logIn(type);
  };

  return(
    <AuthContainer>
      <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="3x" style={{ margin:30 }} />
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

      <AuthSwitch onClick={toggleAuth}>
      {isNewAccount ? "Sign In" : "Create Account"}
      </AuthSwitch>

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
  background: #04aaff;
  color: white;
  cursor: pointer;
`;


const AuthSwitch = styled.span`
  color: #04aaff;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 50px;
  display: block;
  font-size: 12px;
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
  color: #04aaff;
  background: white;
  border: 1px solid #04aaff;
  padding: 10px 1rem;
  font-size: 12px;
`;