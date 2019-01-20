import styled, { css } from 'styled-components';
import { shimmerKeyframe } from '_contentLoaders';

const TextAreaField = styled.div`
  width: 100%;
  height: 100px;
  margin: 0.5rem;
  background-size: 100% 50px;
  borderRadius: '5px'
  position: relative;
  background: #f6f7f8;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  animation-fill-mode: forwards;
  animation: ${() => css`${shimmerKeyframe('-100vw', '100vw')}`} 2s linear infinite;
`;

export { TextAreaField };
