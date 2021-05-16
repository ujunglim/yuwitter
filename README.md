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

### - State

Partially get comment when user click yuweet, whether than getting comments of all yuweets <br>

```js
const [dbComment, setDBComment] = useState([]); // wrtie to db
const [comment, setComment] = useState([]); // read to UI
```

dbComment is original object in db. ex) {comment, reference} <br>
comment is a mutated object which added commenter's info by using reference. ex) {comment, displayName, photoURL}<br><br>

### - getComment (Model, Control)

When user clicked comment, get comment

```js
const getComment = (id) => {
  dbService.doc(`/yuweets/${id}`).onSnapshot(async (snapshot) => {
    const data = snapshot.data();
    const dbCommentArr = [];
    const commentArr = [];

    if (data.comment) {
      const { comment } = data;

      for (let i = 0; i < comment.length; ++i) {
        const { reference } = comment[i];
        const commenterData = (await reference.get()).data();

        const dbCommentObj = {
          comment: comment[i].comment,
          reference,
        };
        dbCommentArr.push(dbCommentObj);

        //========= mutate comment obj ===========
        const commentObj = {
          photoURL: commenterData.photoURL,
          displayName: commenterData.displayName,
          comment: comment[i].comment,
        };
        commentArr.push(commentObj);
      }
      setDBComment(dbCommentArr);
      setComment(commentArr);
    }
  });
};
```

<br>

### - addComment (Model, Control)

Got previous dbComment above, then add and update new comment to db.

```js
const addComment = (id, commentText) => {
  const { myRef } = userObj;
  // add new comment to previous dbComment
  dbComment.push({ comment: commentText, reference: myRef });
  const commentData = { [`comment`]: dbComment };
  dbService.doc(`yuweets/${id}`).update(commentData);
};
```

<br>

### - View

```js
const { getComment, addComment, comment } = useYuweets();

const onClickComment = () => {
  getComment(id);
};

const onSubmitComment = () => {
  addComment(id, commentText);
};

return (
  {comment &&
    comment.map(({ photoURL, displayName, comment }, id) => (
      <Img src={photoURL || DEFAULT_PHOTOURL} />
      <CommenterInfo>{displayName}</CommenterInfo>
      {comment}
    ));
  }
)
```

### useMemo

memo only checks for prop changes. <br>
https://reactjs.org/docs/react-api.html#reactmemo
