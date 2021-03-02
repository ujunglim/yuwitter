import { dbService } from './fbase';
import { useAuth } from './ProvideAuth';
import { createContext, useContext, useEffect, useState } from 'react'

const contactsContext = createContext();

export default function ProvideContacts({children}) {
  // contacts == [] means empty, not null
  const [contacts, setContacts] = useState({list:[]});
  const {userObj} = useAuth();
  const [cancelOnSnapshot, setCancelOnSnapshot] = useState(null);

  useEffect(() => {
		// if no user is logged in, don't add onSnapshot observer
    if(!userObj) 
    return;
    // delete onSnapshot observer of previous user
    cancelOnSnapshot && cancelOnSnapshot.run();

    const cancelFunc = dbService
      .collection("users").doc(userObj.email).collection("friends")
      .onSnapshot((snapshot) => {
        // console.log('getPost on snapshot');
        const contactArray = snapshot.docs.map(doc => ({
          email: doc.id,
          displayName: null,
          photoURL: null,
          ...doc.data()
          })
        );
        setContacts({list: contactArray});

			  //======== Implement Fake Relational Dabatase =========
        // get displayName and photoURL by email
        const userCollection = dbService.collection("users");
        // find key email
        for(let i = 0; i < contactArray.length; ++i) {
          const email = contactArray[i].email;
          // find user by email
          userCollection.doc(email).get()
          .then((doc) => {
            const user = doc.data();
            // set displayName, photoURL 
            contactArray[i].displayName = user.displayName;
            contactArray[i].photoURL = user.photoURL || null;
            
            setContacts({list: contactArray});

          })
          .catch((error) => console.log(error));
        }
      });
    setCancelOnSnapshot({run: cancelFunc});
    
	}, [userObj]);


  // ================== Context Value ======================
  const contextValue = {contacts};
  return (
    <contactsContext.Provider value={contextValue}>
      {children}
    </contactsContext.Provider>
  );
}
// ================== create context hook ===================
/**
 * @description 
 * @return {{contacts: array}}
 */
export const useContacts = () => {
	const contacts = useContext(contactsContext);
	if (contacts === undefined)
		console.warn("useContacts() must be used inside ProvideContacts!");
	return contacts;
}