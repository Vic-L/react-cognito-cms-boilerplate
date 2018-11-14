import React from 'react'
import styled from 'styled-components'

const ClickableTableHeader = React.lazy(() => import('_tables/ClickableTableHeader'))

const _Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 0;
  overflow-x: auto;
`

const Header = styled.th`
  padding: 0.5rem 0.625rem 0.625rem;
  font-weight: bold;
  text-align: left;
  line-height: 1.5;
  background-color: ${PRIMARY_COLOR};
  &:hover {
    background-color: ${SECONDARY_COLOR};
  }
`

const Cell = styled.td`
  padding: 0.5rem 0.625rem 0.625rem;
  line-height: 1.5;
`

// Delete this component
const Table = () => {
  return (
    <_Table>
      <thead>
        <tr>
          <Header>Header 1</Header>
          <React.Suspense fallback={<Header>Sortable Header 2</Header>}>
            <ClickableTableHeader
              title="Sortable Header 2"
              onClick={handleHeader2Change}/>
          </React.Suspense>
          <Header>Header 3</Header>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Cell>Body 1A</Cell>
          <Cell>Body 2A</Cell>
          <Cell>Body 3A</Cell>
        </tr>
        <tr>
          <Cell>Body 1B</Cell>
          <Cell>Body 2B</Cell>
          <Cell>Body 3B</Cell>
        </tr>
      </tbody>
    </_Table>
  )
}

function handleHeader2Change() {
  alert("handleHeader2Change")
}

export default Table
