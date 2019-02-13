import styled, {
  keyframes,
  css,
} from 'styled-components';

function shimmerKeyframe(_from, _to) {
  return keyframes`
    0% {
      background-position: ${_from} 0;
    }
    100% {
      background-position: ${_to} 0;
    }
  `;
}

const Shimmer = styled.div`
  height: 40px;
  width: 150px;
  margin: 0.5rem auto;
  position: relative;
  background: linear-gradient(to right, #FF3E4A 8%, #D00B17 18%, #FF3E4A 33%);
  animation-fill-mode: forwards;
  animation: ${() => css`${shimmerKeyframe('-150px', '150px')}`} 2s linear infinite;
`;

export default Shimmer;
