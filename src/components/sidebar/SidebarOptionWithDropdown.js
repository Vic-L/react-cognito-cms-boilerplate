import React from 'react'
import { Link } from 'react-router-dom'
import autobind from 'autobind-decorator'

class SidebarOptionWithDropdown extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      revealDropdown: false
    }
  }

  render() {
    return (~
      .sidebar-option.with-dropdown(onMouseEnter={this.toggleRevealDropdown} onMouseLeave={this.toggleRevealDropdown})

        %Link(to={this.props.dst})
          {this.props.text}
        {
          this.state.revealDropdown ? (
            this.getDropdown()
          ) : null
        }
    ~)
  }

  @autobind
  getDropdown() {
    const dropdown = this.props.dropdown.map((option, index) => {
      return (~
        %Link.sidebar-dropdown-option(to={option.dst} key={`option-${index}`})
          {option.text}
      ~)
    })

    return (~
      .sidebar-dropdown
        {dropdown}
    ~)
  }

  @autobind
  toggleRevealDropdown() {
    this.setState({
      revealDropdown: !this.state.revealDropdown
    })
  }
}

export { SidebarOptionWithDropdown }
