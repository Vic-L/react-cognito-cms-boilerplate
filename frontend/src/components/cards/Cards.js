import React from 'react'
import Loadable from 'react-loadable'

const Card = Loadable({
  loader: () => import('_cards/Card'),
  loading: () => <div></div>,
})

// Delete this component
class Cards extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div class="grid-container">
          <h2>Cards</h2>
          <div className='grid-x grid-margin-x'>
            {this.renderCards()}
          </div>
        </div>
      </React.Fragment>
    )
  }

  renderCards() {

    return [<Card key='card1'/>, <Card key='card2'/>]
  }
}

export default Cards
