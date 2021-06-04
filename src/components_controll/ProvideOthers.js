import { dbService } from './fbase';
import { createContext, useContext } from "react";

const othersContext = createContext();

// ProvideOthers provide other user's photoURL, displayName by reference parameter
export default function ProvideOthers({children}) {

  const getPhoto = async (reference, setCallback) => {
    const ref = (typeof reference == 'string') ? dbService.doc(reference) : reference;
    const {photoURL} = (await ref.get()).data(); // get photoURL from reference data
    setCallback(photoURL); // set result
  }

  const getName = async (reference, setCallback) => {
    const ref = (typeof reference == 'string') ? dbService.doc(reference) : reference;
    const {displayName} = (await ref.get()).data(); // get displayName from reference data
    setCallback(displayName); // set result
  }

  const contextValue = {getPhoto, getName};
  return (
    <othersContext.Provider value={contextValue}>
      {children}
    </othersContext.Provider>
  );
}

//================= Hook ===================
/** 
 * @description
 * @return {{getPhoto: function, getName: function}}
*/
export const useOthers = () => {
  const others = useContext(othersContext);
  return others;
}