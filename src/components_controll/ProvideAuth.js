import { authService, dbService, firebaseInstance, storageService } from 'components_controll/fbase';
import React, { createContext, useContext, useEffect, useState } from 'react';

// create context object
const authContext = createContext();

// create context container
export default function ProvideAuth({children}) {
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
  const signUp = async (email, password) => {
    // await dbService.collection("users").doc(`${userObj.email}`).set(userObj);
    await authService.createUserWithEmailAndPassword(email, password);
  };
  // logIn types are email and social( google, github)
  const logIn = async (type, email, password) => {
    switch(type) {
      case "email":  
        await authService.signInWithEmailAndPassword(email, password);
        break; 
      case "google": 
        const google = new firebaseInstance.auth.GoogleAuthProvider();
        await authService.signInWithPopup(google);
        break;
      case "github": 
        const github = new firebaseInstance.auth.GoogleAuthProvider();
        await authService.signInWithPopup(github);
        break;    
      
    }
  }

  const logOut = async () => {
		await authService.signOut();
  };
  

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
    
  };

  
  // =================== context value  =======================
  const contextValue = {isInit, userObj, signUp, logIn ,logOut, editUserObj};
  return (
    <authContext.Provider value={contextValue}>
      {children}
    </authContext.Provider>
  );
}

// create context hook 
/**
 * @description 
 * @return {{isInit:boolean, userObj:object, editUserObj: function}}
 */
export const useAuth = () => {
  const auth = useContext(authContext);
  if (auth === undefined)
    console.warn("useAuth() must be used inside ProvideAuth!");
  return auth;
}