import React from 'react'

class ClickableTableHeader extends React.Component {
  render() {
    return (
      <th className='clickable-table-header'
        onClick={this.props.onClick}>
        {this.props.title}

        <img src="https://upload.wikimedia.org/wikipedia/commons/f/f5/Sort_both_small.svg" className="clickable-header-sort-arrows"/>
      </th>
    )
  }
}

export default ClickableTableHeader
