import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false); // not initialized yet
  const [userObj, setUserObj] = useState(null);

 useEffect(() => {
   authService.onAuthStateChanged((user) => {
      if(user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args)
          // photoURL: user.photoURL
        });
      }
      else {
        setUserObj(null);
      }
      // when app is ready to start
      setInit(true);
    }
   );

 }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args)
    });
  };

  return (
    <>
      {init ? 
        <AppRouter 
          refreshUser={refreshUser}
          isLoggedIn={ Boolean(userObj) } 
          userObj={userObj} 
        /> : <div className="initializing">Initializing...</div>}
      <footer>&copy; {new Date().getFullYear()} Yuwitter</footer>
    </>
  );
}

export default App;
