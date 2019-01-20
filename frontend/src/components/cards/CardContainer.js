import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.75) 0px 0px 20px -5px;
  padding: 1rem;
  position: relative;
`;

const DismissButton = styled.div`
  position: absolute;
  cursor: pointer;
  outline: none;
  position: absolute;
  top: 0;
  right: 1rem;
  font-size: 2rem;
`;

class CardContainer extends React.Component {
  render() {
    const { isDismissable, onDismiss, children } = this.props;
    return (
      <Wrapper>
        {
          isDismissable && onDismiss ? (
            <DismissButton onClick={onDismiss}>
              <span>&times;</span>
            </DismissButton>
          ) : null
        }

        {children(isDismissable)}

      </Wrapper>
    );
  }
}

CardContainer.propTypes = {
  onDismiss: PropTypes.func,
  isDismissable: PropTypes.bool,
};

export default CardContainer;
