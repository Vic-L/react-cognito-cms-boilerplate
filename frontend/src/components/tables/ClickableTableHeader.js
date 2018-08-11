import React from 'react'

class ClickableTableHeader extends React.Component {
  render() {
    return (~
      %th.clickable-table-header(onClick={this.props.onClick})
        {this.props.title}
    ~)
  }
}

export default ClickableTableHeader
