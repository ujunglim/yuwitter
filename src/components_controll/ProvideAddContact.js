import { CONTACT, SEARCH } from 'constants.js';
import { createContext, useContext, useEffect, useState } from 'react'
import { dbService } from './fbase';
import { useUser } from './ProvideAuth';
import { useContact } from './ProvideContact';

// create context object
const AddContactContext = createContext();

// =========================== Functions ===========================
// handle change of contact state by using reference when accecpting or requesting 
function onHandleReuqest(targetUID, targetRef, targetState, myUID, myRef, myState) {
  // have to use dot notation for updating nested fields
  // save target user's info and state to my dbContact
  const targetInfoToMe = {
    [`contact.${targetUID}`] : {
      reference : targetRef,
      state : myState
    }
  }
  // update to my reference location
  myRef.update(targetInfoToMe);

  // save my info and state to target user's dbContact
  const myInfoToTarget = {
    [`contact.${myUID}`] : {
      reference : myRef,
      state : targetState
    }
  }
  // update to target user's reference location
  targetRef.update(myInfoToTarget);
}

// add stateText of contact and onClick to request object, according to state
function mutateContactData(targetContactData, myUID, myRef, onClicked) {
  const {uid:targetUID, reference:targetRef, state, ...rest} = targetContactData; 
  let mutatedData = {uid:targetUID, ...rest}; // ..rest = displayName, photoURL

  switch(state) {
    case CONTACT.REQUESTING: // user requested friend
      mutatedData.stateText = "Sent";
      mutatedData.onClick = null;  // requesting state has no btn, so null to onClick
      break;

    case CONTACT.ACCEPTING: // user has friend request
      mutatedData.stateText = "Accept"; 
      // when click accecpt btn, send info of target user and my to onHandleReuqest
      mutatedData.onClick = () => {
        onHandleReuqest(targetUID, targetRef, CONTACT.FRIEND, myUID, myRef, CONTACT.FRIEND);
        onClicked && onClicked(); // after click btn, clear SearchResult
      }
      break;

    default: // user can send friend request
      mutatedData.stateText = "Add";
      // when click add btn, send info of target user and my to onHandleReuqest
      mutatedData.onClick = () => {
        onHandleReuqest(targetUID, targetRef, CONTACT.ACCEPTING, myUID, myRef, CONTACT.REQUESTING);
        onClicked && onClicked(); // after click btn, clear SearchResult
      }
      break;
  }

  return mutatedData;
}

// ================= Parent Component ======================
export default function ProvideAddContact({children}) {
  const [searchResult, setSearchResult] = useState(SEARCH.NO_SEARCH); // initially not searching
  const userCollection = dbService.collection("users"); // get user collection from firestore
  const {request} = useContact();  // object of requests, email is key
  const {userObj: {uid:myUID, myRef}} = useUser(); // get my uid, ref from ProvideUser
  const [requestList, setRequestList] = useState([]); // array of mutated request 

  // get request list
  useEffect(() => {
    const requestArray = [];
    // convert request object into list
    for(const email in request) {
      const targetContactData = request[email];
      // mutate data (add stateText, onClick)
      const mutatedResult = mutateContactData(targetContactData, myUID, myRef); 
      requestArray.push(mutatedResult); // save mutatedResult to array
    }
    setRequestList(requestArray);

  }, [request]) // redo when request list has change
  
  // =========== Add Contact Function ============
  const searchUser = (email) => {
    // default: no SearchResult
    setSearchResult(SEARCH.SEARCHING);
    // After btn clicked, clear SearchResult
    const onClicked = () => setSearchResult(SEARCH.NO_SEARCH);

    if (request[email]) {
      // exist requesting contact
      const targetContactData = request[email]; // get target user's data
      // mutate data by adding contact state, onclick callback
      const mutatedResult = mutateContactData(targetContactData, myUID, myRef, onClicked); 
      setSearchResult(mutatedResult); // set search result
    }
    else {
      // completely new user
      const targetRef = userCollection.doc(email); // get target user's ref from user collection

      targetRef.get().then((doc) => {
        if (doc.exists) {
          const {uid, displayName, photoURL} = doc.data();
          // make target user's data object by doc.data()
          const targetContactData = {
            uid, 
            displayName,
            photoURL,
            state: null,
            reference: targetRef
          };
          // mutate data by adding contact state, onclick callback
          const mutatedResult = mutateContactData(targetContactData, myUID, myRef, onClicked);
          setSearchResult(mutatedResult); // set search result
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