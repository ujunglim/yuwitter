import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';
import { Shared } from 'components_view/CommonStyle';
import { useYuweets } from 'components_controll/ProvideYuweets';
import { DEFAULT_PHOTOURL } from 'constants.js';

export default function Yuweet({id, displayName, photoURL, isOwner, text, attachmentUrl, email}) {
  // update boolean
  const [editing, setEditing] = useState(false);
  // update input value
  const [newYuweet, setNewYuweet] = useState(text);
  const {editYuweet, deleteYuweet} = useYuweets();

  const onDeleteClick = async () => {
    deleteYuweet(id, attachmentUrl);
  };

  const toggleEditing = () => setEditing(prev => !prev);

  const onChange = async (event) => {
    const {target:{value}} = event;
    setNewYuweet(value);
  };

  const onSubmitClick = async () => {
    editYuweet(id, newYuweet);
    setEditing(false);
  }

  return (
    <YuweetContainer>
      <YuweetBox>
        <CreatorPhoto src={photoURL || DEFAULT_PHOTOURL}/>

        <Shared.Container style={{width: "494px"}}>
          <CreatorInfo>
            {displayName}
            <Email>@{email.split("@")[0]}</Email>
          </CreatorInfo>
          
          {editing ? (
            <>
              <Shared.InputTextArea
                value={newYuweet} 
                onChange={onChange} 
                type="text" 
                placeholder="Edit your yuweet" 
                maxLength={100} 
                required
                autoFocus
              />

              {attachmentUrl && <YuweetImg src={attachmentUrl} />}

              <ActionDIV>
                <Shared.FormSubmit type="submit" value="Update yuweet" onClick={onSubmitClick}/>
                <Shared.CancelButton onClick={toggleEditing}>
                  Cancel
                </Shared.CancelButton>
              </ActionDIV>
            </>
          ) : (
            <>
              <div style={{display: "block"}}><Text>{text}</Text></div>
              
              {attachmentUrl && <YuweetImg src={attachmentUrl} />}

              {isOwner && (
                <YuweetActions>
                  <Action onClick={toggleEditing}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </Action>
                  <Action onClick={onDeleteClick}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Action>
                </YuweetActions>
              )}
            </>
          )}

        </Shared.Container>
      </YuweetBox>
    </YuweetContainer>
  );
};

//================= Styled Components ====================
const YuweetContainer = styled.div`
  margin: 1rem 0;
  padding: 20px;
  position: relative;
  color: rgba(0, 0, 0, 0.8);
  border-top: 1px solid #EBEEF0;
  border-bottom: 1px solid #EBEEF0;
`;

const YuweetBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const CreatorPhoto = styled(Shared.ProfilePhoto)``;

const CreatorInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Email = styled.span`
  margin-left: 5px;
  color: grey;
  font-weight: lighter;
`;

const Text = styled.p`
  font-size: 1rem;
  line-height: 20px;

  white-space: pre-wrap;      /* CSS3 */   
  white-space: -moz-pre-wrap; /* Firefox */    
  white-space: -pre-wrap;     /* Opera <7 */   
  white-space: -o-pre-wrap;   /* Opera 7 */    
  word-wrap: break-word;      /* IE */
`;

const YuweetImg = styled.img`
  width: 100%;
  border-radius: 1rem;
  margin-top: 1rem;
`;

const ActionDIV = styled.div`
  display: flex;
  justify-content: space-around;
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


