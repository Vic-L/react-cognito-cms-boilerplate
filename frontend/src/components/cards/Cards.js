import React from 'react'
import autobind from 'autobind-decorator'

import { Flex, Box } from '@rebass/grid'

const Card = React.lazy(() => import('_cards/Card'))
const DismissableCard = React.lazy(() => import('_cards/DismissableCard'))

import TransitionWrapper from '_transitions/TransitionWrapper'

// Delete this component
class Cards extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cards: [
        <React.Suspense fallback={<div></div>}>
          <Card key='card1' cellSize={1/2}>
            <h2>Card</h2>
          </Card>
        </React.Suspense>,
        <React.Suspense fallback={<div></div>}>
          <DismissableCard
            key='card2'
            onDismiss={this.onDismiss}
            cellSize={1/2}
            isDismissable={true}>
            <h2>Dismissable Card</h2>
          </DismissableCard>
        </React.Suspense>
      ]
    }
  }

  render() {
    return(
      <React.Fragment>
        <Box width={1} mx='1rem'>
          <h2>Cards</h2>
        </Box>
        <Flex>
          {this.renderCards()}
        </Flex>
      </React.Fragment>
    )
  }

  @autobind
  renderCards() {
    return this.state.cards
  }

  @autobind
  onDismiss() {
    this.setState({
      cards: [this.state.cards[0]]
    })
  }
}

export default TransitionWrapper(Cards)
