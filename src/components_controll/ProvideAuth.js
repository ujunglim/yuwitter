import { authService, dbService, firebaseInstance, storageService } from 'components_controll/fbase';
import React, { createContext, useContext, useEffect, useState } from 'react';

// create context object
const authContext = createContext();

// create context container
export default function ProvideAuth({children}) {
  const [isInit, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [isNewUser, setIsNewUser ] = useState(true);

  useEffect(() => {
    // add observer for changes to user's sign-in state
    authService.onAuthStateChanged(async (user) => {
      if(user) {
        // this is data, upload to firestore
        const dbUserObj = {
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL || user.providerData[0].photoURL,
        }

        setUserObj({
          ...dbUserObj,
          email: user.email,
          updateProfile: (args) => user.updateProfile(args)
        });

        if(isNewUser) {
          await dbService.collection("users").doc(`${user.email}`).set(dbUserObj);
        }
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
    await authService.createUserWithEmailAndPassword(email, password);
  };
  // logIn types are email and social( google, github)
  const logIn = async (type, email, password) => {
    let user = null;
    switch(type) {
      case "email":  
        user = await authService.signInWithEmailAndPassword(email, password);
        break; 
      case "google": 
        const google = new firebaseInstance.auth.GoogleAuthProvider();
        user = await authService.signInWithPopup(google);
        break;
      case "github": 
        const github = new firebaseInstance.auth.GoogleAuthProvider();
        user = await authService.signInWithPopup(github);
        break;    
    }
    setIsNewUser(user.additionalUserInfo.isNewUser);
  }

  const logOut = async () => {
		await authService.signOut();
  };
  
  const editUserObj = async (newUserObj) => {
    newUserObj = {...userObj, ...newUserObj};

    // reupload new photoURL to storage
    // get ref
    const profilePhotoRef = storageService
      .ref()
      .child(`ProfilePhoto/${userObj.email}`);
    // edit itself by using ref
    const response = await profilePhotoRef.putString(newUserObj.photoURL, "data_url");
    // get new url
    newUserObj.photoURL = await response.ref.getDownloadURL();


    // update local app
    setUserObj(newUserObj);
    // update firebase auth
    await userObj.updateProfile(newUserObj);  
    // update firestore
    await dbService.doc(`users/${userObj.email}`).update({
      displayName: newUserObj.displayName, 
      photoURL: newUserObj.photoURL
    });
  };

  
  // =================== context value  =======================
  const contextValue = {isInit, userObj, signUp, logIn, logOut, editUserObj};
  return (
    <authContext.Provider value={contextValue}>
      {children}
    </authContext.Provider>
  );
}

// create context hook 
/**
 * @description 
 * @return {{isInit:boolean, userObj:object, signUp:function, logIn:function, logOut:function, editUserObj: function}}
 */
export const useAuth = () => {
  const auth = useContext(authContext);
  if (auth === undefined)
    console.warn("useAuth() must be used inside ProvideAuth!");
  return auth;
}