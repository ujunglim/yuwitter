import { dbService } from './fbase';
import { useUser } from './ProvideAuth';
import { createContext, useContext, useEffect, useState } from 'react'
import { FRIEND } from 'constants.js';

// create context object
const contactContext = createContext();

// ===================== Parent Component ================================
export default function ProvideContact({children}) {
  const [friend, setFriend] = useState({list:[]});
  const [request, setRequest] = useState({list: []});
  const {userObj} = useUser();
  const [cancelOnSnapshot, setCancelOnSnapshot] = useState(null);

  useEffect(() => {
		// if no user is logged in, don't add onSnapshot observer
    if(!userObj) {
      return;
    }
    // delete onSnapshot observer of previous user
    cancelOnSnapshot && cancelOnSnapshot.run();

    const cancelFunc = dbService
    .doc(`/users/${userObj.email}`).onSnapshot(async(snapshot) => {
      const curUserRef = snapshot.ref;
      const data = snapshot.data();
      const {contact} = data;

      const friendArray = [];
      const requestArray = [];

      for(const id in contact) {
        const {reference, state} = contact[id];
        const {displayName, photoURL} = (await reference.get()).data();
        const contactObj = {
          id,
          displayName,
          photoURL,
          state
        }

        if(contact[id].state == FRIEND) {
          friendArray.push(contactObj);
        }
        else {
          requestArray.push(contactObj);
        }

        // update state // onClick
        // const data = {[`contact.${id}.state`]: 2};
        // curUserRef.update(data);
      }

      setFriend({list: friendArray});
      setRequest({list: requestArray});
    })
    setCancelOnSnapshot({run: cancelFunc});

	}, [userObj]);


  // ================== Context Value ======================
  const contextValue = {friend, request};
  
  return (
    <contactContext.Provider value={contextValue}>
      {children}
    </contactContext.Provider>
  );
}
// ================== create context hook ===================
/**
 * @description 
 * @return {{friend: array, request: array}}
 */
export const useContact = () => {
	const contact = useContext(contactContext);
	if (contact === undefined)
		console.warn("useContact() must be used inside ProvideContact!");
	return contact;
}