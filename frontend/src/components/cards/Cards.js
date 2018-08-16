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
      cards: [<Card key='card1'/>, <DismissableCard key='card2' onClose={this.onClose}/>]
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
  onClose() {
    this.setState({
      cards: [this.state.cards[0]]
    })
  }
}

export default Cards
