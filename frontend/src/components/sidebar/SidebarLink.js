import { Link } from 'react-router-dom'

import styled from 'styled-components'

const SidebarLink = styled(Link)`
  color: white;
  width: 100%;
  display: block;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    color: ${SECONDARY_COLOR}
  }
  text-decoration: none;
`

export default SidebarLink