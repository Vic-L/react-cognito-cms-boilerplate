import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';
import styled from 'styled-components';

import requireAuth from '_hocs/requireAuth';

import TransitionWrapper from '_transitions/TransitionWrapper';

const TransitionGroupWrapper = React.lazy(() => import('_transitions/TransitionGroupWrapper'));
const Sidebar = React.lazy(() => import('_sidebar/Sidebar'));
const Dashboard = React.lazy(() => import('_screens/Dashboard'));
const Form = React.lazy(() => import('_elements/Form'));
const Cards = React.lazy(() => import('_cards/Cards'));
const Charts = React.lazy(() => import('_charts/Charts'));
const TableScreen = React.lazy(() => import('_screens/TableScreen'));

const Wrapper = styled.div`
  padding: 1rem
`;

const Main = ({
  location,
  history
}) => (
  <React.Fragment>
    <Sidebar location={location} history={history} />
    <React.Suspense fallback={<div />}>
      <Wrapper>
        <TransitionGroupWrapper>
          <TransitionGroup>
            <CSSTransition
              key={`Main_${location.pathname}`}
              timeout={Number(TRANSITION_TIMEOUT)}
              classNames="fade"
              appear
            >
              <Switch location={location}>
                <Route
                  path="/"
                  exact
                  render={props => (
                    <React.Suspense fallback={<div />}>
                      <Dashboard {...props} />
                    </React.Suspense>
                  )}
                />
                <Route
                  path="/form"
                  exact
                  render={props => (
                    <React.Suspense fallback={<div />}>
                      <Form {...props} />
                    </React.Suspense>
                  )}
                />
                <Route
                  path="/table"
                  exact
                  render={props => (
                    <React.Suspense fallback={<div />}>
                      <TableScreen {...props} />
                    </React.Suspense>
                  )}
                />
                <Route
                  path="/cards"
                  exact
                  render={props => (
                    <React.Suspense fallback={<div />}>
                      <Cards {...props} />
                    </React.Suspense>
                  )}
                />
                <Route
                  path="/charts"
                  exact
                  render={props => (
                    <React.Suspense fallback={<div />}>
                      <Charts {...props} />
                    </React.Suspense>
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </TransitionGroupWrapper>
      </Wrapper>
    </React.Suspense>
  </React.Fragment>
);

export default requireAuth(TransitionWrapper(Main));
