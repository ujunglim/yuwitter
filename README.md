# Twitter Clone with React and Firebase

## 1. Create React Project

```
npx create-react-app yuwitter
```

---

## 2. Create Firebase Project

```
npm install --save firebase
```

https://firebase.google.com

---

## 3. Git

### initialize git

```
git init
git remote add origin https://github.com/ujunglim/yuwitter
```

### commit and push new version

```
git add .
git commit -m
git push origin master
```

### install github page

```
npm install gh-pages --save-dev
```

### package.json

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

### push to git first, then deploy project to gh-page

```
npm run deploy
```

check out the page

https://ujunglim.github.io/yuwitter

---

## 4. Miscellaneous

```
npm i react-router-dom
npm install uuid
npm install --save styled-components
```

### Font Awesome

```
npm i --save @fortawesome/fontawesome-svg-core
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
