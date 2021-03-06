import { dbService } from './fbase';
import { useUser } from './ProvideAuth';
import { createContext, useContext, useEffect, useState } from 'react'
import { CONTACT } from 'constants.js';

// create context object
const contactContext = createContext();

// ===================== Parent Component ================================
export default function ProvideContact({children}) {
  const [friend, setFriend] = useState({list:[]});
  const [request, setRequest] = useState({});

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
      const data = snapshot.data();
      
      if(data.contact) {
      // when there's contact
        const {contact} = data;
        const friendArray = [];
        const requestObj = {};
  
        for(const uid in contact) {
          const {reference, state} = contact[uid];
          const {displayName, photoURL} = (await reference.get()).data();
          const contactObj = {
            uid,
            displayName,
            photoURL,
            state,
            reference
          }

          if(contact[uid].state == CONTACT.FRIEND) {
            friendArray.push(contactObj);
          }
          else {
            const email = reference.id;
            requestObj[email] = {...contactObj}; 
          }
        }
        // order friendArray by name
        for(let i = 0; i < friendArray.length; ++i) {
          for(let j = i; j > 0; --j) {
            if(friendArray[j-1]['displayName'] > friendArray[j]['displayName']) {
              const temp = friendArray[j-1];
              friendArray[j-1] = friendArray[j];
              friendArray[j] = temp;
            }
            else break;
          }
        }

        setFriend({list: friendArray});
        setRequest(requestObj);

      }
      else {
        // when there's no contact
        setFriend({list:[]});
        setRequest({});
      }
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
 * @return {{friend: array, request: object}}
 */
export const useContact = () => {
	const contact = useContext(contactContext);
	if (contact === undefined)
		console.warn("useContact() must be used inside ProvideContact!");
	return contact;
}