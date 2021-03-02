import { dbService } from './fbase';
import { useAuth } from './ProvideAuth';
import { createContext, useContext, useEffect, useState } from 'react'

const contactsContext = createContext();

export default function ProvideContacts({children}) {
  // contacts == [] means empty, not null
  const [contacts, setContacts] = useState([]);
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
          id: doc.id,
          ...doc.data()
          })
        );
        setContacts(contactArray);

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