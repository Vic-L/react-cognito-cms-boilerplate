import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

const AlertModal = React.lazy(() => import('_elements/AlertModal'));
const TransitionGroupWrapper = React.lazy(() => import('_transitions/TransitionGroupWrapper'));
const Main = React.lazy(() => import('_screens/Main'));
const Login = React.lazy(() => import('_authentications/Login'));

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: 'rgba(0, 0, 0, 0.75)';
  z-index: 999999999999;
`;

const App = ({ location }) => {
  const transitionComponentKey = location.pathname === '/login' ? 'App_login' : 'App_main';

  return (
    <React.Fragment>
      <React.Suspense fallback={<Overlay />}>
        <AlertModal />
      </React.Suspense>
      <React.Suspense fallback={<div />}>
        <TransitionGroupWrapper>
          <TransitionGroup>
            <CSSTransition
              key={transitionComponentKey}
              timeout={Number(TRANSITION_TIMEOUT)}
              classNames='fade'
              appear
            >
              <Switch location={location}>
                <Route
                  path="/login"
                  exact
                  render={props => (
                    <React.Suspense fallback={<div />}>
                      <Login {...props} />
                    </React.Suspense>
                  )}
                />
                <Route
                  path="/"
                  render={props => (
                    <React.Suspense fallback={<div />}>
                      <Main {...props} />
                    </React.Suspense>
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </TransitionGroupWrapper>
      </React.Suspense>
    </React.Fragment>
  );
};

export default withRouter(App);
