import React from 'react';
import autobind from 'autobind-decorator';
import { Grid, Cell } from 'styled-css-grid';

import CardContainer from '_cards/CardContainer';
import TransitionWrapper from '_transitions/TransitionWrapper'

// Delete this component
class Cards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [
        <Cell>
          <React.Suspense fallback={<div />}>
            <CardContainer>
              {(isDismissable) =>
                <React.Fragment>
                  <h2>Card</h2>
                  <p>This card is{isDismissable ? ' ' : ' not '}dismissable</p>
                </React.Fragment>
              }
            </CardContainer>
          </React.Suspense>
        </Cell>,
        <Cell>
          <React.Suspense fallback={<div />}>
            <CardContainer
              onDismiss={this.onDismiss}
              isDismissable
            >
              {(isDismissable) =>
                <React.Fragment> 
                  <h2>Dismissable Card</h2>
                  <p>This card is{isDismissable ? ' ' : ' not '}dismissable</p>
                </React.Fragment>
              }
            </CardContainer>
          </React.Suspense>
        </Cell>
      ]
    };
  }

  @autobind
  onDismiss() {
    this.setState({
      cards: [this.state.cards[0]]
    });
  }

  @autobind
  renderCards() {
    return this.state.cards;
  }

  render() {
    return (
      <React.Fragment>
        <h2>Cards</h2>

        <Grid columns={2} gap='1rem' padding='1rem'>
          {this.renderCards()}
        </Grid>
      </React.Fragment>
    );
  }
}

export default TransitionWrapper(Cards);
