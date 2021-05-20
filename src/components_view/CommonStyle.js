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
    height: 57px;
    border: 1px solid #EBEEF0;
    border-top: none;
    position: fixed;
    top: 0;
    background: white;
    z-index: 1;

`,

  InputForm : styled.form`
    display: flex;
    flex: 1;
    align-items: center;
    padding: 0.5rem 1rem;
    background: pink;
`,

  InputTextArea : styled.textarea`
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

	InputText : styled.input`
	  /* flex-grow: 1; */
		min-height: 40px;
		padding: 0px 20px;
		color: black;
		border: 1px solid #1DA1F2;
		border-radius: 20px;
		font-size: 1rem;
    width: 100%;
	`,

  ImageMask : styled.div`
    display: flex;
    justify-content: center;
    width: 68px;
    height: 68px;
    overflow: hidden;
    border-radius: 50%;
		margin-right: 0.7rem;
  `,

  ImgInMask : styled.img`
    width: auto;
    height: auto;
  `,

	BTNwithText : styled.button`
	  color: white;
		background-color: #1DA1F2;
		padding: 0.6rem 1rem;
		border-radius: 1.5rem;
		font-weight: bold;
	`,

	Arrow : styled.input`
		position: absolute;
		right: 0;
		background-color: #1DA1F2;
		height: 40px;
		width: 40px;
		padding: 10px 0px;
		text-align: center;
		border-radius: 20px;
		color: white;
		cursor: pointer;
`,

  HoverDIV : styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 50%;
    transition: all 200ms ease-in-out;
    padding: 0.5rem;
    width: 38px;
    height: 38px;

    &:hover {
      background: #E8F5FE;
    }
`,

// ============


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
    background-color: #1DA1F2;
    width: 13rem;
  `,

  CancelButton : styled.span`
    ${FormButton}
    background-color: tomato;
    width: 13rem;
  `
  
} 
