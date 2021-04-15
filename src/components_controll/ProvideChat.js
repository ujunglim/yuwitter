import { createContext, useContext, useState } from 'react';
import { dbService } from './fbase';

// create context object
const chatContext = createContext();

export default function ProvideChat({children}) {
  const [isChatting, setIsChatting] = useState(true);
  const [chats, setChats] = useState([]);


  const chatArray = [];

  // =================== Chat Functions =======================
  const sendChat = async (text) => {
    chatArray.push(text);
    // setChats(chatArray);

    console.log(chatArray)

    const myUID = "Efbdfw5alhgecsIy5fRKa488A9j2";
    const targetEmail = "ken@gmail.com";

    const userCollection = dbService.collection("users");
    const targetRef = userCollection.doc(targetEmail);

    
    const sendChatData = {
      [`contact.${myUID}`] : {
        reference : "/users/aron@gmail.com",
        state : 2,
        chats: chatArray
      }
    }


    // targetRef.update(sendChatData);

  }


  // context value
  const contextValue = {isChatting, setIsChatting, sendChat};
  return(
    <chatContext.Provider value={contextValue}>
      {children}
    </chatContext.Provider>
  );
}


// ================== create context hook ===================
/**
 * @description
 * @return {{isChatting: boolean, setIsChatting: function, sendChat: function}}
 */
export const useChat = () => {
  const chat = useContext(chatContext);
  return chat;
}