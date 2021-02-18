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
		max-width: 320px;
		/* background-color: pink; */
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
	`,

	// css:{
	// 	flex_col_center: css`
	// 		display: flex;
  // 		flex-direction: column;
	// 		align-items: center;
	// 	`,
		
	// 	flex_row_center: css`
	// 		display: flex;
  // 		flex-direction: row;
	// 		justify-content: center;
	// 	`,
	// }

} 
