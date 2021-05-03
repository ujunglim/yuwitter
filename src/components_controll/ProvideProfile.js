import { dbService } from './fbase';
import { useUser } from './ProvideAuth';

const { createContext, useEffect, useState, useContext } = require('react');

const profileContext = createContext();

export default function ProvideProfile({children}) {
  const [newBgPhotoURL, setNewBgPhotoURL] = useState("");
  const {userObj} = useUser();

  useEffect(() => {
    if(!userObj) {
      return;
    }

    dbService.doc(`users/${userObj.email}`).get().then(doc => {
    setNewBgPhotoURL(doc.data().bgPhotoURL);
    })
  }, [userObj])
  

  const contextValue = {newBgPhotoURL, setNewBgPhotoURL};
  return (
    <profileContext.Provider value={contextValue}>
      {children}
    </profileContext.Provider>
  );
}


//================= Hook ===================
/** 
 * @description
 * @return {{newBgPhotoURL: string, setNewBgPhotoURL: function}}
*/
export const useProfile = () => {
  const profile = useContext(profileContext);
  return profile;
}