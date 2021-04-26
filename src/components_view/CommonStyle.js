import styled, { css } from 'styled-components';

const FormButton = css`
	cursor: pointer;
	width: 100%;
	padding: 7px 20px;
	text-align: center;
	color: white;
	border-radius: 20px;
	
	margin-top: 15px;
	margin-bottom: 5px;
`;

export const Shared = {
	Container : styled.div`
		display: flex;
		flex-direction: column;
		width: 100%;
`,

	Header : styled.div`
	font-weight: bold;
	font-size: large;
	padding: 1rem;
	width: 100%
`,

	InputForm : styled.form`
		display: flex;
		flex: 1;
		align-items: center;
		padding: 0 1rem 0.5rem 1rem;
		padding-top: 0.5rem;
`,

	ProfilePhoto : styled.img`
		width: 3rem;
		height: 3rem;
		margin-right: 1rem;
		border-radius: 1.5rem;
`,

	FormInput : styled.input`
	  width: 100%;
		padding: 10px 20px;
		border-radius: 20px;
		border: 1px solid black;
		text-align: center;
		background-color: white;
		color: black;
	`,

	FormSubmit : styled.input`
		${FormButton}
		background-color: #04aaff;
	`,

	CancelButton : styled.span`
		${FormButton}
		background-color: tomato;
		margin-top: 0px;
	`
	
} 
