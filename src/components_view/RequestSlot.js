import { REQUESTING, ACCEPTING, FRIEND } from 'constants.js'

export default function RequestSlot({requestObj}) {
  return(
    <div>
      <img src={requestObj.photoURL} width="30px" heigh="30px"/>
      <span>{requestObj.displayName}</span>
      {(requestObj.state === REQUESTING) && <span>Sent</span> }      
      {(requestObj.state === ACCEPTING) && <button>Accept</button> }      
      {(requestObj.state === FRIEND) && <span>Added</span> }      
    </div>
  );
}

 // requestObj = { 
    //   id: 1,
    //   displayName: "Stephen",
    //   state: REQUESTING,
    //   photoURL: "https://firebasestorage.googleapis.com/v0/b/yuwitter-d54e2.appspot.com/o/ProfilePhoto%2F02GSNU55pUdtsA17dfyZ6dChi9r1?alt=media&token=31c66015-c05f-46db-9784-af3f45eaeb79"
    // }

