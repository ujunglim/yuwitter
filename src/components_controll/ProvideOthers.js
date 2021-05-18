import { dbService } from './fbase';

const { createContext, useContext } = require('react');

const othersContext = createContext();

export default function ProvideOthers({children}) {

  const getPhoto = async (reference, setCallback) => {
    // consider when test reference as string
    // const ref = (typeof reference == 'string') ? dbService.doc(reference) : reference;
    const {photoURL} = (await reference.get()).data();
    setCallback(photoURL);
  }

  const getName = async (reference, setCallback) => {
    // const ref = (typeof reference == 'string') ? dbService.doc(reference) : reference;
    const {displayName} = (await reference.get()).data();
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