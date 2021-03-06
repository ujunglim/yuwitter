import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Shared } from "components_view/CommonStyle";
import { useYuweets } from "components_controll/ProvideYuweets";
import { DEFAULT_PHOTOURL } from "constants.js";
import { Favorite, FavoriteBorder, ModeCommentOutlined} from "@material-ui/icons";
import { useUser } from "components_controll/ProvideAuth";
import { memo } from 'react';
import ProfileImg from './ProfileImg';
import ProfileName from './ProfileName';
import { animated, useSpring } from '@react-spring/web';

//========================= Child Component ==============================
function EditManageBox({ id, newYuweet, setEditing }) {
  const { editYuweet } = useYuweets();
  const toggleEditing = () => setEditing((prev) => !prev); // open and close edit mode

  const onEditSubmitClick = async () => {
    // send id and new text of edited yuweet
    editYuweet(id, newYuweet);
    setEditing(false); // close edit mode
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <Shared.FormSubmit
        type="submit"
        value="Update yuweet"
        onClick={onEditSubmitClick}
      />
      <Shared.CancelButton onClick={toggleEditing}>Cancel</Shared.CancelButton>
    </div>
  );
}

function YuweetManager({ id, attachmentUrl, setEditing }) {
  const { deleteYuweet } = useYuweets();
  const toggleEditing = () => setEditing((prev) => !prev); // set opposite value or previous

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

function Like({ id, like }) {
  const {userObj: { uid }} = useUser();
  const myLike = like[uid]; // check like array to know whether or not I liked before
  const dbLikeSize = Object.keys(like).length; // get how many likes are

  const [liked, setLiked] = useState(myLike ? true : false);
  const { clickLike } = useYuweets();

  const toggleLike = () => {
    clickLike(id);
    setLiked((prev) => !prev); // set opposite value or previous
  };

  return (
    <LikeAction onClick={toggleLike}>
      <LikeHoverDIV>
        {liked === false && <FavoriteBorder></FavoriteBorder>}
        {liked === true && <Favorite style={{ color: "#ED4956" }}></Favorite>}
      </LikeHoverDIV>

      {dbLikeSize !== 0 && <span>{dbLikeSize}</span>}
    </LikeAction>
  );
}

function Actions({ setCommenting, comment, like, id }) {
  const onClickComment = () => {
    setCommenting((prev) => !prev); // open or close comment box
  };

  return (
    <ActionBox>
      <CommentAction onClick={onClickComment}>
        <Shared.HoverDIV>
          <ModeCommentOutlined />
        </Shared.HoverDIV>
        {comment.length !== 0  && <span>{comment.length}</span>}
      </CommentAction>

      <Like id={id} like={like} />
    </ActionBox>
  );
}

function Comments({ id, comment}) {
  const [commentText, setCommentText] = useState("");
  const { addComment } = useYuweets();
  const { userObj } = useUser();

  const onCommentChange = (event) => {
    const {target: { value }} = event;
    setCommentText(value); // show changed comment
  };

  const onSubmitComment = (event) => {
    event.preventDefault();
    // return when empty comment has submitted
    if(commentText == "") {
      return;
    }
    addComment(id, commentText);
    setCommentText("");
  };

  return (
    <>
      {comment && comment.map(({ comment, reference }, id) => (
        <CommentBox key={id} style={{ marginBottom: "0.5rem" }}>
          <ProfileImg reference={reference} />
          <CommentBox_right>
            <ProfileName reference={reference} />
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
          style={{ width: "100%" }}
          required
        />
      </CommentInputForm>
    </>
  );
}

//====================== Parent Component ===============================
export default memo(function Yuweet({
  id,
  creatorRef,
  isOwner,
  text,
  attachmentUrl,
  email,
  comment,
  like
}) {
  
  // update boolean
  const [editing, setEditing] = useState(false);
  const [commenting, setCommenting] = useState(false);
  // update input value
  const [newYuweet, setNewYuweet] = useState(text);

  const onYuweetChange = async (event) => {
    const {target: { value }} = event;
    setNewYuweet(value);
  };

  // ============= spring animation ==============
  const [props, set] = useSpring(() => ({ xys:[0, 0, 1], config: { mass:15, tension: 350, friction: 60 } }));

  const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`  
  // animation depends on mouse move
  const onMouseMove = ({ clientX, clientY, currentTarget:dom }) => {
    const {left, top, width, height} = dom.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;

    const newX = -(y - height / 2) / height * 10;
    const newY = (x - width / 2) / width * 10;
    const newScale = 1.03;
    // set animation props
    set({ xys: [newX, newY, newScale] });
  }

  return (
    <YuweetContainer
      onMouseMove={onMouseMove}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{ transform: props.xys.to(trans) }}
    >

      <YuweetBox>
        {creatorRef && <ProfileImg reference={creatorRef} />}

        <Shared.Container style={{ width: "494px" }}>
          <CreatorInfo>
            {creatorRef && <ProfileName reference={creatorRef} />}
            <Email>@{email.split("@")[0]}</Email>
          </CreatorInfo>

          {/* is editing yuweet or not */}
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
              {/* if attachment exists show it */}
              {attachmentUrl && <YuweetImg src={attachmentUrl} />}
              <EditManageBox
                id={id}
                newYuweet={newYuweet}
                setEditing={setEditing}
              />
            </>
          ) : (
            <>
              <Text>{text}</Text>
              {attachmentUrl && <YuweetImg src={attachmentUrl} />}
              {isOwner && (
                <YuweetManager
                  id={id}
                  attachmentUrl={attachmentUrl}
                  setEditing={setEditing}
                />
              )}
              <Actions
                setCommenting={setCommenting}
                comment={comment}
                like={like}
                id={id}
              />
              {commenting && <Comments id={id} comment={comment}/>}
            </>
          )}
        </Shared.Container>
      </YuweetBox>
    </YuweetContainer>
  );
})

//================= Styled Components ====================
const YuweetContainer = styled(animated.div)`
  margin: 1rem 0;
  padding: 20px;
  position: relative;
  color: rgba(0, 0, 0, 0.8);
  border-top: 1px solid #ebeef0;
  border-bottom: 1px solid #ebeef0;
  background: white;

  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.5s;
  will-change: transform;

  &:hover {
    box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  }
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

const Email = styled.span`
  margin-left: 5px;
  color: grey;
  font-weight: lighter;
`;

const Text = styled.p`
  font-size: 1rem;
  line-height: 20px;

  white-space: pre-wrap; /* CSS3 */
  white-space: -moz-pre-wrap; /* Firefox */
  white-space: -pre-wrap; /* Opera <7 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* IE */
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
    color: #ed4956;
  }
`;

const CommentAction = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 4rem;

  &:hover {
    color: #1da1f2;
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
  background: #ebeef0;
  padding: 0.25rem 1rem 0.5rem 1rem;
  border-radius: 1rem;
`;