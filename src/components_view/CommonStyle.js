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
		max-width: 18rem;
		overflow-y: overlay;
		height: 25rem; 

		/* custom webkit scrollbar */
		::-webkit-scrollbar {
			display: none;
			width: 0.8rem;
		}
		::-webkit-scrollbar-track {
			/* background-color: rgba(255, 255, 255, 0.671);  #ffffff4f */
			/* border-radius: 10px; */
			margin: 1rem 0;
			/* background-color: red; */
		}
		::-webkit-scrollbar-thumb {
			background-color: lightgrey;
			border-radius: 10px;
		}
		:hover::-webkit-scrollbar { display: initial; }
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

	FormSumbit : styled.input`
		${FormButton}
		background-color: #04aaff;
	`,

	CancelButton : styled.span`
		${FormButton}
		background-color: tomato;
		margin-top: 0px;
	`
	
} 
