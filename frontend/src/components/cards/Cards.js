import React from 'react'
import autobind from 'autobind-decorator'
import Loadable from 'react-loadable'

const Card = Loadable({
  loader: () => import('_cards/Card'),
  loading: () => <div></div>,
})
const DismissableCard = Loadable({
  loader: () => import('_cards/DismissableCard'),
  loading: () => <div></div>,
})

// Delete this component
class Cards extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cards: [
        <Card key='card1'>
          <h2>Card</h2>
        </Card>,
        <DismissableCard
          key='card2'
          onDismiss={this.onDismiss}
          isDismissable={true}>
          <h2>Dismissable Card</h2>
        </DismissableCard>
      ]
    }
  }
  render() {
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
