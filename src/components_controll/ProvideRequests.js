import { createContext, useContext, useEffect, useState } from 'react';
import { dbService } from './fbase';
import { useAuth } from './ProvideAuth';

const requestsContext = createContext();

export default function ProvideRequests({children}) {
  const [requests, setRequests] = useState({list: []});
  const {userObj} = useAuth();
  const [cancelOnSnapshot, setCancelOnSnapshot] = useState(null);

  useEffect(() => {
		// if no user is logged in, don't add onSnapshot observer
    if(!userObj) 
      return;
    // delete onSnapshot observer of previous user
    cancelOnSnapshot && cancelOnSnapshot.run();
    
    // get requestArray
    const cancelFunc = dbService
    .collection("users").doc(userObj.email).collection("friends").where("state", "<", 2)
    .onSnapshot((snapshot) => {
      const requestArray = snapshot.docs.map(doc => ({
        state: doc.data().state,
        email:doc.id,
        displayName: null,
        photoURL: null
      }));
      setRequests({list: requestArray});

      // ======= Implement Fake Relational DB =======
      // get displayName and photoURL by email
      const userCollection = dbService.collection("users");

      // find key(email)
      for(let i = 0; i < requestArray.length; ++i) {
        const email = requestArray[i].email;
        // find user by email
        userCollection.doc(email).get()
        .then((doc) => {
          const user = doc.data();
          // set displayNae, photoURL
          requestArray[i].displayName = user.displayName;
          requestArray[i].photoURL = user.photoURL || null;

          setRequests({list: requestArray});
        })
        .catch((error) => console.log(error));
      }
    })
    setCancelOnSnapshot({run: cancelFunc});

  }, [userObj]);

  const contextValue = {requests};
  return (
    <requestsContext.Provider value={contextValue}>
      {children}
    </requestsContext.Provider>
  );
}
// ================== create context hook ===================
/**
 * @description 
 * @return {{requests: array}}
 */
export const useRequests = () => {
	const requests = useContext(requestsContext);
	if (requests === undefined)
		console.warn("useRequests() must be used inside ProvideAuth!");
	return requests;
}