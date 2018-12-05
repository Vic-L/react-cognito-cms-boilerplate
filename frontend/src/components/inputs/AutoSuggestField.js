import _ from 'lodash'
import React from 'react'
import autobind from 'autobind-decorator'
import Autosuggest from 'react-autosuggest'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { InputField } from '_contentLoaders'

const TextField = React.lazy(() => import('_inputs/TextField'))

const AutoSuggestFieldContainer = styled.div`
  position: relative;
  display: block;
`

class AutoSuggestField extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      suggestions: [],
      inFocus: false
    }
  }

  render() {
    return (
      <AutoSuggestFieldContainer>
        <React.Suspense fallback={<InputField/>}>
          <TextField
            name={this.props.name}
            placeholder={this.props.placeholder}
            type={this.props.type}
            label={this.props.label}
            error={this.props.error}
            value={this.props.value}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.onChange}/>
          <Autosuggest
            ref='autosuggest'
            suggestions={this.state.suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={{
              value: this.props.value || "", // AutoSuggest need to trim value, so cannot be null
              onChange: () => {} // not needed and should not triggered
            }}
            alwaysRenderSuggestions={this.state.inFocus}
            shouldRenderSuggestions={(value) => value.trim().length > 1}/>
        </React.Suspense>
      </AutoSuggestFieldContainer>
    )
  }

  @autobind
  onFocus() {
    this.setState({inFocus: true})
  }

  @autobind
  onBlur() {
    // delay blur() so that suggestions stays rendered under `alwaysRenderSuggestions`
    setTimeout(() => {
      if (_.includes(this.state.suggestions, this.props.value)) {
        this.setState({inFocus: false})
      } else {
        // mock a synthetic event object with only the neccessary keys to reuse method
        const e = {
          target: {value: null}
        }
        this.onChange(e)

        this.setState({
          inFocus: false,
        })
      }
    }, 100)
  }

  @autobind
  onChange(e) {
    this.props.onChange(e)
    // onSuggestionsFetchRequested need to be triggered manually
    this.refs.autosuggest.props.onSuggestionsFetchRequested({
      value: e.target.value,
      reason: 'input-changed'
    })
  }

  @autobind
  shouldRenderSuggestion() {

  }

  @autobind
  onSuggestionsFetchRequested({ value }) {
    this.setState({suggestions: this.getSuggestions(value)})
  }

  @autobind
  getSuggestions(value) {
    if (value) {
      const regexp = new RegExp(value.trim().toLowerCase(), 'i')
      return this.props.suggestionList.filter(suggestion => {
        return suggestion.toLowerCase().match(regexp)
      })
    } else {
      return []
    }
  }

  @autobind
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    })
  }

  @autobind
  getSuggestionValue(suggestion) {
    // mock a synthetic event object with only the neccessary keys to reuse method
    const e = {
      target: {value: suggestion}
    }
    this.onChange(e)

    return suggestion
  }

  @autobind
  renderSuggestion(suggestion) {
    return (
      <div>
        {suggestion}
      </div>
    )
  }
}

AutoSuggestField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  error: PropTypes.string,
  suggestionList: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

export default AutoSuggestField
