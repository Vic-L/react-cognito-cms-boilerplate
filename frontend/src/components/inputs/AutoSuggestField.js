import _ from 'lodash'
import React from 'react'
import autobind from 'autobind-decorator'
import Loadable from 'react-loadable'
import Autosuggest from 'react-autosuggest'

const TextField = Loadable({
  loader: () => import('_inputs/TextField'),
  loading: () => <div></div>,
})

class AutoSuggestField extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      suggestions: [],
    }
  }

  render() {
    return (
      <div className='auto-suggest-field-container'>
        <TextField
          name={this.props.name}
          placeholder={this.props.placeholder}
          type={this.props.type}
          label={this.props.label}
          error={this.props.error}
          value={this.props.value}
          onChange={this.onChange}/>
        <Autosuggest
          ref='autosuggest'
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={{
            value: this.props.value,
            onChange: null // not needed and should not triggered
          }}
          alwaysRenderSuggestions={this.shouldRenderSuggestion}
          shouldRenderSuggestions={(value) => value.trim().length > 1}/>
      </div>
    )
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

export default AutoSuggestField
