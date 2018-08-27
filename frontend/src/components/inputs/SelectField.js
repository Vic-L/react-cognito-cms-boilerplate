import _ from 'lodash'
import React from 'react'
import autobind from 'autobind-decorator'
import Loadable from 'react-loadable'
import Select from 'react-select'
import PropTypes from 'prop-types'

const TextField = Loadable({
  loader: () => import('_inputs/TextField'),
  loading: () => <div></div>,
})

class SelectField extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isDropdownShown: false,
      selectedOption: null
    }
  }

  render() {
    const { error } = this.props

    const selectStyle = {
      option: (base, state) => ({
        ...base,
        borderBottom: '1px black solid',
        color: 'black'
      }),
      // 50 is the height of input
      container: () => ({
        height: 50,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
      control: () => ({
        opacity: 0,
      })
    }

    return (
      <div className='select-container'>
        <div className='select-field'>
          <TextField
            name={this.props.name}
            placeholder={this.props.placeholder}
            type={this.props.type}
            label={this.props.label}
            error={this.props.error}
            value={this.renderOptionLabel()}
            onChange={this.props.onChange}/>
        </div>
        <Select
          styles={selectStyle}
          value={this.renderOptionValue()}
          onChange={this.onSelectOption}
          options={this.props.options}/>
      </div>
    )
  }

  @autobind
  renderOptionLabel() {
    if (this.props.value) {
      const option = _.find(this.props.options, (option) => {
        return option.value === this.props.value
      })

      if (_.isNil(option)) {
        return ""
      } else {
        return option.label
      }
    } else {
      return ""
    }
  }

  @autobind
  renderOptionValue() {
    if (this.props.value) {
      return _.find(this.props.options, (option) => {
        return option.value === this.props.value
      }) || null
    } else {
      return null
    }
  }

  @autobind
  onSelectOption(selectedOption) {
    this.props.onChange(selectedOption.value)
  }
}

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  error: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

export default SelectField
