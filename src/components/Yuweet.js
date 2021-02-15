import { dbService, storageService } from 'fbase';
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Yuweet = ({yuweetObj, isOwner}) => {
  // update boolean
  const [editing, setEditing] = useState(false);
  // update input value
  const [newYuweet, setNewYuweet] = useState(yuweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure delete yutweet?");
    if(ok) {
      // delete yuweet
      await dbService.doc(`yuweets/${yuweetObj.id}`).delete();
      // delete attachment
      await storageService.refFromURL(yuweetObj.attachmentUrl).delete();
    }
  };

  const toggleEditing = () => setEditing(prev => !prev);

  const onChange = async (event) => {
    const {target:{value}} = event;
    setNewYuweet(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    
    await dbService.doc(`yuweets/${yuweetObj.id}`).update({
      text: newYuweet
    });
    setEditing(false);
  }

  return (
    <div className="yuweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container yuweetEdit">
            <input 
              className="formInput"
              type="text"
              placeholder="Edit your yuweet"
              value={newYuweet} 
              required
              autoFocus
              onChange={onChange}
              maxLength={120}
            />
            <input type="submit" value="Update yuweet" className="formBtn"/>
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
        ) : (
          <>
            <h4>{yuweetObj.text}</h4>
            {yuweetObj.attachmentUrl && <img src={yuweetObj.attachmentUrl} />}
            {isOwner && (
              <div class="yuweet_actions">
                <span onClick={onDeleteClick}>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
                <span onClick={toggleEditing}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
              </div>
            )}
          </>
        )
      }	
		</div>
  );
};

export default Yuweet;