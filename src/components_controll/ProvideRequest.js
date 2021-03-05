import { createContext, useContext, useEffect, useState } from 'react';
import { dbService } from './fbase';
import { useAuth } from './ProvideAuth';

const requestContext = createContext();

export default function ProvideRequest({children}) {
  const [request, setRequest] = useState({list: []});
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
      setRequest({list: requestArray});

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

          setRequest({list: requestArray});
        })
        .catch((error) => console.log(error));
      }
    })
    setCancelOnSnapshot({run: cancelFunc});

  }, [userObj]);

  const contextValue = {request};
  return (
    <requestContext.Provider value={contextValue}>
      {children}
    </requestContext.Provider>
  );
}
// ================== create context hook ===================
/**
 * @description 
 * @return {{request: array}}
 */
export const useRequest = () => {
	const request = useContext(requestContext);
	if (request === undefined)
		console.warn("useRequest() must be used inside ProvideAuth!");
	return request;
}