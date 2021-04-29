import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';
import { Shared } from 'components_view/CommonStyle';
import { useYuweets } from 'components_controll/ProvideYuweets';
import { DEFAULT_PHOTOURL } from 'constants.js';
import { FavoriteBorderOutlined, ModeCommentOutlined } from '@material-ui/icons';
import { useUser } from 'components_controll/ProvideAuth';

//========================= Child Component ==============================
function EditManageBox({id, newYuweet, setEditing}) {
  const {editYuweet} = useYuweets();
  const toggleEditing = () => setEditing(prev => !prev);
  
  const onEditSubmitClick = async () => {
    editYuweet(id, newYuweet);
    setEditing(false);
  }

  return (
    <div style={{display: "flex", justifyContent: "space-around"}}>
      <Shared.FormSubmit type="submit" value="Update yuweet" onClick={onEditSubmitClick}/>
      <Shared.CancelButton onClick={toggleEditing}>
        Cancel
      </Shared.CancelButton>
    </div>
  );
}

function YuweetManager({id, attachmentUrl, setEditing}) {
  const {deleteYuweet} = useYuweets();

  const toggleEditing = () => setEditing(prev => !prev);

  const onDeleteClick = async () => {
    deleteYuweet(id, attachmentUrl);
  };

  return (
    <ManagerBox>
      <ManagerSpan onClick={toggleEditing}>
        <FontAwesomeIcon icon={faPencilAlt} />
      </ManagerSpan>
      <ManagerSpan onClick={onDeleteClick}>
        <FontAwesomeIcon icon={faTrash} />
      </ManagerSpan>
    </ManagerBox>
  );
}

function Actions() {
  const onCommentClick = () => {
    console.log("clicked")
  }

  return(
    <ActionBox>
      <Action onClick={onCommentClick}>
        <ModeCommentOutlined></ModeCommentOutlined>
      </Action>

      <Action style={{marginLeft: "0.5rem"}}>
        <FavoriteBorderOutlined></FavoriteBorderOutlined>
      </Action>
    </ActionBox>
  );
}

function Comments() {
  const [comment, setComment] = useState("");
  const {userObj} = useUser();

  const onCommentChange = (event) => {
    const {target: {value}} = event;
    setComment(value);
  }

  const onSubmitComment = () => {
    setComment("");
  }

  return (
    <CommentContainer>
      {/* <CommentBox>
        <CommenterPhoto src={userObj.photoURL || DEFAULT_PHOTOURL} />
        <CreatorInfo>
          {userObj.displayName}
          <Email>@{userObj.email.split("@")[0]}</Email>
        </CreatorInfo>
      </CommentBox> */}

      <CommentInputForm onSubmit={onSubmitComment}>
        <CommenterPhoto src={userObj.photoURL || DEFAULT_PHOTOURL} />

        <Shared.InputText 
          value={comment}
          type="text"
          placeholder="Write some comments"
          onChange={onCommentChange}
          style={{width: "100%"}}
        />


      </CommentInputForm>
    </CommentContainer>
  );
}

//====================== Parent Component ===============================
export default function Yuweet({id, displayName, photoURL, isOwner, text, attachmentUrl, email}) {
  // update boolean
  const [editing, setEditing] = useState(false);
  // update input value
  const [newYuweet, setNewYuweet] = useState(text);


  const onYuweetChange = async (event) => {
    const {target:{value}} = event;
    setNewYuweet(value);
  };

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
              <EditManageBox id={id} newYuweet={newYuweet} setEditing={setEditing} />
            </>
          ) : (
            <>
              <Text>{text}</Text>
              {attachmentUrl && <YuweetImg src={attachmentUrl} />}
              {isOwner && <YuweetManager id={id} attachmentUrl={attachmentUrl} setEditing={setEditing} />}
              <Actions />
              <Comments />
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

const CommentContainer = styled.div``;

const CommentBox = styled.div``;

const CommentInputForm = styled(Shared.InputForm)``;
const CommenterPhoto = styled(Shared.SmallProfilePhoto)``;
