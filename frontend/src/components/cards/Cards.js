import React from 'react'
import autobind from 'autobind-decorator'

const Card = React.lazy(() => import('_cards/Card'))
const DismissableCard = React.lazy(() => import('_cards/DismissableCard'))

import AnimationWrapper from '_animationWrappers/AnimationWrapper'

// Delete this component
class Cards extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      in: true,
      cards: [
        <React.Suspense fallback={<div></div>}>
          <Card key='card1' cellSize={6}>
            <h2>Card</h2>
          </Card>
        </React.Suspense>,
        <React.Suspense fallback={<div></div>}>
          <DismissableCard
            key='card2'
            onDismiss={this.onDismiss}
            cellSize={6}
            isDismissable={true}>
            <h2>Dismissable Card</h2>
          </DismissableCard>
        </React.Suspense>
      ]
    }
  }

  componentWillUnmount() {
    this.setState({in: false})
  }

  render() {
    return(
      <AnimationWrapper
        classNames="fade"
        shouldShow={this.state.in}
        render={() => {
          return (
            <React.Fragment>
              <div className="grid-container">
                <h2>Cards</h2>
                <div className='grid-x grid-margin-x'>
                  {this.renderCards()}
                </div>
              </div>
            </React.Fragment>
          )
        }}/>
    )
  }

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

export default Cards
