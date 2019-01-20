import _ from 'lodash'
import React from 'react';
import DatePicker from 'react-datepicker'
import moment from 'moment'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { InputField } from '_contentLoaders'

// datepicker setup
import enGB from 'date-fns/locale/en-GB'
import {registerLocale} from 'react-datepicker'
registerLocale('en-GB', enGB)

const TextField = React.lazy(() => import('_inputs/TextField'))

const WeekPickerContainer = styled.div`
  position: relative;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  cursor: pointer;
`

class WeekPickerField extends React.Component {
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

    const { minDate, maxDate } = this.props

    return (
      <WeekPickerContainer>
        <Overlay onClick={this.openDatePicker}/>
        <React.Suspense fallback={<InputField/>}>
          <TextField
            name={this.props.name}
            placeholder={this.props.placeholder}
            type={this.props.type}
            label={this.props.label}
            error={this.props.error}
            value={this.renderDate()}
            readOnly/>
          <DatePicker
            ref='datepicker'
            showWeekNumbers
            locale='en-GB'
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            selected={this.props.value ? moment(this.props.value).toDate() : null}
            onChange={this.onDateChange}
            highlightDates={this.highlightWeek()}/>
        </React.Suspense>
      </WeekPickerContainer>
    )
  }

  @autobind
  highlightWeek() {
    const { value } = this.props

    if (value) {
      const mondayOfWeek = moment(value).day(1)
      return [
        mondayOfWeek.add(1, 'day').toDate(),
        mondayOfWeek.add(1, 'day').toDate(),
        mondayOfWeek.add(1, 'day').toDate(),
        mondayOfWeek.add(1, 'day').toDate(),
        mondayOfWeek.add(1, 'day').toDate(),
        mondayOfWeek.add(1, 'day').toDate(),
      ]
    } else {
      return []
    }
  }

  @autobind
  onDateChange(date) {
    this.props.onChange(moment(date).day(1).format("YYYY-MM-DD")) // ISO8601 format for monday of selected date
  }

  @autobind
  openDatePicker() {
    this.refs.datepicker.setOpen(true)
  }

  @autobind
  renderDate() {
    const { value } = this.props
    if (value) {
      const monday = moment(value)
      const sunday = moment(value).day(7)
      return `W${monday.format('DD')}-${sunday.format('DD')} ${monday.format('MMM YYYY')}`
    } else {
      return ""
    }
  }
}

WeekPickerField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
}

export default WeekPickerField
