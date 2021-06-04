import styled from 'styled-components';
import { DEFAULT_PHOTOURL } from 'constants.js';
import { Shared } from './CommonStyle';
import { useEffect, useState } from 'react';
import { useOthers } from 'components_controll/ProvideOthers';

// Find other user's photoURL by reference
export default function ProfileImg({reference}) {
  const {getPhoto} = useOthers();
  const [photoURL, setPhotoURL] = useState(DEFAULT_PHOTOURL);

  useEffect(() => {
    getPhoto(reference, setPhotoURL); // send reference, setCallback to getPhoto
  }, [reference])
  
  return(
    <ContactImgMask>
      <ContactImg src={photoURL || DEFAULT_PHOTOURL} />
    </ContactImgMask>
  );
}

const ContactImgMask = styled(Shared.ImageMask)`
  width: 3rem;
  height: 3rem;
`;

const ContactImg = styled(Shared.ImgInMask)``;