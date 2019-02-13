import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CheckboxContainer = styled.label`
  display: block;
  cursor: pointer;
`;

const CheckboxImage = styled.img`
  display: inline-block;
  width: 1rem;
  margin-right: 0.25rem;
`;

const CheckboxText = styled.span`
  display: inline-block;
`;

const Checkbox = ({
  isChecked,
  text,
  onClick,
}) => (
  <CheckboxContainer onClick={onClick}>
    {getImage(isChecked)}
    <CheckboxText>{text}</CheckboxText>
  </CheckboxContainer>
);

function getImage(isChecked) {
  if (isChecked) {
    return <CheckboxImage src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBMRBHOwV3shGKa90NdTYZi33MQgBo2RfLwh7wwKFjeapguIcAwQ' />;
  }

  return <CheckboxImage src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv14psF6o0CATRhGWSlTh9oo2ZDNJL-9ldrQN58UBBMLPISG2I' />;
}

Checkbox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
};

export default Checkbox;
