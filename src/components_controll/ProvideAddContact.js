import { CONTACT, SEARCH } from 'constants.js';
import { createContext, useContext, useEffect, useState } from 'react'
import { dbService } from './fbase';
import { useUser } from './ProvideAuth';
import { useContact } from './ProvideContact';

// create context object
const AddContactContext = createContext();

// =========================== Functions ===========================
// handle change of state by using reference
function onHandleReuqest(targetUID, targetRef, targetState, myUID, myRef, myState) {
  // have to use dot notation for updating nested fields
  // request sender
  const sendRequestData = {
    [`contact.${targetUID}`] : {
      reference : targetRef,
      state : myState
    }
  }
  myRef.update(sendRequestData);

  // request receiver
  const receiveRequestData = {
    [`contact.${myUID}`] : {
      reference : myRef,
      state : targetState
    }
  }
  targetRef.update(receiveRequestData);
}

// add stateText, onClick to request object, according to state
function mutateContactData(targetContactData, myUID, myRef, onClicked) {
  const {uid:targetUID, reference:targetRef, state, ...rest} = targetContactData; // ..rest = displayName, photoURL
  let mutatedData = {uid:targetUID, ...rest};

  switch(state) {
    case CONTACT.REQUESTING: 
      mutatedData.stateText = "Sent";
      mutatedData.onClick = null;
      break;

    case CONTACT.ACCEPTING:
      mutatedData.stateText = "Accept";
      mutatedData.onClick = () => {
        onHandleReuqest(targetUID, targetRef, CONTACT.FRIEND, myUID, myRef, CONTACT.FRIEND);
        onClicked && onClicked(); 
      }
      break;

    default:
      mutatedData.stateText = "Add";
      mutatedData.onClick = () => {
        onHandleReuqest(targetUID, targetRef, CONTACT.ACCEPTING, myUID, myRef, CONTACT.REQUESTING);
        onClicked && onClicked();
      }
      break;
  }
  return mutatedData;
}

// ================= Parent Component ======================
export default function ProvideAddContact({children}) {
  // searchResult == null means empty
  const [searchResult, setSearchResult] = useState(SEARCH.NO_SEARCH);
  const userCollection = dbService.collection("users");
  const {request} = useContact();  // object
  const {userObj: {uid:myUID, myRef}} = useUser();
  const [requestList, setRequestList] = useState([]); // array of mutated request 

  // get request list
  useEffect(() => {
    const requestArray = [];
    // convert request object into list
    for(const email in request) {
      const requestContactData = request[email];
      // add stateText, onClick
      const mutatedResult = mutateContactData(requestContactData, myUID, myRef); 
      requestArray.push(mutatedResult);
    }
    setRequestList(requestArray);

  }, [request])
  
  // =========== Add Contact Function ============
  const searchUser = (email) => {
    // default: no SearchResult
    setSearchResult(SEARCH.SEARCHING);
    // After btn clicked, clear SearchResult
    const onClicked = () => setSearchResult(SEARCH.NO_SEARCH);

    if (request[email]) {
      // exist requesting contact
      const targetContactData = request[email];
      const mutatedResult = mutateContactData(targetContactData, myUID, myRef, onClicked); 
      setSearchResult(mutatedResult);
    }
    else {
      // completely new contact
      const targetRef = userCollection.doc(email);

      targetRef.get().then((doc) => {
        if (doc.exists) {
          const {uid, displayName, photoURL} = doc.data();
          const targetContactData = {
            uid, 
            displayName,
            photoURL,
            state: null,
            reference: targetRef
          };
          
          const mutatedResult = mutateContactData(targetContactData, myUID, myRef, onClicked);
          setSearchResult(mutatedResult);
        }
        else {
          // can't find SearchResult
          setSearchResult(SEARCH.NO_RESULT);
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
        setSearchResult(SEARCH.NO_RESULT);
      });
    }
  }
 
  // =================== context value  =======================
  const contextValue = {searchUser, searchResult, requestList}

  return (
    <AddContactContext.Provider value={contextValue}>
      {children}
    </AddContactContext.Provider>
  );
}

// ================== create context hook ===================
/**
 * @description
 * @returns {{searchUser: function, searchResult: object, requestList: array}}
 */
export const useAddContact = () => {
  const addContact = useContext(AddContactContext);
  if(addContact === undefined) {
    console.warn("error");
  }
  return addContact;
}