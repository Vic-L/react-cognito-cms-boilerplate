import _ from 'lodash'
import React from 'react'
import autobind from 'autobind-decorator'
import Select from 'react-select'
import PropTypes from 'prop-types'

import { InputField } from '_contentLoaders'

const TextField = React.lazy(() => import('_inputs/TextField'))
const SelectContainer = React.lazy(() => import('_inputs/SelectContainer'))
const DropdownChevron = React.lazy(() => import('_inputs/DropdownChevron'))

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
        color: 'black',
      }),
      container: () => ({
        position: 'absolute',
        top: 0,
        width: '100%',
      }),
      // 50 is the height of input
      control: () => ({
        opacity: 0,
        width: '100%',
        overflow: 'hidden',
        height: 50,
      })
    }

    return (
      <React.Suspense fallback={<InputField/>}>
        <SelectContainer>
          <div>
            <React.Suspense fallback={<InputField/>}>
              <TextField
                name={this.props.name}
                placeholder={this.props.placeholder}
                type={this.props.type}
                label={this.props.label}
                error={this.props.error}
                value={this.renderOptionLabel()}
                onChange={this.props.onChange}/>
              <React.Suspense fallback={null}>
                <DropdownChevron
                  src='https://upload.wikimedia.org/wikipedia/commons/4/4b/Feather-arrows-chevron-down.svg'/>
              </React.Suspense>
            </React.Suspense>
          </div>
          <Select
            styles={selectStyle}
            value={this.renderOptionValue()}
            onChange={this.onSelectOption}
            options={this.props.options}/>
        </SelectContainer>
      </React.Suspense>
    )
  }

  @autobind
  renderOptionLabel() {
    if (!_.isNil(this.props.value)) {
      const option = _.find(this.props.options, (option) => {
        return option.value === this.props.value
      })

      if (_.isNil(option)) {
        return null
      } else {
        return option.label
      }
    } else {
      return null
    }
  }

  @autobind
  renderOptionValue() {
    if (!_.isNil(this.props.value)) {
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
