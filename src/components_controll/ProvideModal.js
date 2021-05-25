import { createContext, useContext, useState } from "react";

const modalContext = createContext();

export default function ProvideModal({children}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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