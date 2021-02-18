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