import { createContext, useContext, useEffect, useState } from 'react'
import { dbService, storageService } from './fbase';
import { useAuth } from './ProvideAuth';
import { v4 as uuidv4 } from 'uuid';

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
  
  // =================== Auth Functions =======================
	const addYuweet = async (text, attachment) => {
		if(text === "") {
			window.alert("Write some text")
			return;
		}
		
		let attachmentUrl = "";

		if(attachment !== "") {
			const attachmentRef = storageService
				.ref()
				.child(`Yuweet/${userObj.email}/${uuidv4()}`);
			const response = await attachmentRef.putString(attachment, "data_url");
			attachmentUrl = await response.ref.getDownloadURL();
		}

		const yuweetObj = {
			text: text,
			createdAt: Date.now(),
			email: userObj.email,
			creatorId: userObj.uid,
			attachmentUrl
			// displayName: userObj.displayName,
			// creatorPhoto: userObj.photoURL,
		}

		await dbService.collection("yuweets").add(yuweetObj);
	}

	const editYuweet = async (yuweetObj, newYuweet) => {
		await dbService.doc(`yuweets/${yuweetObj.id}`).update({
      text: newYuweet
    });
	}

	const deleteYuweet = async (yuweetObj) => {
		const ok = window.confirm("Are you sure delete Yuweet?");
    if(ok) {
      // delete yuweet
      await dbService.doc(`yuweets/${yuweetObj.id}`).delete();
      // delete attachment
      await storageService.refFromURL(yuweetObj.attachmentUrl).delete();
    }
	}

  // =================== context value  =======================
  const contextValue = {yuweets, addYuweet, editYuweet, deleteYuweet}

  return (
    <yuweetsContext.Provider value={contextValue}>
      {children}
    </yuweetsContext.Provider>
  );
}

// create context hook 
/**
 * @description 
 * @return {{yuweets: array}}
 */
export const useYuweets = () => {
	const yuweets = useContext(yuweetsContext);
	if (yuweets === undefined)
		console.warn("useYuweets() must be used inside ProvideYuweets!");
	return yuweets;
}