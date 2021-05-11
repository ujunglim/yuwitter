import { createContext, useContext, useEffect, useState } from 'react'
import { dbService, storageService } from './fbase';
import { useUser } from './ProvideAuth';
import { v4 as uuidv4 } from 'uuid';

// create context object
const yuweetsContext = createContext();

export default function ProvideYuweets({children}) {
	// out of [] add {}, to refresh when set whole list again
	const [yuweets, setYuweets] = useState({list:[]});
	const [comments, setComments] = useState({});
	const [likes, setLikes] = useState({});
	const {userObj} = useUser();
	const [cancelOnSnaphot, setCancelOnSnaphot] = useState(null);  // function

  useEffect(() => {		
		// if no user is logged in, don't add onSnapshot observer
		if(!userObj) {
			return;
		}
		// delete onSnapshot observer of previous user
		cancelOnSnaphot && cancelOnSnaphot.run();
		
		const cancelFunc = dbService
			.collection("yuweets")
			.orderBy("createdAt", "desc")
			.onSnapshot((snapshot) => {
				// console.log('getPost on snapshot');
				//====== Yuweets =========
				const yuweetArray = snapshot.docs.map(doc => ({
					id: doc.id,
					displayName: null,
					photoURL: null,
					isOwner: doc.data().creatorId === userObj.uid,
					...doc.data()
				}));
				setYuweets({list: yuweetArray});

				//====== Comments =========
				const dbComment = snapshot.docs.map(doc => ({
					[`${doc.id}`] : doc.data().comment
				}));

				setComments(dbComment)

				//====== Likes =========
				const likeObj = {};

				for(let i = 0; i < yuweetArray.length; ++i) {
					likeObj[yuweetArray[i].id] = yuweetArray[i].like;
				}
				setLikes(likeObj)
				
				//======== Implement Fake Relational Dabatase =========
				// get array of user's unique email  
				const uniqueUsers = getUniqueUsers(yuweetArray);
				
				// get user collection from server just once
				const userCollection = dbService.collection("users");

				for(let i = 0; i < uniqueUsers.length; ++i) {
					const email = uniqueUsers[i];

					userCollection.doc(email).get()
					.then((doc) => {
						const user = doc.data();
						
						for(let i = 0; i < yuweetArray.length; ++i ) {
							if(yuweetArray[i].email == email) {
								yuweetArray[i].displayName = user.displayName;
								yuweetArray[i].photoURL = user.photoURL || null;
							}
						}
						setYuweets({list: yuweetArray});
						
					})
					.catch((error) => console.log("Error getting document:", error));
				}
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
			email: userObj.email,
			createdAt: Date.now(),
			creatorId: userObj.uid,
			text: text,
			attachmentUrl,
			comment: null,
			like: {}
		}

		await dbService.collection("yuweets").add(yuweetObj);
	}

	const editYuweet = async (id, newYuweet) => {
		await dbService.doc(`yuweets/${id}`).update({
      text: newYuweet
    });
	}

	const deleteYuweet = async (id, attachmentUrl) => {
		const ok = window.confirm("Are you sure delete Yuweet?");
    if(ok) {
      // delete yuweet
      await dbService.doc(`yuweets/${id}`).delete();
      // delete attachment
      await storageService.refFromURL(attachmentUrl).delete();
    }
	}

	const addComment = (id, comment) => {
		const {displayName, photoURL} = userObj;
		let prevComment = [];

		for(let i = 0; i < comments.length; ++i) {
			if(comments[i][id]) {
				prevComment = comments[i][id];
			}
		}
		prevComment.push({comment, displayName, photoURL});
		const commentData = {[`comment`] : prevComment};
		dbService.doc(`yuweets/${id}`).update(commentData);
	}

	const clickLike = (id) => {
		const {uid, displayName} = userObj;
		const likeObj = likes[id];

		if(!likes[id][uid]) {
			// add who likes
			likeObj[uid] = displayName;
		}
		else {
			// delete who cancled like
			delete likeObj[uid];	
		}

		const likeData = {[`like`] : likeObj};
		dbService.doc(`yuweets/${id}`).update(likeData);
	}

  // =================== context value  =======================
  const contextValue = {yuweets, addYuweet, editYuweet, deleteYuweet, addComment, clickLike};

  return (
    <yuweetsContext.Provider value={contextValue}>
      {children}
    </yuweetsContext.Provider>
  );
}

// =================== Other Functions =======================
function getUniqueUsers(yuweetArray) {
	let uniqueSet = new Set(); // setObj is an unique item collection
	for(let i = 0; i < yuweetArray.length; ++i) {
		uniqueSet.add(yuweetArray[i].email)
	}
	return [...uniqueSet];   // convert setObj to array
}

// =================== create context hook =====================
/**
 * @description 
 * @return {{yuweets: array, addYuweet: function, editYuweet: function, deleteYuweet: function, addComment: function, clickLike: function}}
 */
export const useYuweets = () => {
	const yuweets = useContext(yuweetsContext);
	if (yuweets === undefined)
		console.warn("useYuweets() must be used inside ProvideYuweets!");
	return yuweets;
}