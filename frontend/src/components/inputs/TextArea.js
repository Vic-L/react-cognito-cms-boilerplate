import React from 'react'
import PropTypes from 'prop-types'

import styled, { ThemeProvider } from 'styled-components'

const ErrorContainer = React.lazy(() => import('_inputs/ErrorContainer'))

const TextAreaContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`

const TextAreaInput = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.borderColor};
  box-sizing: border-box;
`

const errorTheme = {
  borderColor: ERROR_COLOR,
  errorContainerHeight: 'auto',
  errorContainerPaddingTop: '5px',
  errorContainerPaddingBottom: '5px',
}

const noErrorTheme = {
  borderColor: '#ccc',
  errorContainerHeight: 0,
  errorContainerPaddingTop: 0,
  errorContainerPaddingBottom: 0,
}

const TextArea = ({
  placeholder,
  rows,
  value,
  error,
  ...others
}) => {
  return (
    <ThemeProvider theme={error ? errorTheme : noErrorTheme}>
      <TextAreaContainer>
        <TextAreaInput
          rows={rows || '4'}
          placeholder={placeholder}
          value={value || ''}
          {...others}/>
      
        <ErrorContainer>{error}</ErrorContainer>
      </TextAreaContainer>
    </ThemeProvider>
  )
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  rows: PropTypes.number,
}

export default TextArea
