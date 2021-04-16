import { CONTACT } from 'constants.js';
import { createContext, useContext, useState } from 'react';
import { dbService } from './fbase';
import { useUser } from './ProvideAuth';

// create context object
const chatContext = createContext();

export default function ProvideChat({children}) {
  const [isChatting, setIsChatting] = useState(true);
  const [chats, setChats] = useState([]);


  const chatArray = [];

  // =================== Chat Functions =======================
  const pullChat = () => {
    dbService.doc(`/users/aron@gmail.com`).get().then(doc => {
      const contact = doc.data()["contact"];
      const dbPullChat = [];

      // pull chat from db
      for(let uid in contact) {
        if(contact[uid].chats) {
          const chatObj = {
            uid: uid,
            chats: contact[uid].chats
          };
          dbPullChat.push(chatObj);
        }
      }
      // save to localstorage
      localStorage.setItem("chats", JSON.stringify(dbPullChat));
      console.log(JSON.parse(localStorage.getItem("chats")))
    });
  }

  const pushChat = async (text) => {
    chatArray.push(text);
    // setChats(chatArray);

    console.log(chatArray)

    const myUID = "Efbdfw5alhgecsIy5fRKa488A9j2";
    const targetEmail = "ken@gmail.com";

    const userCollection = dbService.collection("users");
    const targetRef = userCollection.doc(targetEmail);

    
    const pushChatData = {
      [`contact.${myUID}`] : {
        reference : "/users/aron@gmail.com",
        state : 2,
        chats: chatArray
      }
    }


    // targetRef.update(pushChatData);

  }


  // context value
  const contextValue = {isChatting, setIsChatting, pullChat, pushChat};
  return(
    <chatContext.Provider value={contextValue}>
      {children}
    </chatContext.Provider>
  );
}


// ================== create context hook ===================
/**
 * @description
 * @return {{isChatting: boolean, setIsChatting: function, pullChat: function, pushChat: function}}
 */
export const useChat = () => {
  const chat = useContext(chatContext);
  return chat;
}