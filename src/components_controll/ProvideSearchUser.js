import { createContext, useContext, useEffect, useState } from 'react'
import { dbService } from './fbase';
import { useContact } from './ProvideContact';

// create context object
const searchUserContext = createContext();

export default function ProvideSearchUser({children}) {
  // searchResult == null means empty
  const [searchResult, setSearchResult] = useState(null);
  const userCollection = dbService.collection("users");
  const {friend, request} = useContact();

  // ======= Function =======
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
          console.log(result);
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
    
  // =================== context value  =======================
  const contextValue = {searchUser, searchResult}

  return (
    <searchUserContext.Provider value={contextValue}>
      {children}
    </searchUserContext.Provider>
  );
}

// ================== create context hook ===================
/**
 * @description
 * @returns {{searchUser: function, searchResult: object}}
 */
export const useSearchUser = () => {
  const searchUser = useContext(searchUserContext);
  if(searchUser === undefined)
    console.warn("error")
  return searchUser;
}