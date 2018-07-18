import React from 'react'
import { Link } from 'react-router-dom'

class SidebarOption extends React.Component {
  render() {
    return (~
      .sidebar-option
        %Link(to={this.props.dst})
          {this.props.text}
    ~)
  }
}

export default SidebarOption
