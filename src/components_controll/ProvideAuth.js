import { authService, dbService, firebaseInstance, storageService } from 'components_controll/fbase';
import React, { createContext, useContext, useEffect, useState } from 'react';

// create context object
const initContext = createContext();
const userContext = createContext();

// ====================== Child Component ============================
function ProvideInit({children}) {
  const [isInit, setInit] = useState(false);
  const [isUserLogin, setUserLogin] = useState(false);

  useEffect(() => {
    // add observer for changes to user's sign-in state
    authService.onAuthStateChanged(async (user) => {
      setUserLogin(user ? true : false);
      // when app is ready to start
      setInit(true);
    });
  }, []);

  // context value 
  const contextValue = {isInit, isUserLogin};
  return (
    <initContext.Provider value={contextValue}>
      {children}
    </initContext.Provider>
  );
}

// create context container
function ProvideUser({children}) {
  const [userObj, setUserObj] = useState(null);
  
  useEffect(() => {
    // add observer for changes to user's sign-in state
    authService.onAuthStateChanged(async (user) => {

      if(user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL || user.providerData[0].photoURL,
          email: user.email,
          updateProfile: (args) => user.updateProfile(args),
          myRef: dbService.doc(`/users/${user.email}`)
        });
      }
      else {
        setUserObj(null);
      }
    });
  }, []);

  // ---------------- Auth Functions --------------------------
  // After got userCredential, then push to db
  const setNewUser = (userCredential) => {
    const {user} = userCredential;
    // this is data, upload to firestore
    const dbUserObj = {
      displayName: user.displayName,
      uid: user.uid,
      photoURL: user.photoURL || user.providerData[0].photoURL,
      bgPhotoURL: null
    };

    dbService.collection("users").doc(`${user.email}`).set(dbUserObj);
  }

  // New User
  const signUp = async (email, password) => {
    const userCredential = await authService.createUserWithEmailAndPassword(email, password);
    setNewUser(userCredential);
  };

  // logIn types are email and social(google, github)
  const logIn = async (type, email, password) => {
    let userCredential = null;
    
    switch(type) {
      case "email":  
        userCredential = await authService.signInWithEmailAndPassword(email, password);
        break; 
      case "google": 
        const google = new firebaseInstance.auth.GoogleAuthProvider();
        userCredential = await authService.signInWithPopup(google);
        break;
      case "github": 
        const github = new firebaseInstance.auth.GoogleAuthProvider();
        userCredential = await authService.signInWithPopup(github);
        break;    
    }
    userCredential.additionalUserInfo.isNewUser && setNewUser(userCredential);
  }

  const logOut = async () => {
		await authService.signOut();
  };
  
  const editUserObj = async (newUserObj) => {
    newUserObj = {...userObj, ...newUserObj};

    // reupload new photoURL to storage
    if(newUserObj["photoURL"] !== userObj["photoURL"]) {
      // get ref
      const profilePhotoRef = storageService
        .ref()
        .child(`ProfilePhoto/${userObj.email}`);
      // upload photo from local url to storage by using storage reference
      const response = await profilePhotoRef.putString(newUserObj.photoURL, "data_url");
      // then get remote url from storage 
      newUserObj.photoURL = await response.ref.getDownloadURL();
    }

    // update local app
    setUserObj(newUserObj);
    // update firebase auth
    await userObj.updateProfile(newUserObj);  
    // update firestore
    await dbService.doc(`users/${userObj.email}`).update({
      displayName: newUserObj.displayName, 
      photoURL: newUserObj.photoURL
      // bgPhotoURL: newUserObj.bgPhotoURL
    });
  };

  // context value 
  const contextValue = {userObj, signUp, logIn, logOut, editUserObj};
  return (
    <userContext.Provider value={contextValue}>
      {children}
    </userContext.Provider>
  );
}

// ===================== Parent Component ================================
export default function ProvideAuth({children}) {
  return (
    <ProvideInit>
      <ProvideUser>
        {children}
      </ProvideUser>
    </ProvideInit>
  );
}

// ===================== create context hook =========================== 
/**
 * @description 
 * @return {{isInit:boolean, isUserLogin:boolean}}
 */
export const useInit = () => {
  const init = useContext(initContext);
  if (init === undefined)
    console.warn("useInit() must be used inside ProvideAuth!");
  return init;
}

/**
 * @description 
 * @return {{ userObj:object, signUp:function, logIn:function, logOut:function, editUserObj: function}}
 */
export const useUser = () => {
  const user = useContext(userContext);
  if (user === undefined)
    console.warn("useUser() must be used inside ProvideAuth!");
  return user;
}