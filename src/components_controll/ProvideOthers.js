import { dbService } from './fbase';
import { createContext, useContext } from "react";

const othersContext = createContext();

export default function ProvideOthers({children}) {

  const getPhoto = async (reference, setCallback) => {
    const ref = (typeof reference == 'string') ? dbService.doc(reference) : reference;
    const {photoURL} = (await ref.get()).data();
    setCallback(photoURL);
  }

  const getName = async (reference, setCallback) => {
    const ref = (typeof reference == 'string') ? dbService.doc(reference) : reference;
    const {displayName} = (await ref.get()).data();
    setCallback(displayName);
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