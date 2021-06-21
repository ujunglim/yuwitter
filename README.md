# Twitter Clone with React and Firebase

![preview](src/image/preview.gif)

## [Check it out👆](https://ujunglim.github.io/yuwitter)

## Firebase, React, React-spring, hook(useState, useEffect, useMemo, useContext), custom Hook, Context API

Email, Google, Github, Social Authentication
Tweet CRUD
Protected Pages
Profile Page
File Upload
Deploy
API Key Security

## 1. Project Set Up

### 1.1 Create Project

Create React Project

```
npx create-react-app yuwitter
```

Create Firebase Project

https://firebase.google.com

```
npm install --save firebase
```

### 1.2 Git, GitHub Page

initialize git

```
git init
git remote add origin https://github.com/ujunglim/yuwitter
```

commit and push new version

```
git add .
git commit -m
git push origin master
```

install github page

```
npm install gh-pages --save-dev
```

push to git first, then deploy project to gh-page

```
npm run deploy
```

### 1.3 package.json

```json
{
  "homepage": "https://ujunglim.github.io/yuwitter",
  "scripts": {
    "deploy": "gh-pages -d build",
    "predeploy": "npm run build",
    "build": "react-scripts build"
  }
}
```

### 1.4 Initialize Firebase

```js
firebase.initializeApp(firebaseConfig);
export const firebaseInstance = firebase;
export const authService = firebase.auth(); // suppors authentication backend services
export const dbService = firebase.firestore(); // supports cloud-hosted, NoSQL database
export const storageService = firebase.storage(); // supports user generated content, such as images and video
```

### 1.5 Routes

```
npm i react-router-dom
```

### 1.6 Project Structure

- `components_controll`: take 'Controll' and 'Model' parts
- `components_view`: only in change of 'View' part
- routes

---

## 2. Auth

> `authService` Gets the authentication service for the default app or the specified app. You can call `authService` with no arguments to access the main app's auth service, or call it with firebase.auth(app) to access the auth service associated with a specific app.

#### 2.1 New User Sign Up

> Create a form that allows new users to sign up for your app using their email address and password. When the user fills out the form, the email address and password entered by the user are validated and passed to the `createUserWithEmailAndPassword()` method.

```js
authService
  .createUserWithEmailAndPassword(email, password)
  .then((user) => {
    // Signed In
  })
  .catch((error) => {
    // Error Handler
  });
```

#### 2.2 Existing user login

> Create a form that allows existing users to log in using their email address and password. When the user fills out the form, call the `signInWithEmailAndPassword()` method.

```js
authService
  .signInWithEmailAndPassword(email, password)
  .then((user) => {
    // Sign in
  })
  .catch((error) => {
    // Error Handler
  });
```

#### 2.3 Set up authentication state observer and get user data

> Attach an observer to the global authentication object for each app page that needs information about the logged-in user. This observer is called whenever the user's login state changes. Attach the observer using the `onAuthStateChanged()` method. When a user is logged in, you can get information about the user from an observer.

```js
// add observer for changes to user's sign-in state
authService.onAuthStateChanged(async (user) => {
  if (user) {
    // User is signed in, set UserObj
    // For more props: https://firebase.google.com/docs/reference/js/firebase.User
    setUserObj({
      displayName: user.displayName,
      //...
    });
  } else {
    //  User is signed out, set UserObj as null
    setUserObj(null);
  }
});
```

#### 2.4 Social Log In

> Integrate social login into app to allow users to authenticate to Firebase with their social accounts by using `GoogleAuthProvider`, `GithubAuthProvider`, `signInWithPopup`.

```js
const google = new firebaseInstance.auth.GoogleAuthProvider();
userCredential = await authService.signInWithPopup(google);

const github = new firebaseInstance.auth.GithubAuthProvider();
userCredential = await authService.signInWithPopup(github);
```

### 2.5 Log Out

To log a user out, call `signOut()`.

```js
authService.signOut();
```

### 2.6 Keep Log In

> setPersistence
> https://firebase.google.com/docs/reference/js/firebase.auth.Auth#setpersistence

---

## 3. Firestore Database

> Firestore is a NoSQL cloud database provided by Firebase. It can store and synchronize data used for client and server-side development. Created by Cloud Firestore from the Firebase project build list.

- Collection (folder): group of documents.
- Document (doc): compose collection

> https://firebase.google.com/docs/reference/js/firebase.firestore.Firestore#collection

### 3.1 Create Collection, Add data

> `add()`Add new document to collection with specific data, assigning it a document ID automatically.

```js
await dbService.collection("yuweets").add(yuweetObj);
```

> To create or overwrite a single document, use the `set()` method.

```js
dbService.collection("yuweets").doc("tweet").set(tweetInfo);
```

### 3.2 Update Data

> To update part of a document without overwriting the entire document, use the `update()` method.

```js
dbService.doc(`yuweets/${id}`).update({ text: newYuweet });
```

> To delete a document, use the `delete()` method.

```js
// delete yuweet
dbService.doc(`yuweets/${id}`).delete();
```

### 3.3 Get Data

> To get all documents in a collection, use the `get()` method.<br>
> .data() Retrieves all fields in document as an Object.

```js
dbService
  .doc(`/yuweets/${id}`)
  .get()
  .then((doc) => console.log(doc.data()))
  .catch((error) => console.log(error));
```

### 3.4 Get Realtime Data

> Get realtime updates with the `onSnapshot()` method. The first time the user-supplied callback is called, a document snapshot is immediately created with the current contents of a single document. Then whenever the contents change, the callback is called to update the document snapshot.

```js
useEffect(() => {
  // delete onSnapshot observer of previous user
  cancelOnSnaphot && cancelOnSnaphot.run();

  const cancelFunc = dbService.collection("yuweets").onSnapshot((snapshot) => {
    const yuweetArray = snapshot.docs.map((doc) => ({ ...doc.data() }));
    setYuweets({ list: yuweetArray });
  });

  setCancelOnSnaphot({ run: cancelFunc });
}, [userObj]);
```

> OnSnapshot makes app run faster because it re-renders less. <br>Plus, it's realtime, so you can see changes in real time and automatically (no need to refresh)

---

## 4. Firebase storage

> It supports user generated content, such as images and video

### 4.1 Read File and get data

```js
const onChangeFile = (event) => {
  const {
    target: { files },
  } = event;
  const theFile = files[0]; // get one file

  // create reader and start reading file
  const reader = new FileReader();

  // add event listener to reader
  // it is triggered when reading is finished, and return finishedEvent
  reader.onloadend = (finishedEvent) => {
    const {
      currentTarget: { result },
    } = finishedEvent;
    setAttachment(result);
    document.getElementById("attach_file").value = null;
  };
  // read data after get finishedEvent
  reader.readAsDataURL(theFile);
};
```

### 4.2 Upload to Storage

```js
// get reference of attachment file
const attachmentRef = storageService
  .ref()
  .child(`Yuweet/${userObj.email}/${uuidv4()}`);

// putString() uploads string data to storage
const response = await attachmentRef.putString(attachment, "data_url");
// download url from reference
attachmentUrl = await response.ref.getDownloadURL();
```

### 4.3 Delete from Storage

> `refFromURL` returns reference for given URL

```js
await storageService.refFromURL(attachmentUrl).delete();
```

---

## 4. Miscellaneous

```
npm install uuid
npm install --save styled-components
```

### Font Awesome

```
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-fontawesome
npm install --save @fortawesome/free-brands-svg-icons
```

---

## Chats

when state: 0 (CHAT.SENT), chat in local is string.
when state: 1 (CHAT.RECEIVED), chat in local is array (cuz needs order or chats)

```
0: {chats: "1", state: 0}
1: {chats: "2", state: 0}
2: {chats: "3", state: 0}
3: {chats: ["4"], state: 1}
4: {chats: ["5", "6"], state: 1
```

---

## Active Navigation Element when clicked

When Nav LinkBox is clicked, elements(icon, span) inside of HoverDIV needs to change color.<br>

There's some way to manipulate Component's style dynamically, such as using state, ref, list..<br>

- It's not allowed to use one useRef for multiple elements <br>

- Plus, Hooks can't be used in loops <br><br>
  So I chose state

```js
const [isActive, setIsActive] = useState(new Array(8).fill(false));

const switchActive = (index) => {
  // clear all
  isActive.fill(false);
  // make one as active
  isActive[index] = true;
  setIsActive([...isActive]);
};

<LinkBox to="/" onClick={() => switchActive(0)}>
  <HoverDIV isActive={isActive[0]}>
    <HomeOutlined fontSize="large" />
    <NavSpan>Home</NavSpan>
  </HoverDIV>
</LinkBox>;

//=================== Styled Components ==================
const HoverDIV = styled.div`
  color: ${(props) => (props.isActive ? "#1DA1F2" : "none")};
`;
```

Pass props to manipulate styled components<br>
https://styled-components.com/docs/basics#adapting-based-on-props

---

## Comment

In yuweetArray there's comment as {comment, reference} <br>

<br>

### - addComment (Model, Control)

Get previous dbComment, then add and update new comment to db.

```js
const addComment = (id, commentText) => {
  const { myRef } = userObj;
  // get previous dbComment
  const dbComment = await dbService
    .doc(`/yuweets/${id}`)
    .get()
    .then((doc) => doc.data().comment)
    .catch((error) => console.log(error));

  // add new comment to previous dbComment
  dbComment.push({ comment: commentText, reference: myRef });
  const commentData = { [`comment`]: dbComment };
  dbService.doc(`yuweets/${id}`).update(commentData);
};
```

<br>

### - View

```js
const { addComment } = useYuweets();

const onSubmitComment = () => {
  addComment(id, commentText);
};
```

- ProvideOthers

export 2 function hooks which get (reference, setCallback func) as parameter, then get data of the reference, and set new State. <br>

```js
export default function ProvideOthers({ children }) {
  const getPhoto = async (reference, setCallback) => {
    const { photoURL } = (await reference.get()).data();
    setCallback(photoURL);
  };

  const getName = async (reference, setCallback) => {
    const { displayName } = (await reference.get()).data();
    setCallback(displayName);
  };

  const contextValue = { getPhoto, getName };

  return (
    <othersContext.Provider value={contextValue}>
      {children}
    </othersContext.Provider>
  );
}

//================= Hook ===================
export const useOthers = () => {
  const others = useContext(othersContext);
  return others;
};
```

- ProfileImg Component

  Pass reference and setCallback to getPhoto hook, then return view.<br>

```js
export default function ProfileImg({ reference }) {
  const { getPhoto } = useOthers();
  const [photoURL, setPhotoURL] = useState(DEFAULT_PHOTOURL);

  useEffect(() => {
    getPhoto(reference, setPhotoURL);
  }, [reference]);

  return (
    <ContactImgMask>
      <ContactImg src={photoURL || DEFAULT_PHOTOURL} />
    </ContactImgMask>
  );
}
```

- ProfileName Component

  Pass reference and setCallback to getName hook, then return view.<br>

```js
export default function ProfileName({ reference }) {
  const { getName } = useOthers();
  const [name, setName] = useState("");

  useEffect(() => {
    getName(reference, setName);
  }, [reference]);

  return <CommenterInfo>{name}</CommenterInfo>;
}
```

use those above 2 components

```js
return (
  {comment && comment.map(({ comment, reference }, id) => (
    <CommentBox key={id}>
      <ProfileImg reference={reference} />
      <div>
        <ProfileName reference={reference} />
        {comment}
      </div>
    </CommentBox>
  ))}
)
```

### useMemo

memo only checks for prop changes. <br>
https://reactjs.org/docs/react-api.html#reactmemo

### Spring

## Element.getBoundingClientRect()

<br>
https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect

---

## Profile Info

1. Background Photo
2. Profile Photo
3. Name
4. Bio
5. Location
6. Website

Available to edit above information.

Added validation to website input

```

```
