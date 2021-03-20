import { createContext, useContext, useEffect, useState } from 'react'
import { dbService } from './fbase';
import { useUser } from './ProvideAuth';
import { useContact } from './ProvideContact';

// create context object
const searchUserContext = createContext();

export default function ProvideAddContact({children}) {
  // searchResult == null means empty
  const [searchResult, setSearchResult] = useState(null);
  const userCollection = dbService.collection("users");
  const {friend, request} = useContact();
  const {userObj} = useUser();

  // ===================== Function =====================
  const searchUser = (email) => {
    const isFriend = friend.list.find(friend => friend.email === email) !== undefined
    const isRequest = request.list.find(request => request.email === email) !== undefined

    userCollection.doc(email).get()
    .then((doc) => {
      // console.log(searchResultRef);

      let result;
      if (doc.exists) {
        if(isFriend) {
          result = friend.list.find(friend => friend.email === email);
        }
        else if(isRequest) {
          result = request.list.find(request => request.email === email);
        }
        else {
          result = {
            state: null,
            email,
            ...doc.data()
          }
          // console.log(result);
        }
      } 
      else {
        result = -1;
      }
      setSearchResult(result)

    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
  }

  
  // ================ Contact function =====================
  const sendReuqest = () => {
    console.log("clicked add btn");
    setSearchResult("");

    // sender
    // have to use dot notation for updating nested fields
    const sendRequest = {
      [`contact.${searchResult.uid}.reference`] : dbService.doc(`users/${searchResult.email}`),
      [`contact.${searchResult.uid}.state`] : 0
    }
    dbService.doc(`users/${userObj.email}`).update(sendRequest);

    // receiver
    const receiveRequest = {
      [`contact.${userObj.uid}.reference`] : dbService.doc(`users/${userObj.email}`),
      [`contact.${userObj.uid}.state`] : 1
    }
    dbService.doc(`users/${searchResult.email}`).update(receiveRequest);
  }
    
  // =================== context value  =======================
  const contextValue = {searchUser, searchResult, sendReuqest}

  return (
    <searchUserContext.Provider value={contextValue}>
      {children}
    </searchUserContext.Provider>
  );
}

// ================== create context hook ===================
/**
 * @description
 * @returns {{searchUser: function, searchResult: object, sendReuqest: function}}
 */
export const useAddContact = () => {
  const searchUser = useContext(searchUserContext);
  if(searchUser === undefined)
    console.warn("error")
  return searchUser;
}