import { config, useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';
import styled from 'styled-components';

export default function RotateAnim({children, reference}) {
  const [props, set] = useSpring(() => ({angle: 0, config:config.wobbly}));

  const rotate = () => {
    set({angle:-10});
  }

  const rotateBack = () => {
    set({angle:0});
  }

  reference.current = {rotate, rotateBack};
  
  return(
    <AnimDiv style={{transform: props.angle.to((a) => `rotate(${a}deg)`)}}>
      {children}
    </AnimDiv>
  );
}

//================= Styled Components ====================
const AnimDiv = styled(animated.div)`
  will-change: transform;
`;