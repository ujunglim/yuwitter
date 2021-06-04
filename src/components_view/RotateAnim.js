import { config, useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';
import styled from 'styled-components';

// rotate animation component, it can wrap up any component which wants to have the animation
export default function RotateAnim({children, reference}) {
  const [props, set] = useSpring(() => ({angle: 0, config:config.wobbly}));

  const rotate = () => {
    set({angle:-10}); // rotate left 10 degree
  }

  const rotateBack = () => {
    set({angle:0}); // rotate back
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