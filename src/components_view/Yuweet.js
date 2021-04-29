import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';
import { Shared } from 'components_view/CommonStyle';
import { useYuweets } from 'components_controll/ProvideYuweets';
import { DEFAULT_PHOTOURL } from 'constants.js';
import { FavoriteBorderOutlined, ModeCommentOutlined } from '@material-ui/icons';
import { useUser } from 'components_controll/ProvideAuth';

export default function Yuweet({id, displayName, photoURL, isOwner, text, attachmentUrl, email}) {
  // update boolean
  const [editing, setEditing] = useState(false);
  // update input value
  const [newYuweet, setNewYuweet] = useState(text);
  const {editYuweet, deleteYuweet} = useYuweets();
  const {userObj} = useUser();
  const [comment, setComment] = useState("")

  const onDeleteClick = async () => {
    deleteYuweet(id, attachmentUrl);
  };

  const toggleEditing = () => setEditing(prev => !prev);

  const onYuweetChange = async (event) => {
    const {target:{value}} = event;
    setNewYuweet(value);
  };

  const onEditSubmitClick = async () => {
    editYuweet(id, newYuweet);
    setEditing(false);
  }

  //=============== Actions ==================
  const onCommentClick = () => {
    console.log("clicked")
  }

  const onCommentChange = (event) => {
    const {target: {value}} = event;
    setComment(value);
    console.log(value)
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
                onChange={onYuweetChange} 
                type="text" 
                placeholder="Edit your yuweet" 
                maxLength={100} 
                required
                autoFocus
              />

              {attachmentUrl && <YuweetImg src={attachmentUrl} />}

              <ActionDIV>
                <Shared.FormSubmit type="submit" value="Update yuweet" onClick={onEditSubmitClick}/>
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
                <ManagerBox>
                  <ManagerSpan onClick={toggleEditing}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </ManagerSpan>
                  <ManagerSpan onClick={onDeleteClick}>
                    <FontAwesomeIcon icon={faTrash} />
                  </ManagerSpan>
                </ManagerBox>
              )}

              <ActionBox>
                <Action onClick={onCommentClick}>
                  <ModeCommentOutlined></ModeCommentOutlined>
                </Action>

                <Action style={{marginLeft: "0.5rem"}}>
                  <FavoriteBorderOutlined></FavoriteBorderOutlined>
                </Action>
              </ActionBox>

              <CommentContainer>
                <CommentBox>
                  <CommenterPhoto src={userObj.photoURL || DEFAULT_PHOTOURL} />
                  <CreatorInfo>
                    {userObj.displayName}
                    <Email>@{userObj.email.split("@")[0]}</Email>
                  </CreatorInfo>
                </CommentBox>

                <CommentInputForm>
                  <Shared.InputText 
                    value={comment}
                    type="text"
                    placeholder="Write some comments"
                    onChange={onCommentChange}
                    style={{width: "100%"}}
                  />


                </CommentInputForm>
                
              </CommentContainer>
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

const ManagerBox = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const ManagerSpan = styled.span`
  cursor: pointer;
  margin: 0 10px 10px 0;
`;


const ActionBox = styled.div`
  padding: 0.5rem 0;
  display: flex;
`;

const Action = styled.div`
  display: flex;
  cursor: pointer;
`;

const CommentContainer = styled.div`
  background: pink;
`;

const CommentBox = styled.div`
  background: lightgreen;
`;

const CommentInputForm = styled(Shared.InputForm)``;
const CommenterPhoto = styled(Shared.SmallProfilePhoto)``;