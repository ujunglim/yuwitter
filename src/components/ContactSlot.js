const ContactSlot = ({contactObj}) => {
  return(
    <div>
      <img src={contactObj.photoURL} width="30px" heigh="30px"/>
      <span>{contactObj.displayName}</span>
    </div>
  );
}

// contactObj = { 
//   id: 1,
//   displayName: "Stephen",
//   photoURL: "https://firebasestorage.googleapis.com/v0/b/yuwitter-d54e2.appspot.com/o/ProfilePhoto%2F02GSNU55pUdtsA17dfyZ6dChi9r1?alt=media&token=31c66015-c05f-46db-9784-af3f45eaeb79"
// }

export default ContactSlot;