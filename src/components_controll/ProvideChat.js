import { createContext, useContext, useState } from 'react';

// create context object
const chatContext = createContext();

export default function ProvideChat({children}) {
  const [isChatting, setIsChatting] = useState(true);

  // context value
  const contextValue = {isChatting, setIsChatting};
  return(
    <chatContext.Provider value={contextValue}>
      {children}
    </chatContext.Provider>
  );
}


// ================== create context hook ===================
/**
 * @description
 * @return {{isChatting: boolean, setIsChatting: function}}
 */
export const useChat = () => {
  const chat = useContext(chatContext);
  return chat;
}