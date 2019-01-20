import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import PropTypes from 'prop-types'

// COMPONENTS
const ErrorContainer = React.lazy(() => import('_inputs/ErrorContainer'))

const InputContainer = styled.div`
  position: relative;
  margin: 0.5rem;
`

const NORMAL_PADDING = '10px'

const LABEL_COLOR = '#999'
const FONT = 'Avenir-Book'

const Input = styled.input`
  height: 50px;
  display: block;
  padding: ${props => props.isFloating ? `16px ${NORMAL_PADDING} 6px ${NORMAL_PADDING};` : NORMAL_PADDING};
  font-size: 14px;
  font-family: ${FONT};
  color: #000;
  background-color: #f5f5f5;
  border: none;
  border-radius: 0px;
  box-shadow: none;
  margin: 0px 0px 0px;
  width: 100%;
  transition: background 0.2s ease, color 0.2s ease, border 0.2s ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  && {
    border-bottom: 2px solid ${props => props.theme.borderBottomColor};
  }
  padding-right: ${props => props.hasFieldIcon ? '60px !important' : NORMAL_PADDING};
  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${LABEL_COLOR};
    font-family: ${FONT};
    opacity: 1; /* Firefox */
  }
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
  font-family: ${FONT};
  top: 1rem;
  bottom: auto;
  left: ${NORMAL_PADDING};
  right: 0; /* dependent on width, controlled by fieldIconSrc */
  width: calc(100% - (${NORMAL_PADDING} + ${props => props.hasFieldIcon ? '60px' : NORMAL_PADDING}));
  font-size: 1rem;
  color: ${LABEL_COLOR};
  padding: 0;
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
  isFloating,
  ...others
}) => {
  return (
    <InputContainer>
      
      <ThemeProvider theme={error ? errorTheme : noErrorTheme}>
        <Input
          value={value || ""}
          isFloating={isFloating}
          hasFieldIcon={fieldIconSrc}
          placeholder={isFloating ? '' : placeholder}
          {...others}/>
      </ThemeProvider>

      {
        isFloating ? (
          <React.Fragment>
            <ThemeProvider theme={value ? filledPlaceholderTheme : emptyPlaceholderTheme}>
              <Label hasFieldIcon={fieldIconSrc}>{placeholder}</Label>
            </ThemeProvider>

            <ThemeProvider theme={value ? filledLabelTheme : emptyLabelTheme}>
              <Label hasFieldIcon={fieldIconSrc}>{label}</Label>
            </ThemeProvider>
          </React.Fragment>
        ) : null
      }

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
  isFloating: PropTypes.bool,
}

export default TextField
