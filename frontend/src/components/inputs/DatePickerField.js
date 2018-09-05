import _ from 'lodash'
import React from 'react';
import DatePicker from 'react-datepicker'
import moment from 'moment'
import autobind from 'autobind-decorator'
import Loadable from 'react-loadable'
import PropTypes from 'prop-types'
import momentPropTypes from 'react-moment-proptypes'

const TextField = Loadable({
  loader: () => import('_inputs/TextField'),
  loading: () => <div></div>,
})

class DatePickerField extends React.Component {
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
      <div className='date-picker-container'>
        <TextField
          name={this.props.name}
          placeholder={this.props.placeholder}
          type={this.props.type}
          label={this.props.label}
          error={this.props.error}
          value={this.renderDate()}
          onFocus={this.onFocus}
          onChange={this.props.onChange}/>
        <DatePicker
          ref='datepicker'
          selected={this.props.value ? moment(this.props.value) : null}
          onChange={this.onDateChange}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}/>
      </div>
    )
  }

  @autobind
  onDateChange(date) {
    this.props.onChange(date.format("YYYY-MM-DD")) // ISO8601 format for date
  }

  @autobind
  onFocus() {
    this.refs.datepicker.setOpen(true)
  }

  @autobind
  renderDate() {
    if (this.props.value) {
      return moment(this.props.value).format(this.props.dateDisplayFormat)
    } else {
      return ""
    }
  }
}

DatePickerField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  dateDisplayFormat: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  minDate: momentPropTypes.momentObj,
  maxDate: momentPropTypes.momentObj,
}

export default DatePickerField
