import React from 'react';
import PropTypes from 'prop-types';

const SidebarOptionContainer = React.lazy(() => import('_sidebar/SidebarOptionContainer'));
const SidebarLink = React.lazy(() => import('_sidebar/SidebarLink'));

const SidebarOption = ({
  shouldHighlight,
  text,
  dst,
  pathname,
}) => (
  <React.Suspense fallback={<div />}>
    <SidebarOptionContainer>
      <React.Suspense fallback={<div />}>
        <SidebarLink
          shouldHighlight={shouldHighlight || pathname === dst}
          to={dst}
        >
          
          {text}

        </SidebarLink>
      </React.Suspense>
    </SidebarOptionContainer>
  </React.Suspense>
);

SidebarOption.propTypes = {
  shouldHighlight: PropTypes.bool,
  text: PropTypes.string.isRequired,
  dst: PropTypes.string.isRequired,
};

export default SidebarOption;
