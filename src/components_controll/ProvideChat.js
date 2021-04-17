import { CHAT, CONTACT } from 'constants.js';
import { createContext, useContext, useState } from 'react';
import { dbService } from './fbase';
import { useUser } from './ProvideAuth';

// create context object
const chatContext = createContext();

export default function ProvideChat({children}) {
  const [isChatting, setIsChatting] = useState(false);
  const [chatterUID, setChatterUID] = useState(null);
  const {userObj} = useUser();
  

  // =================== Chat Functions =======================
  const pullChat = () => {
    // pull Previous chats from local storage
    let localChats = JSON.parse(localStorage.getItem("chats"));
    if(!localChats) {
      localChats = {};
    }

    dbService.doc(`/users/${userObj.email}`).get().then(doc => {
      const contact = doc.data()["contact"];

      // check whether chats exist or not
      for(let uid in contact) {
        if(contact[uid].chats) {
          // pull previous localChatArray of specific user
          let localChatArray = localChats[uid];
          if(!localChatArray) {
            localChatArray = [];
          }
          const targetRef = contact[uid].reference;

          // pull chat from db
          const chatObj = { 
            chats: contact[uid].chats,
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

    // pull previous localChatArray of target
    let localChats = JSON.parse(localStorage.getItem("chats"));
    if(!localChats) {
      localChats = {};
    }
    let localChatArray = localChats[chatterUID];
    if(!localChatArray) {
      localChatArray = [];
    }

    const chatObj = {
      chats: text,
      state: CHAT.SEND
    }
    localChatArray.push(chatObj);
    localChats[chatterUID] = localChatArray;
    // push to localstorage
    localStorage.setItem("chats", JSON.stringify(localChats))

    // pull previous db chats
    dbService.doc(`/users/${userObj.email}`).get().then(doc => {
      const myContact = doc.data()["contact"];
      const chatterRef = myContact[chatterUID].reference;
      console.log(chatterRef);

      dbService.doc(`/users/ujunglim@naver.com`).get().then(doc => {
        const contact = doc.data()["contact"];

        let dbChats = contact[myUID].chats;
        if(!dbChats) {
          dbChats = [];
        }

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
 * @return {{isChatting: boolean, setIsChatting: function, setChatterUID: function pullChat: function, pushChat: function}}
 */
export const useChat = () => {
  const chat = useContext(chatContext);
  return chat;
}