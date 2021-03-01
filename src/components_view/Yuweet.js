import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';
import { Shared } from 'components_view/CommonStyle';
import { useYuweets } from 'components_controll/ProvideYuweets';

const defaultPhotoURL = "https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-round-1/254000/19-512.png";

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

  const onSubmit = async (event) => {
    event.preventDefault();
    editYuweet(id, newYuweet);
    setEditing(false);
  }

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
              <YuweetImg src={attachmentUrl} />
              <Shared.FormSumbit type="submit" value="Update yuweet" />
            </form>
          </Container>
        
          <Shared.CancelButton onClick={toggleEditing}>
            Cancel
          </Shared.CancelButton>
        </>
        ) : (
          <>
            <CreatorInfo>
              <CreatorPhoto src={photoURL || defaultPhotoURL}/>
              {displayName}
              <Email>{email.split("@")[0]}</Email>
            </CreatorInfo>
            
            <Text>{text}</Text>
            {attachmentUrl && <YuweetImg src={attachmentUrl} />}
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
  margin-bottom: 3rem;
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

const YuweetImg = styled.img`
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

const CreatorInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const CreatorPhoto = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 0.5rem;
  border-radius: 15px;
`;

const Email = styled.span`
  margin-left: 5px;
  color: grey;
  font-size: 0.8rem;
`;

const Text = styled.p`
  font-size: 14px;
  line-height: 20px;
`;

