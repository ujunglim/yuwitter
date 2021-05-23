import { dbService } from './fbase';
import { useUser } from './ProvideAuth';

const { createContext, useEffect, useState, useContext } = require('react');

const profileContext = createContext();

export default function ProvideProfile({children}) {
  const [newBgPhotoURL, setNewBgPhotoURL] = useState("");
  const {userObj} = useUser();
  // save and keep previous bg photo url
  const [prevBgPhotoURL, setPrevBgPhotoURL] = useState("");

  useEffect(() => {
    if(!userObj) {
      return;
    }

    dbService.doc(`users/${userObj.email}`).get().then(doc => {
    setNewBgPhotoURL(doc.data().bgPhotoURL);
    setPrevBgPhotoURL(doc.data().bgPhotoURL);
    })
  }, [userObj])


  const contextValue = {newBgPhotoURL, setNewBgPhotoURL, prevBgPhotoURL};
  return (
    <profileContext.Provider value={contextValue}>
      {children}
    </profileContext.Provider>
  );
}


//================= Hook ===================
/** 
 * @description
 * @return {{newBgPhotoURL: string, setNewBgPhotoURL: function, prevBgPhotoURL: string}}
*/
export const useProfile = () => {
  const profile = useContext(profileContext);
  return profile;
}