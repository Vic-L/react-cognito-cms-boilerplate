import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Shimmer from '_elements/Shimmer';
import Overlay from '_elements/Overlay';

const TextField = React.lazy(() => import('_elements/TextField'));
const DatePickerContainer = styled.div`
  position: relative;
`;

class DatePickerField extends React.Component {
  @autobind
  onDateChange(date) {
    // ISO8601 format for date
    this.props.onChange(moment(date).format('YYYY-MM-DD'));
  }

  @autobind
  openDatePicker() {
    this.refs.datepicker.setOpen(true);
  }

  @autobind
  renderDate() {
    if (this.props.value) {
      return moment(this.props.value).format(this.props.dateDisplayFormat);
    }

    return '';
  }

  render() {
    return (
      <DatePickerContainer>
        <Overlay onClick={this.openDatePicker} />
        <React.Suspense fallback={<Shimmer />}>
          <TextField
            name={this.props.name}
            placeholder={this.props.placeholder}
            type={this.props.type}
            label={this.props.label}
            error={this.props.error}
            fieldIconSrc={this.props.fieldIconSrc}
            value={this.renderDate()}
            readOnly
          />
          <DatePicker
            ref='datepicker'
            selected={this.props.value ? moment(this.props.value).toDate() : null}
            onChange={this.onDateChange}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
          />
        </React.Suspense>
      </DatePickerContainer>
    );
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
  fieldIconSrc: PropTypes.string,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
};

export default DatePickerField;
