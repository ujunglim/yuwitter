import { dbService } from './fbase';
import { useUser } from './ProvideAuth';

const { createContext, useEffect, useState, useContext } = require('react');

const profileContext = createContext();

export default function ProvideProfile({children}) {
  const [newBgPhotoURL, setNewBgPhotoURL] = useState("");
  const {userObj} = useUser();
  // save and keep previous bg photo url
  const [prevBgPhotoURL, setPrevBgPhotoURL] = useState("");

  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");

  useEffect(() => {
    if(!userObj) {
      return;
    }

    dbService.doc(`users/${userObj.email}`).get().then(doc => {
      const data = doc.data();
      setNewBgPhotoURL(data.bgPhotoURL);
      setPrevBgPhotoURL(data.bgPhotoURL);

      setBio(data.bio);
      setLocation(data.location);
      setWebsite(data.website);
    })
  }, [userObj])


  const contextValue = {newBgPhotoURL, setNewBgPhotoURL, prevBgPhotoURL, bio, setBio, location, setLocation, website, setWebsite};
  return (
    <profileContext.Provider value={contextValue}>
      {children}
    </profileContext.Provider>
  );
}


//================= Hook ===================
/** 
 * @description
 * @return {{newBgPhotoURL: string, setNewBgPhotoURL: function, prevBgPhotoURL: string, bio:string, setBio:function, location:string, setLocation:function, website, setWebsite:function}}
*/
export const useProfile = () => {
  const profile = useContext(profileContext);
  return profile;
}