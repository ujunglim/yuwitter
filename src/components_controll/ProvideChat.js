import { CHAT, CONTACT } from 'constants.js';
import { createContext, useContext, useEffect, useState } from 'react';
import { dbService } from './fbase';
import { useUser } from './ProvideAuth';

// create context object
const chatContext = createContext();

export default function ProvideChat({children}) {
  const [isChatting, setIsChatting] = useState(false);
  const [chatterUID, setChatterUID] = useState(null);
  const {userObj} = useUser();

  // pull previous local chats
  const localChats = JSON.parse(localStorage.getItem("chats")) ? JSON.parse(localStorage.getItem("chats")) : {};

  useEffect(() => {
    if(!userObj)
      return;

    // pullChat();

  }, [userObj]);
  
  // =================== Chat Functions =======================
  const pullChat = () => {
    // pull previous db 
    dbService.doc(`/users/${userObj.email}`).onSnapshot(snapshot => {
      const myContact = snapshot.data().contact;
      console.log(myContact)

      // check whether chats exist or not
      for(let uid in myContact) {
        if(myContact[uid].chats) {

          // pull previous local chat of specific chatter
          const localChatArray = localChats[uid] ? localChats[uid] : [];
          const targetRef = myContact[uid].reference;

          // pull chat from db
          const chatObj = { 
            chats: myContact[uid].chats,
            state: CHAT.RECEIVED
          }

          // push chat to localChats
          localChatArray.push(chatObj)
          localChats[uid] = localChatArray;
          
          // save to localstorage
          localStorage.setItem("chats", JSON.stringify(localChats));
          
          // clear chat from db 
          const {myRef} = userObj;
          const clearChatData = {
            [`contact.${uid}`]: {
              reference: targetRef,
              state: CONTACT.FRIEND
            }
          }
          myRef.update(clearChatData);
        }
      }
    })
  }

  const pushChat = async (text) => {
    const {uid:myUID, myRef} = userObj;

    // pull previous local chat of specific chatter
    const localChatArray = localChats[chatterUID] ? localChats[chatterUID] : [];

    const chatObj = {
      chats: text,
      state: CHAT.SEND
    }
    localChatArray.push(chatObj);
    localChats[chatterUID] = localChatArray;
    // push to localstorage
    localStorage.setItem("chats", JSON.stringify(localChats))

    // pull previous db chats
    dbService.doc(`/users/${userObj.email}`).onSnapshot(snapshot => {
      const myContact = snapshot.data().contact;
      const chatterRef = myContact[chatterUID].reference;

      dbService.doc(`/users/${chatterRef.id}`).get().then(doc => {
        const contact = doc.data()["contact"];
        // pull db chats
        const dbChats = contact[myUID].chats ? contact[myUID].chats : [];

        // push chat to array
        dbChats.push(text);

        // push to db
        const pushChatData = {
          [`contact.${myUID}`] : {
            reference: myRef,
            state: CONTACT.FRIEND,
            chats: dbChats
          }
        }
        chatterRef.update(pushChatData);
      })
    })
  }


  // context value
  const contextValue = {isChatting, setIsChatting, setChatterUID, pullChat, pushChat};
  return(
    <chatContext.Provider value={contextValue}>
      {children}
    </chatContext.Provider>
  );
}


// ================== create context hook ===================
/**
 * @description
 * @return {{isChatting: boolean, setIsChatting: function, setChatterUID: function, pullChat: function, pushChat: function}}
 */
export const useChat = () => {
  const chat = useContext(chatContext);
  return chat;
}