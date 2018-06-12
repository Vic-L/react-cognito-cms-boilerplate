import React from 'react'
import { Link } from 'react-router-dom'

import { AnimationWrapper } from '_animationWrappers'

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = { in: true }
  }

  componentWillUnmount() {
    this.setState({in: false})
  }

  render() {
    return (
      <div>
        <h1>This is HOME page</h1>
        <br/>
        <AnimationWrapper
          classNames="fade"
          shouldShow={this.state.in}
          render={() => {
            return (
              <Link to="/login">Login</Link>
            )
          }}/>
      </div>
    )
  }
}

const renderLinks = () => {
  return [
    "Luffy",
    "Zoro",
    "Nami",
    "Usopp",
    "Sanji",
    "Chopper",
    "Nico Robin",
    "Franky",
    "Brooke",
  ].map(character => {
    return (
      <Link key={character}
            to={`/${character.toLowerCase()}`}>
        Visit {character} now! <br/>
      </Link>
    )
  })
}

export default Home