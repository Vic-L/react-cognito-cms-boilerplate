import React from 'react'
import Loadable from 'react-loadable'

const ClickableTableHeader = Loadable({
  loader: () => import('_tables/ClickableTableHeader'),
  loading: () => <th></th>,
})

// Delete this component
class Table extends React.Component {
  render() {
    return (
      <table className='unstriped hover table-scroll'>
        <thead>
          <tr>
            <th>Header 1</th>
            <ClickableTableHeader
              title="Sortable Header 2"
              onClick={this.handleHeader2Change}/>
            <th>Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Body 1A</td>
            <td>Body 2A</td>
            <td>Body 3A</td>
          </tr>
          <tr>
            <td>Body 1B</td>
            <td>Body 2B</td>
            <td>Body 3B</td>
          </tr>
        </tbody>
      </table>
    )
  }

  handleHeader2Change() {
    alert("handleHeader2Change")
  }
}

export default Table
