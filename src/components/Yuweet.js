import { dbService, storageService } from 'fbase';
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';
import { Shared } from './CommonStyle';

const Yuweet = ({yuweetObj, isOwner, userObj}) => {
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

  console.log()
  return (
    <YuweetContainer>
      {editing ? (
        <>          
          <Container>
            <form onSubmit={onSubmit}>
              <Shared.FormInput 
                type="text"
                placeholder="Edit your yuweet"
                value={newYuweet} 
                required
                autoFocus
                onChange={onChange}
                maxLength={120}
              />
              <Shared.FormSumbit type="submit" value="Update yuweet" />
            </form>
          </Container>
        
          <Shared.CancelButton onClick={toggleEditing}>
            Cancel
          </Shared.CancelButton>
        </>
        ) : (
          <>
            <WriterInfo>
              {userObj.displayName}
              <Email>{userObj.email.substring(0, userObj.email.indexOf("@"))}</Email>
            </WriterInfo>
            <h2 style={{ fontSize: 14 }}>{yuweetObj.text}</h2>
            {yuweetObj.attachmentUrl && <Img src={yuweetObj.attachmentUrl} />}
            {isOwner && (
              <YuweetActions>
                <Action onClick={onDeleteClick}>
                  <FontAwesomeIcon icon={faTrash} />
                </Action>
                <Action onClick={toggleEditing}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </Action>
              </YuweetActions>
            )}
          </>
        )
      }	
		</YuweetContainer>
  );
};

//================= Styled Components ====================
const YuweetContainer = styled(Shared.Container)`
  margin-bottom: 20px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  color: rgba(0, 0, 0, 0.8);
`;

const Container = styled(Shared.Container)`
  cursor: pointer;
  margin-bottom: 5px;
`;

const Img = styled.img`
  border-radius: 10px;
  margin-top: 10px;
`;

const YuweetActions = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const Action = styled.span`
  cursor: pointer;
  margin: 0 10px 10px 0;
`;

const WriterInfo = styled.h1`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Email = styled.span`
  margin-left: 5px;
  color: grey;
  font-size: 0.8rem;
`;


export default Yuweet;
