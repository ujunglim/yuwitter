import { dbService } from './fbase';
import { useAuth } from './ProvideAuth';
import { createContext, useContext, useEffect, useState } from 'react'

// create context object
const contactContext = createContext();
const requestsContext = createContext();

// ====================== Child Component ============================


// ===================== Parent Component ================================
export default function ProvideContact({children}) {
  // contact == [] means empty, not null
  const [contact, setContact] = useState({list:[]});
  const {userObj} = useAuth();
  const [cancelOnSnapshot, setCancelOnSnapshot] = useState(null);

  useEffect(() => {
		// if no user is logged in, don't add onSnapshot observer
    if(!userObj) 
    return;
    // delete onSnapshot observer of previous user
    cancelOnSnapshot && cancelOnSnapshot.run();

    const cancelFunc = dbService
      .collection("users").doc(userObj.email).collection("friends").where("state", "==", 2)
      .onSnapshot((snapshot) => {
        // console.log('getPost on snapshot');
        const contactArray = snapshot.docs.map(doc => ({
          email: doc.id,
          displayName: null,
          photoURL: null,
          ...doc.data()
          })
        );
        setContact({list: contactArray});

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
            
            setContact({list: contactArray});

          })
          .catch((error) => console.log(error));
        }
      });
    setCancelOnSnapshot({run: cancelFunc});
    
	}, [userObj]);


  // ================== Context Value ======================
  const contextValue = {contact};
  return (
    <contactContext.Provider value={contextValue}>
      {children}
    </contactContext.Provider>
  );
}
// ================== create context hook ===================
/**
 * @description 
 * @return {{contact: array}}
 */
export const useContact = () => {
	const contact = useContext(contactContext);
	if (contact === undefined)
		console.warn("useContact() must be used inside ProvideContact!");
	return contact;
}