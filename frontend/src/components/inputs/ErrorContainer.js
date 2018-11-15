import styled from 'styled-components'

const ErrorContainer = styled.div`
  color: ${ERROR_COLOR};
  height: ${props => props.theme.errorContainerHeight};
  padding-top: ${props => props.theme.errorContainerPaddingTop};
  padding-bottom: ${props => props.theme.errorContainerPaddingBottom};
`

export default ErrorContainer