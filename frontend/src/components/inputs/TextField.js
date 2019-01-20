import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import PropTypes from 'prop-types'

// COMPONENTS
const StringInput = React.lazy(() => import('_inputs/StringInput'))
const ErrorContainer = React.lazy(() => import('_inputs/ErrorContainer'))

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`

const Input = styled(StringInput)`
  && {
    border-bottom: 2px solid ${props => props.theme.borderBottomColor};
  }
  padding-right: ${props => props.hasFieldIcon ? '60px !important' : 'initial'}
`

const FieldIcon = styled.img`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  height: 60%;
`

const Label = styled.label`;
  position: absolute
  pointer-events: none;
  top: 1rem;
  bottom: auto;
  left: 10px;
  right: 0; /* dependent on width, controlled by fieldIconSrc */
  width: calc(100% - (10px + ${props => props.hasFieldIcon ? '60px' : '10px'}));
  font-size: 1rem;
  color: #999;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: geometricPrecision;
  transform-origin: left top;
  transition: width 0.4s, transform 0.4s, opacity 0.4s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transform: ${props => props.theme.transform};
  opacity: ${props => props.theme.opacity};
`

// THEMES
const errorTheme = {
  borderBottomColor: ERROR_COLOR,
  errorContainerHeight: 'auto',
  errorContainerPaddingTop: '5px',
  errorContainerPaddingBottom: '5px',
}

const noErrorTheme = {
  borderBottomColor: '#ccc',
  errorContainerHeight: 0,
  errorContainerPaddingTop: 0,
  errorContainerPaddingBottom: 0,
}

const emptyPlaceholderTheme = {
  opacity: 1,
}

const filledPlaceholderTheme = {
  opacity: 0,
  transform: 'translate3d(0, -8px, 0) scale3d(0.75, 0.75, 1) translateZ(1px)',
}

const emptyLabelTheme = {
  opacity: 0,
}

const filledLabelTheme = {
  opacity: 1,
  transform: 'translate3d(0, -8px, 0) scale3d(0.75, 0.75, 1) translateZ(1px)',
}

// MAIN
const TextField = ({
  label,
  placeholder,
  value,
  error,
  fieldIconSrc,
  ...others
}) => {
  return (
    <InputContainer>
      
      <ThemeProvider theme={error ? errorTheme : noErrorTheme}>
        <Input
          value={value || ""}
          hasFieldIcon={fieldIconSrc}
          {...others}/>
      </ThemeProvider>

      <ThemeProvider theme={value ? filledPlaceholderTheme : emptyPlaceholderTheme}>
        <Label hasFieldIcon={fieldIconSrc}>{placeholder}</Label>
      </ThemeProvider>

      <ThemeProvider theme={value ? filledLabelTheme : emptyLabelTheme}>
        <Label hasFieldIcon={fieldIconSrc}>{label}</Label>
      </ThemeProvider>

      <ThemeProvider theme={error ? errorTheme : noErrorTheme}>
        <ErrorContainer>{error}</ErrorContainer>
      </ThemeProvider>

      {
        fieldIconSrc ? (
          <React.Suspense fallback={null}>
            <FieldIcon src={fieldIconSrc}/>
          </React.Suspense>
        ) : null
      }
    </InputContainer>
  )
}

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  error: PropTypes.string,
  fieldIconSrc: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

export default TextField
