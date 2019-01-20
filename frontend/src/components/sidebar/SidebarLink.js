import { Link } from 'react-router-dom';

import styled from 'styled-components';

const SidebarLink = styled(Link)`
  width: 100%;
  display: block;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    color: ${SECONDARY_COLOR}
  }
  text-decoration: none;
  font-size: 14px;
  color: ${props => props.shouldHighlight ? SECONDARY_COLOR : 'white'};
`;

export default SidebarLink;
