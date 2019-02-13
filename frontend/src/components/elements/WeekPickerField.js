import React from 'react';
import DatePicker, {
  registerLocale
} from 'react-datepicker';
import moment from 'moment';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import enGB from 'date-fns/locale/en-GB';

import Shimmer from '_elements/Shimmer';
import Overlay from '_elements/Overlay';

// datepicker setup
registerLocale('en-GB', enGB);

const TextField = React.lazy(() => import('_elements/TextField'));

const WeekPickerContainer = styled.div`
  position: relative;
`;

class WeekPickerField extends React.Component {
  @autobind
  onDateChange(date) {
    // ISO8601 format for monday of selected date
    this.props.onChange(moment(date).day(1).format('YYYY-MM-DD'));
  }

  @autobind
  highlightWeek() {
    const { value } = this.props;

    if (value) {
      const mondayOfWeek = moment(value).day(1);
      return [
        mondayOfWeek.add(1, 'day').toDate(),
        mondayOfWeek.add(1, 'day').toDate(),
        mondayOfWeek.add(1, 'day').toDate(),
        mondayOfWeek.add(1, 'day').toDate(),
        mondayOfWeek.add(1, 'day').toDate(),
        mondayOfWeek.add(1, 'day').toDate(),
      ];
    }

    return [];
  }

  @autobind
  openDatePicker() {
    this.refs.datepicker.setOpen(true);
  }

  @autobind
  renderDate() {
    const { value } = this.props;
    if (value) {
      const monday = moment(value);
      const sunday = moment(value).day(7);
      return `W${monday.format('DD')}-${sunday.format('DD')} ${monday.format('MMM YYYY')}`;
    }

    return '';
  }

    render() {
    return (
      <WeekPickerContainer>
        <Overlay onClick={this.openDatePicker} />
        <React.Suspense fallback={<Shimmer />}>
          <TextField
            name={this.props.name}
            placeholder={this.props.placeholder}
            type={this.props.type}
            label={this.props.label}
            error={this.props.error}
            value={this.renderDate()}
            fieldIconSrc={this.props.fieldIconSrc}
            readOnly
          />
          <DatePicker
            ref='datepicker'
            showWeekNumbers
            locale='en-GB'
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            selected={this.props.value ? moment(this.props.value).toDate() : null}
            onChange={this.onDateChange}
            highlightDates={this.highlightWeek()}
          />
        </React.Suspense>
      </WeekPickerContainer>
    );
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
  fieldIconSrc: PropTypes.string,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
};

export default WeekPickerField;
