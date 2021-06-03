import { createContext, useContext, useEffect, useState } from 'react'
import { dbService, storageService } from './fbase';
import { useUser } from './ProvideAuth';
import { v4 as uuidv4 } from 'uuid';

// create context object
const yuweetsContext = createContext();

export default function ProvideYuweets({children}) {
  // out of [] add {}, to refresh when set whole list again
  const [yuweets, setYuweets] = useState({list:[]}); 
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
        //====== Yuweets =========
        const yuweetArray = snapshot.docs.map(doc => ({
          id: doc.id,
          displayName: null,
          photoURL: null,
          isOwner: doc.data().creatorId === userObj.uid,
          ...doc.data()
        }));
        setYuweets({list: yuweetArray});
      });
      
    setCancelOnSnaphot({run:cancelFunc});
  }, [userObj]);
  
  // =================== Functions =======================
  const addYuweet = async (text, attachment) => {
    // if(text === "") {
    //   window.alert("Write some text")
    //   return;
    // }
    window.alert("Posting yuweet...");
    
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
      creatorRef: userObj.myRef,
      text: text,
      attachmentUrl,
      comment: [],
      like: {}
    }

    await dbService.collection("yuweets").add(yuweetObj);
    window.alert("Post yuweet successfully!")
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

  const addComment = async (id, commentText) => {
    const {myRef} = userObj;
    // get previous dbComment
    const dbComment = await dbService.doc(`/yuweets/${id}`).get()
    .then((doc) => (doc.data().comment))
    .catch((error) => console.log(error));

    // add new comment to previous dbComment
    dbComment.push({comment:commentText, reference:myRef});
    const commentData = {[`comment`] : dbComment};
    dbService.doc(`yuweets/${id}`).update(commentData);
  }

  const clickLike = async (id) => {
    const {uid, displayName} = userObj;
    const dbLike = await dbService.doc(`yuweets/${id}`).get()
    .then((doc) => (doc.data().like))
    .catch((error) => console.log(error));

    if(!dbLike[uid]) {
      // add who likes
      dbLike[uid] = displayName;
    }
    else {
      // delete who cancled like
      delete dbLike[uid];  
    }
    
    const likeData = {[`like`] : dbLike};
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