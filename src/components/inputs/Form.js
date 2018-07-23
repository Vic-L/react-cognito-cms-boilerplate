import React from 'react'
import autobind from 'autobind-decorator'
import Loadable from 'react-loadable'

const TextField = Loadable({
  loader: () => import('_inputs/TextField'),
  loading: () => <div></div>,
})
// const SelectField = Loadable({
//   loader: () => import('_inputs/SelectField'),
//   loading: () => <div></div>,
// })

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      formObject: {
        fieldWithNoError: "",
        fieldWithError: "",
      },
      formErrors: {
        fieldWithNoError: "",
        fieldWithError: "",
      }
    }
  }

  render() {
    const { formObject, formErrors } = this.state

    return (
      <div>
        <TextField
          name="fieldWithNoError"
          placeholder="placeholder"
          type="text"
          label="FieldWithNoError"
          value={formObject.fieldWithNoError}
          error={formErrors.fieldWithNoError}
          onChange={this.onChangeFieldWithNoError}/>

        <TextField
          name="fieldWithError"
          placeholder="placeholder"
          type="text"
          label="FieldWithError"
          value={formObject.fieldWithError}
          error={'fieldWithError'}
          onChange={this.onChangeFieldWithError}/>
      </div>
    )
  }

  @autobind
  onChangeFieldWithNoError(e) {
    this.setState({
      formObject: {
        ...this.state.formObject,
        fieldWithNoError: e.target.value
      }
    })
  }

  @autobind
  onChangeFieldWithError(e) {
    this.setState({
      formObject: {
        ...this.state.formObject,
        fieldWithError: e.target.value
      }
    })
  }
}

export default Form
