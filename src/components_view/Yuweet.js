import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';
import { Shared } from 'components_view/CommonStyle';
import { useYuweets } from 'components_controll/ProvideYuweets';
import { DEFAULT_PHOTOURL } from 'constants.js';
import { Favorite, FavoriteBorder, ModeCommentOutlined } from '@material-ui/icons';
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

function Like({id, like}) {
  const {userObj: {uid}} = useUser();
  const myLike = like[uid];
  const dbLikeSize = Object.keys(like).length;

  const [liked, setLiked] = useState(myLike ? true : false);
  const {clickLike} = useYuweets();

  const toggleLike = () => {
    clickLike(id);
    setLiked(prev => !prev)
  }

  return (
    <LikeAction onClick={toggleLike}>
      <LikeHoverDIV>
        {liked === false && (
          <FavoriteBorder></FavoriteBorder>
        )}
        {liked === true && (
          <Favorite style={{color:"#ED4956"}}></Favorite>
        )}
      </LikeHoverDIV>
      
      {dbLikeSize !== 0 && <span>{dbLikeSize}</span>}
    </LikeAction>
  );
}

function Actions({setCommenting, comment, like, id}) {
  const toggleCommenting = () => setCommenting(prev => !prev);

  return(
    <ActionBox>
      <CommentAction onClick={toggleCommenting}>
        <Shared.HoverDIV>
          <ModeCommentOutlined />
        </Shared.HoverDIV>
        {comment && <span>{comment.length}</span>}
      </CommentAction>

      <Like id={id} like={like} />
     
    </ActionBox>
  );
}

function Comments({id, comment}) {
  const [commentText, setCommentText] = useState("");
  const {addComment} = useYuweets();
  const {userObj} = useUser();

  const onCommentChange = (event) => {
    const {target: {value}} = event;
    setCommentText(value);
  }

  const onSubmitComment = () => {
    addComment(id, commentText);
    setCommentText("");
  }

  return (
    <div>
      {comment && comment.map(({photoURL, displayName, comment}, id) => (
        <CommentBox key={id} style={{marginBottom: "0.5rem"}}>
          <CommenterImgMask>
            <Img src={photoURL || DEFAULT_PHOTOURL} />
          </CommenterImgMask>
          
          <CommentBox_right>
            <CommenterInfo>
              {displayName}
            </CommenterInfo>
            {comment}
          </CommentBox_right>

        </CommentBox>
      ))}

      <CommentInputForm onSubmit={onSubmitComment}>
        <div>
          <CommenterImgMask>
            <Img src={userObj.photoURL || DEFAULT_PHOTOURL} />
          </CommenterImgMask>
        </div>

        <Shared.InputText 
          value={commentText}
          type="text"
          placeholder="Write some comments"
          onChange={onCommentChange}
          style={{width: "100%"}}
        />
      </CommentInputForm>
    </div>
  );
}

//====================== Parent Component ===============================
export default function Yuweet({id, displayName, photoURL, isOwner, text, attachmentUrl, email, comment, like}) {
  // update boolean
  const [editing, setEditing] = useState(false);
  const [commenting, setCommenting] = useState(false);
  // update input value
  const [newYuweet, setNewYuweet] = useState(text);

  const onYuweetChange = async (event) => {
    const {target:{value}} = event;
    setNewYuweet(value);
  };

  return (
    <YuweetContainer>
      <YuweetBox>
        <CreatorImgMask>
          <Img src={photoURL || DEFAULT_PHOTOURL}/>
        </CreatorImgMask>

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
              <Actions setCommenting={setCommenting} comment={comment} like={like} id={id}/>
              {commenting && <Comments id={id} comment={comment} />}
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

const CreatorImgBox = styled.div`
  width: 3rem;
  height: 3rem;
  margin-right: 0.7rem;
`;

const CreatorImgMask = styled(Shared.ImageMask)`
  width: 3rem;
  height: 3rem;
  margin-right: 0.7rem;
`;

const Img = styled(Shared.ImgInMask)``;

const CreatorInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const CommenterImgMask = styled(Shared.ImageMask)`
  width: 2rem;
  height: 2rem;

  margin-right: 0.5rem;
  border-radius: 50%;
`;

const CommenterInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 700;
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
  padding: 0.5rem 0 1rem 0;
  display: flex;
  position: relative;
  left: -0.5rem;
`;

const LikeAction = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 4rem;

  &:hover {
    color: #ED4956;
  }
`;

const CommentAction = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 4rem;

  &:hover {
    color: #1DA1F2;
  }
`;

const LikeHoverDIV = styled(Shared.HoverDIV)`
  &:hover {
    background: #ffdde8;
  }
`;

const CommentInputForm = styled(Shared.InputForm)`
  padding: 1rem 0;
`;

const CommentBox_right = styled.div`
  background: #EBEEF0;
  padding: 0.25rem 1rem 0.5rem 1rem;
  border-radius: 1rem;
`;

