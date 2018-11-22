import { keyframes } from 'styled-components'

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

export { shimmerKeyframe }