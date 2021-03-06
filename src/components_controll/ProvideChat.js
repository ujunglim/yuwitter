import { CHAT, CONTACT } from 'constants.js';
import { useLocalStorage } from 'localStorage';
import { createContext, useContext, useEffect, useState } from 'react';
import { dbService } from './fbase';
import { useUser } from './ProvideAuth';

// create context object
const chatContext = createContext();

export default function ProvideChat({children}) {
  const [isChatting, setIsChatting] = useState(false);
  const [chatterObj, setChatterObj] = useState(null);
  const {userObj} = useUser();
  const [cancelOnSnapshot, setCancelOnSnapshot] = useState(null);
  // useLocalStorage is advanced useState
  const [localChats, setLocalChats] = useLocalStorage("chats", {});

  useEffect(() => {
    if(!userObj) {
      return;
    }

    // delete onSnapshot observer of previous user
    cancelOnSnapshot && cancelOnSnapshot.run();

    // ========== pullChat =========
    const cancelFunc = dbService.doc(`/users/${userObj.email}`).onSnapshot(snapshot => {
      const myContact = snapshot.data().contact;

      // check whether chats exist or not in db
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
          localChatArray.push(chatObj);
          localChats[uid] = localChatArray;

          // save to localstorage
          setLocalChats({...localChats});

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
    setCancelOnSnapshot({run: cancelFunc});

  }, [userObj]);
  

  // =================== Chat Functions =======================
  const pushChat = (text) => {
    if(text !== "") {
      const {uid:myUID, myRef} = userObj;
      // pull previous local chat of specific chatter
      const localChatArray = localChats[chatterObj.id] ? localChats[chatterObj.id] : [];
  
      const chatObj = {
        chats: [text],
        state: CHAT.SEND
      }
      localChatArray.push(chatObj);
      localChats[chatterObj.id] = localChatArray;
      // push to localstorage
      setLocalChats({...localChats});
  
      // pull previous db chats
      dbService.doc(`/users/${userObj.email}`).get().then(doc => {
        const myContact = doc.data().contact;
        const chatterRef = myContact[chatterObj.id].reference;
  
        chatterRef.get().then((doc) => {
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
  }


  // context value
  const contextValue = {isChatting, setIsChatting, pushChat, chatterObj, setChatterObj, localChats};
  return(
    <chatContext.Provider value={contextValue}>
      {children}
    </chatContext.Provider>
  );
}

// ================== create context hook ===================
/**
 * @description
 * @return {{isChatting: boolean, setIsChatting: function, pushChat: function, chatterObj: object, setChatterObj: function, localChats: object}}
 */
export const useChat = () => {
  const chat = useContext(chatContext);
  return chat;
}