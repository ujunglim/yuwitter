import React, { useEffect } from "react";
import styled from 'styled-components';


export default function Modal() {

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'scroll';
    }
  }, []);

  return (
    <ModalDIV></ModalDIV>
  );
}

const ModalDIV = styled.div`
	width: 100%;
	height: 100%;
	background: rgba(100, 100, 100, 0.3);

  position: fixed;
  top: 0;
  left: 0;

  z-index: 3;
`;