import { authService, storageService } from 'fbase';
import React, { createContext, useContext, useEffect, useState } from 'react';

// create context object
const authContext = createContext();

// create context container
export const ProvideAuth = ({children}) => {
  const [isInit, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    // add observer for changes to user's sign-in state
    authService.onAuthStateChanged((user) => {
      if(user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL || user.providerData[0].photoURL,
          updateProfile: (args) => user.updateProfile(args)
        });
      }
      else {
        setUserObj(null);
      }
      // when app is ready to start
      setInit(true);
    });
  }, []);

  // =================== Auth Functions =======================
  const editUserObj = async (newUserObj) => {
    let isChanged = false;
    for(let prop in userObj) {
      // add new prop
      if(newUserObj[prop] === undefined)
        newUserObj[prop] = userObj[prop];
      // edit prop
      else if(newUserObj[prop] !== userObj[prop]){
        if(prop === 'photoURL') {
          // get ref
          const profilePhotoRef = storageService.ref().child(`ProfilePhoto/${userObj.uid}`);
          // edit itself by using ref
          const response = await profilePhotoRef.putString(newUserObj.photoURL, "data_url");
          // get new url
          newUserObj.photoURL = await response.ref.getDownloadURL();
        }
        isChanged = true;
      }
    }
    // if at least one prop has changed, setUserObj 
    // update local app
    isChanged && setUserObj(newUserObj);
    // update firebase auth
    await userObj.updateProfile(newUserObj);  
    // update firestore
    
  }

  
  const logOut = async () => {
		await authService.signOut();
  };
  
  // =================== context value  =======================
  const contextValue = {isInit, userObj, editUserObj, logOut};
  return (
    <authContext.Provider value={contextValue}>
      {children}
    </authContext.Provider>
  );
}

// create context hook 
/**
 * @description AuthProvider 的子组件可以使用 useAuth() 获得用户验证相关hook
 * @return {{isInit:boolean, userObj:object, editUserObj: function}}
 */
export const useAuth = () => {
  const auth = useContext(authContext);
  if (auth === undefined)
  console.warn("useAuth() must be used inside ProvideAuth!");
  return auth;
}