const { createContext, useContext, useState, useEffect } = require('react');

const modalContext = createContext();

export default function ProvideModal({children}) {
  const [isModalOpen, setIsModalOpen] = useState(false);


  // useEffect(() => {
  //   if(!isModalOpen) {
  //     document.body.style.overflow = 'scroll';
  //   }
  //   else {
  //     // document.body.style.overflow = 'hidden';
  //     document.body.style.overflow = 'scroll';
  //   }
  
  // },[isModalOpen]);

  const contextValue = {isModalOpen, setIsModalOpen};

  return (
    <modalContext.Provider value={contextValue}>
      {children}
    </modalContext.Provider>
  );
}

//======== hook ==========
/**
 * @description
 * @returns {{isModalOpen:boolean, setIsModalOpen:function}}
 */
 export const useModal = () => {
  const modal = useContext(modalContext);
  return modal;
}