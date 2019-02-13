import React from 'react';
import autobind from 'autobind-decorator';
import styled from 'styled-components';

const SidebarOptionContainer = React.lazy(() => import('_sidebar/SidebarOptionContainer'));
const SidebarLink = React.lazy(() => import('_sidebar/SidebarLink'));

const SidebarDropdownChevron = styled.img`
  position: absolute;
  margin-left: 5%;
  transition: transform 350ms ease-in-out;
`;

const SidebarDropdownLink = styled.div`
  color: white;
  width: 100%;
  display: block;
  padding: 1rem;
  cursor: pointer;
  &:hover ${SidebarDropdownChevron} {
    transform: rotate(180deg)
  }
`;

const SidebarOptionDropdownContainer = styled(SidebarOptionContainer)`
  &:hover ${SidebarDropdownChevron} {
    transform: rotate(180deg)
  }
`;

const SidebarSubLink = styled(SidebarLink)`
  margin-left: 1rem;
`;

class SidebarOptionWithDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      revealDropdown: false
    };
  }

  @autobind
  getDropdown() {
    return this.props.dropdown.map((option, index) => (
      <React.Suspense
        key={`dropdown-option-suspense-${index}`}
        fallback={<div key={`dropdown-option-placeholder-${index}`} />}
      >
        <SidebarSubLink
          key={`dropdown-option-${index}`}
          to={option.dst}
        >
          
          {option.text}

        </SidebarSubLink>
      </React.Suspense>
    ));
  }

  @autobind
  toggleRevealDropdown() {
    this.setState({
      revealDropdown: !this.state.revealDropdown
    });
  }

  render() {
    return (
      <React.Suspense fallback={<div />}>
        <SidebarOptionDropdownContainer
          onMouseEnter={this.toggleRevealDropdown}
          onMouseLeave={this.toggleRevealDropdown}
        >

          {
            this.props.dst ? (
              <React.Suspense fallback={<div />}>
                <SidebarLink to={this.props.dst}>
                  {this.props.text}

                  <SidebarDropdownChevron src='https://upload.wikimedia.org/wikipedia/commons/4/4b/Feather-arrows-chevron-down.svg' />
                </SidebarLink>
              </React.Suspense>
            ) : (
              <React.Suspense fallback={<div />}>
                <SidebarDropdownLink>
                  {this.props.text}
                  <SidebarDropdownChevron src='https://upload.wikimedia.org/wikipedia/commons/4/4b/Feather-arrows-chevron-down.svg' />
                </SidebarDropdownLink>
              </React.Suspense>
            )
          }
          
          {
            this.state.revealDropdown ? (
              this.getDropdown()
            ) : null
          }
        </SidebarOptionDropdownContainer>
      </React.Suspense>
    );
  }
}

export default SidebarOptionWithDropdown;
