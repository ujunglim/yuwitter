import { CONTACT } from 'constants.js';
import { createContext, useContext, useState } from 'react';
import { dbService } from './fbase';
import { useUser } from './ProvideAuth';

// create context object
const chatContext = createContext();

export default function ProvideChat({children}) {
  const [isChatting, setIsChatting] = useState(true);
  const {userObj} = useUser();
  const chatArray = [];

  // =================== Chat Functions =======================
  const pullChat = () => {
    dbService.doc(`/users/${userObj.email}`).get().then(doc => {
      const contact = doc.data()["contact"];
      const dbPullChat = [];

      for(let uid in contact) {
        if(contact[uid].chats) {
          // pull chat from db
          const chatObj = {
            uid: uid,
            chats: contact[uid].chats
          };
          dbPullChat.push(chatObj);

          // clear chat from db 
          const {myRef} = userObj;
          const target = 
          const targetRef = dbService.collection("users").doc("aron@gmail.com");
          const clearChatData = {
            [`contact.${uid}`]: {
              reference: targetRef,
              state: CONTACT.FRIEND
            }
          }
          myRef.update(clearChatData);
        }
      }
      // save to localstorage
      localStorage.setItem("chats", JSON.stringify(dbPullChat));
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