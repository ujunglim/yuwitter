import { authService } from 'fbase';
import React, { useState } from "react";
import styled from 'styled-components';
import { Shared } from './CommonStyle';

const AuthForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newAccount, setNewAccount] = useState(true);
	const [error, setError] = useState("");

	const onChange = (event) => {
		const {target: {name, value}} = event;
		if(name === "email") {
			setEmail(value);
		}
		else if(name === "password") {
			setPassword(value);
		}
	}
	const onSubmit = async(event) => {
		event.preventDefault();
		let data;
		try {
			if(newAccount) {
				// create new account
				data = await authService.createUserWithEmailAndPassword(email, password);
			}
			else {
				// log in
				data = await authService.signInWithEmailAndPassword(email, password);
			}
			console.log(data);
		}
		catch(error) {
			console.log(error.meassage);
			setError(error.message);
		}
	};

	const toggleAccount = () => setNewAccount(prev => !prev);
  return (
		<>
			<Shared.Container>
				<form onSubmit={onSubmit}>
					<AuthInput 
						name="email"
						type="email" 
						placeholder="Email"
						required
						value={email}
						onChange={onChange}
					/>
					<AuthInput 
						name="password"
						type="password" 
						placeholder="Password"
						required
						value={password}
						onChange={onChange}
					/>
					<AuthSubmit type="submit" value={newAccount ? "Create Account" : "Sign In"} />
					{error && <AuthError>{error}</AuthError>}
				</form>
			</Shared.Container>
			<AuthSwitch onClick={toggleAccount}>
				{newAccount ? "Sign In" : "Create Account"}
			</AuthSwitch>
		</>
	);
}

//============= Styled Components =============
const AuthInput = styled.input`
  max-width: 320px;
  width: 100%;
  padding: 10px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 1);
  margin-bottom: 10px;
  font-size: 12px;
  color: black;
`;

const AuthSubmit = styled(AuthInput)`
	text-align: center;
  background: #04aaff;
  color: white;
  margin-top: 10;
  cursor: pointer;
`;

const AuthError = styled.span`
 	color: tomato;
  text-align: center;
  font-weight: 500;
  font-size: 12px;
`;

const AuthSwitch = styled.span`
  color: #04aaff;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 50px;
  display: block;
  font-size: 12px;
  text-decoration: underline;
}
`;

export default AuthForm;