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
    return (
      <div className='sidebar-option with-dropdown'onMouseEnter={this.toggleRevealDropdown}
        onMouseLeave={this.toggleRevealDropdown}>

        {
          this.props.dst ? (
            <Link className='sidebar-link' to={this.props.dst}>
              {this.props.text}
            </Link>
          ) : (
            <div className='sidebar-link'>{this.props.text}</div>
          )
        }
        
        {
          this.state.revealDropdown ? (
            this.getDropdown()
          ) : null
        }
      </div>
    )
  }

  @autobind
  getDropdown() {
    const dropdown = this.props.dropdown.map((option, index) => {
      return (
        <Link
          className='sidebar-dropdown-option'
          to={option.dst}
          key={`option-${index}`}>
          {option.text}
        </Link>
      )
    })

    return (
      <div className='sidebar-dropdown'>
        {dropdown}
      </div>
    )
  }

  @autobind
  toggleRevealDropdown() {
    this.setState({
      revealDropdown: !this.state.revealDropdown
    })
  }
}

export default SidebarOptionWithDropdown
