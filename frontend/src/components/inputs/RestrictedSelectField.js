import _ from 'lodash'
import React from 'react'
import autobind from 'autobind-decorator'
import Select from 'react-select'
import PropTypes from 'prop-types'

import { InputField } from '_contentLoaders'

const TextField = React.lazy(() => import('_inputs/TextField'))
const SelectContainer = React.lazy(() => import('_inputs/SelectContainer'))
const DropdownChevron = React.lazy(() => import('_inputs/DropdownChevron'))

class RestrictedSelectField extends React.Component {
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
            options={this.props.selectableOptions}/>
        </SelectContainer>
      </React.Suspense>
    )
  }

  @autobind
  renderOptionLabel() {
    if (this.props.value) {
      const option = _.find(this.props.fullOptions, (option) => {
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
      return _.find(this.props.fullOptions, (option) => {
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

RestrictedSelectField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  error: PropTypes.string,
  fullOptions: PropTypes.array.isRequired,
  selectableOptions: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

export default RestrictedSelectField
