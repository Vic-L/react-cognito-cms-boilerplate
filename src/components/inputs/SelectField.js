import React from 'react'
import autobind from 'autobind-decorator'
import Loadable from 'react-loadable'

const TextField = Loadable({
  loader: () => import('_inputs/TextField'),
  loading: () => <div></div>,
})

class SelectField extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isDropdownShown: false
    }
  }

  render() {
    return (~
      .select-container
        .select-field
          %TextField(
            name={this.props.name}
            placeholder={this.props.placeholder}
            type={this.props.type}
            label={this.props.label}
            error={this.props.error}
            value={this.props.value}
            options={this.props.options}
            onChange={this.props.onChange})
          .select-dropdown(onClick={this.toggleDropDown})
        .options-container(style={{
          border: this.state.isDropdownShown ? 'red 1px solid' : 'none'
        }})
          {this.renderOptions()}
    ~)
  }

  @autobind
  toggleDropDown() {
    this.setState({
      isDropdownShown: !this.state.isDropdownShown
    })
  }

  @autobind
  renderOptions() {
    if (this.state.isDropdownShown) {
      return this.props.options.map((option, index) => {
        return (~
          %div.option(
            key={`option-${index}`}
            value={option.value}
            onClick={this.onSelectOption.bind(this, index)})
            {option.label}
        ~)
      })
    } else {
      return null
    }
  }

  @autobind
  onSelectOption(index) {
    this.setState({
      isDropdownShown: false
    }, () => {
      this.props.onChange(index)
    })
  }
}

export default SelectField
