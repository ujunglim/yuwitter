import { createContext, useContext, useState } from 'react'
import { dbService } from './fbase';


// create context object
const searchUserContext = createContext();

export default function ProvideSearchUser({children}) {
  // searchResult == null means empty
  const [searchResult, setSearchResult] = useState(null);
  const userCollection = dbService.collection("users");

  // ======= Function =======
  const searchUser = (text) => {
     userCollection.doc(text).get()
    .then((doc) => {
      let result;
      if (doc.exists) {
        result = {...doc.data()};
      } 
      else {
        result = null;
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