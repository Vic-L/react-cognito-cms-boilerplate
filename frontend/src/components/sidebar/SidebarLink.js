import { Link } from 'react-router-dom';

import styled from 'styled-components';

const SidebarLink = styled(Link)`
  display: block;
  padding: 1rem;
  cursor: pointer;
  font-family: 'Avenir-Light';
  &:hover {
    color: ${SECONDARY_COLOR};
    font-family: 'Avenir-Heavy';
  }
  text-decoration: none;
  font-size: 14px;
  color: ${props => (props.shouldHighlight ? SECONDARY_COLOR : 'white')};
`;

export default SidebarLink;
