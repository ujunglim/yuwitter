import styled from 'styled-components';
import { DEFAULT_PHOTOURL } from 'constants.js';
import { Shared } from './CommonStyle';
import { useEffect, useState } from 'react';
import { useOthers } from 'components_controll/ProvideOthers';

export default function ProfileImg({reference}) {
  const {getPhoto} = useOthers();
  const [photoURL, setPhotoURL] = useState(DEFAULT_PHOTOURL);

  useEffect(() => {
    getPhoto(reference, setPhotoURL);
  }, [reference])
  
  return(
    <ContactImgMask>
      <ContactImg src={photoURL || DEFAULT_PHOTOURL} />
    </ContactImgMask>
  );
}

const ContactImgMask = styled(Shared.ImageMask)`
  width: 2rem;
  height: 2rem;
`;

const ContactImg = styled(Shared.ImgInMask)``;