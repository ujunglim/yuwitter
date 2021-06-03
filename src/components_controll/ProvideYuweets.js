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
  const [cancelOnSnaphot, setCancelOnSnaphot] = useState(null); 

  useEffect(() => {   
    // if no user is logged in, don't add onSnapshot observer
    if(!userObj) {
      return;
    }
    // delete onSnapshot observer of previous user
    cancelOnSnaphot && cancelOnSnaphot.run();
    
    // get realtime documents of yuweets collection
    const cancelFunc = dbService
      .collection("yuweets")
      .orderBy("createdAt", "desc") // sort yuweets in descending order of created time
      .onSnapshot((snapshot) => {
        const yuweetArray = snapshot.docs.map(doc => ({
          id: doc.id,
          isOwner: doc.data().creatorId === userObj.uid,  // to let only owner of yuweet can edit and delete. 
          ...doc.data()
        }));

        setYuweets({list: yuweetArray});
      });
    
    // set cancel snapshot method
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

    // when yuweet has attachment, upload it's url to firebase storage 
    if(attachment !== "") {
      // get reference of attachment file
      const attachmentRef = storageService
        .ref()
        .child(`Yuweet/${userObj.email}/${uuidv4()}`);

      // putString() uploads string data (raw, base64, base64url, or data_url encoded string) to storage
      const response = await attachmentRef.putString(attachment, "data_url");
      // download url from reference
      attachmentUrl = await response.ref.getDownloadURL();
    }

    const yuweetObj = {
      email: userObj.email,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      creatorRef: userObj.myRef,
      text: text,
      attachmentUrl, // if attachment exists save url string, if not save ""
      comment: [],
      like: {}
    }

    // add new yuweet obj to yuweets collection
    await dbService.collection("yuweets").add(yuweetObj);
    window.alert("Post yuweet successfully!")
  }

  const editYuweet = async (id, newYuweet) => {
    // update part of a document without overwriting the entire document
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
      // refFromURL returns reference for given URL
      await storageService.refFromURL(attachmentUrl).delete();
    }
  }

  const addComment = async (id, commentText) => {
    const {myRef} = userObj;
    // get previous dbComment of specific yuweet
    const dbComment = await dbService.doc(`/yuweets/${id}`).get()
      .then((doc) => (doc.data().comment))
      .catch((error) => console.log(error));

    // add new comment to previous dbComment
    dbComment.push({comment:commentText, reference:myRef});
    const commentData = {[`comment`] : dbComment};
    // update comment part of yuweet
    dbService.doc(`yuweets/${id}`).update(commentData);
  }

  const clickLike = async (id) => {
    const {uid, displayName} = userObj;
    // get previous dbLike data of specific yuweet
    const dbLike = await dbService.doc(`yuweets/${id}`).get()
      .then((doc) => (doc.data().like))
      .catch((error) => console.log(error));

    if(!dbLike[uid]) {
      // add id of who likes
      dbLike[uid] = displayName;
    }
    else {
      // delete id of who canceled like
      delete dbLike[uid];  
    }
    
    const likeData = {[`like`] : dbLike};
    // update dbLike of yuweet
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