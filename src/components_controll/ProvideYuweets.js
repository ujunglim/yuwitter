import { createContext, useContext, useEffect, useState } from 'react'
import { dbService } from './fbase';
import { useAuth } from './ProvideAuth';

const yuweetsContext = createContext();

export default function ProvideYuweets({children}) {
	const [yuweets, setYuweets] = useState([]);
	const {userObj} = useAuth();
	const [cancelOnSnaphot, setCancelOnSnaphot] = useState(null);  // function

  useEffect(() => {
		//if no user is logged in, don't add onSnapshot observer
		if(!userObj) 
			return;
		// delete onSnapshot observer of previous user
		cancelOnSnaphot && cancelOnSnaphot.run();
		
		const cancelFunc = dbService
			.collection("yuweets")
			.orderBy("createdAt", "desc")
			.onSnapshot((snapshot) => {
				console.log('getPost on snapshot');
				const yuweetArray = snapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data()
					})
				);
				setYuweets(yuweetArray);
			});
		
		setCancelOnSnaphot({run:cancelFunc});
  }, [userObj]);
  

  // =================== context value  =======================
  const contextValue = {yuweets}

  return (
    <yuweetsContext.Provider value={contextValue}>
      {children}
    </yuweetsContext.Provider>
  );
}

// create context hook 
/**
 * @description 
 * @return {{isInit:boolean, userObj:object, editUserObj: function, logOut: function}}
 */
export const useYuweets = () => {
	const yuweets = useContext(yuweetsContext);
	if (yuweets === undefined)
		console.warn("useYuweets() must be used inside ProvideYuweets!");
	return yuweets;
}