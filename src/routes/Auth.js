import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { authService, firebaseInstance } from 'fbase';
import AuthForm from 'components/AuthForm';
import styled from 'styled-components'
import { Shared } from 'components/CommonStyle';

const Auth = () => {
	const onSocialClick = async (event) => {
		const {target:{ name }} = event;
		let provider;
		// create provider
		if(name === "google") {
			provider = new firebaseInstance.auth.GoogleAuthProvider();
		}
		else if(name === "github") {
			provider = new firebaseInstance.auth.GithubAuthProvider();
		}
		// Sign in with popup
		await authService.signInWithPopup(provider);
	}
	
	return (
		<AuthContainer>
			<FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
			<AuthForm />
			<Buttons>
        <Button onClick={onSocialClick} name="google">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
				</Button>
				<Button onClick={onSocialClick} name="github">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
				</Button>
			</Buttons>
		</AuthContainer>
	);
}

//=========== Styled Components ================
const AuthContainer = styled(Shared.Container)`
	max-width: none;
	height: 100vh;
  justify-content: center;
	align-items: center;
`;

const Buttons = styled.div`
	display: flex;
  justify-content: space-between;
  width: 100%;
	max-width: 320px;
`;

const Button = styled.button`
  cursor: pointer;
  border-radius: 20px;
  border: none;
  padding: 10px 0px;
  font-size: 12px;
  text-align: center;
  width: 150px;
  background: white;
  cursor: pointer;
`;

export default Auth;