import styled from 'styled-components'

const Button = styled.div`
  text-align: center;
  margin: auto;
  vertical-align: middle;
  padding: 1rem;
  transition: background-color 0.25s ease-out, color 0.25s ease-out;
  font-family: inherit;
  font-size: 0.9rem;
  -webkit-appearance: none;
  line-height: 1;
  text-align: center;
  cursor: pointer;
  background-color: ${PRIMARY_COLOR};
  color: white;
  display: inline-block;
  border-radius: 0.25rem;
  font-size: 1rem;
  &:hover {
    background-color: ${SECONDARY_COLOR};
  }
`

export default Button