import { useEffect, useState } from 'react';
import { useOthers } from 'components_controll/ProvideOthers';
import styled from 'styled-components';

// Find other user's displayName by reference
export default function ProfileName({reference}) {
  const {getName} = useOthers();
  const [name, setName] = useState('');

  useEffect(() => {
    getName(reference, setName); // send reference, setCallback to getName
  }, [reference])

  return(<CommenterInfo>{name}</CommenterInfo>);
}

//================= Styled Components ====================
const CommenterInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 700;
`;
