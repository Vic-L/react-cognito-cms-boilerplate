import _ from 'lodash';
import React from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Shimmer from '_elements/Shimmer';

const TextField = React.lazy(() => import('_elements/TextField'));

const SelectContainer = styled.div`
  position: relative;
  display: block;
`;

const SelectElement = styled.select`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  opacity: 0;
  cursor: pointer;
`;

class SelectField extends React.Component {
  @autobind
  onSelectOption(e) {
    this.props.onChange(e.target.value);
  }

  @autobind
  renderOptionValue() {
    if (!_.isNil(this.props.value)) {
      const option = _.find(this.props.options, (opt) => 
        `${opt.value}` === `${this.props.value}`
      );

      if (_.isNil(option)) return '';
      return option.value;
    }
    
    return '';
  }

  @autobind
  renderOptions() {
    return this.props.options.map(option => 
      <option key={option.label} value={option.value}>{option.label}</option>
    );
  }

  @autobind
  renderOptionLabel() {
    if (!_.isNil(this.props.value)) {
      const option = _.find(this.props.options, (opt) => 
        `${opt.value}` === `${this.props.value}`
      );

      if (_.isNil(option)) {
        return null;
      }

      return option.label;
    }

    return null;
  }

  render() {
    const { placeholder } = this.props;

    return (
      <SelectContainer>
        <React.Suspense fallback={<Shimmer />}>
          <TextField
            name={this.props.name}
            placeholder={placeholder}
            type={this.props.type}
            label={this.props.label}
            error={this.props.error}
            value={this.renderOptionLabel()}
            fieldIconSrc='https://upload.wikimedia.org/wikipedia/commons/4/4b/Feather-arrows-chevron-down.svg'
            onChange={this.props.onChange}
          />
        </React.Suspense>
        <SelectElement
          onChange={this.onSelectOption}
          value={this.renderOptionValue()}
        >
          <option value='' disabled>{placeholder}</option>
          {this.renderOptions()}
        </SelectElement>
        
      </SelectContainer>
    );
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
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default SelectField;
