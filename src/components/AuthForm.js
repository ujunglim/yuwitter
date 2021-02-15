import { authService } from 'fbase';
import React, { useState } from "react";

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
    	<form onSubmit={onSubmit} className="container">
				<input 
					className="authInput"
					name="email"
					type="email" 
					placeholder="Email"
					required
					value={email}
					onChange={onChange}
				/>
				<input 
					className="authInput"
					name="password"
					type="password" 
					placeholder="Password"
					required
					value={password}
					onChange={onChange}
				/>
				<input className="authInput authSubmit" type="submit" value={newAccount ? "Create Account" : "Sign In"} />
				{error && <span className="authError">{error}</span>}
			</form>
			<span className="authSwitch" onClick={toggleAccount}>
				{newAccount ? "Sign In" : "Create Account"}
			</span>
		</>
  );
}

export default AuthForm;