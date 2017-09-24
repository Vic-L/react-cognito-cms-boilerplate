import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import FadeTransition from '_components/FadeTransition'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = { in: true }
  }

  componentWillUnmount() {
    this.setState({in: false})
  }

  render() {
    return (~
      %FadeTransition(
        timeout={350}
        classNames="fade"
        shouldShow={this.state.in})
        
        %div
          %h1 This is HOME page
          %br
          {this.renderLinks()}
    ~)
  }

  renderLinks = () => {
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
      return (~ 
        %Link(
          key={character}
          to={`/${character.toLowerCase()}`})
          Visit {character} now!
          %br
      ~)
    })
  }
}

export default Home