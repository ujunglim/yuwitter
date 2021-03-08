import { createContext, useContext, useEffect, useState } from 'react'
import { dbService } from './fbase';


// create context object
const searchUserContext = createContext();


// ===================== Parent Component ================================
export default function ProvideSearchUser({textRef}) {
  // // searchUser == null means empty
  // const [searchUser, setSearchUser] = useState(null);

  useEffect(() => {
    console.log("hey")

  //   dbService.collection("users").doc().get()
  //   .then((doc) => {
  //     if (doc.exists) {
  //       console.log("Document data:", doc.data());
  //     } else {
  //       // doc.data() will be undefined in this case
  //       console.log("No such document!");
  //     }
  //   }).catch(function(error) {
  //     console.log("Error getting document:", error);
  //   });
  }, []);
  
  // const contextValue = {searchUser}

  return (
    <h2>finding..</h2>
  );
}

// ================== create context hook ===================
/**
 * @description
 * @returns {{searchUser: object}}
 */
export const useSearchUser = () => {
  const searchUser = useContext(searchUserContext);
  if(searchUser === undefined)
    console.warn("error")
  return searchUser;
}