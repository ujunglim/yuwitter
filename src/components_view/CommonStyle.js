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

  Header : styled.header`
    font-weight: bold;
    font-size: large;
    padding: 1rem;
    width: 600px;
    border: 1px solid #EBEEF0;
    border-top: none;
    position: fixed;
    background: white;
    left: 25rem;
    z-index: 1;
`,

  InputText : styled.textarea`
    background: none;
    resize: none;
    border: none;
    outline: none;
    height: 3rem;
    display: block;
    overflow: hidden;
    box-sizing: padding-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: large;
  `,

	ProfilePhoto : styled.img`
		width: 3rem;
		height: 3rem;
		margin-right: 1rem;
		border-radius: 1.5rem;
`,

	BTNwithText : styled.button`
	 color: white;
		background-color: #04aaff;
		padding: 0.6rem 1rem;
		border-radius: 1.5rem;
		font-weight: bold;
	`,
// ============

  InputForm : styled.form`
    display: flex;
    flex: 1;
    align-items: center;
    padding: 0 1rem 0.5rem 1rem;
    padding-top: 0.5rem;
`,



  FormInput : styled.input`
    /* width: 100%; */
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
    width: 13rem;
  `,

  CancelButton : styled.span`
    ${FormButton}
    background-color: tomato;
    width: 13rem;
  `
  
} 
