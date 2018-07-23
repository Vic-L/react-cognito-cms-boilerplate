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
        fieldName1: "",
        fieldName2: "",
      },
      formErrors: {
        fieldName1: "",
        fieldName2: "",
      }
    }
  }

  render() {
    const { formObject, formErrors } = this.state

    return (
      <div>
        <TextField
          name="fieldName1"
          placeholder="placeholder"
          type="text"
          label="label"
          error={formErrors.fieldName1}
          value={formObject.fieldName1}
          onChange={this.onChangefieldName1}/>
      </div>
    )
  }

  @autobind
  onChangefieldName1(e) {
    this.setState({
      formObject: {
        ...formObject,
        fieldName1: e.target.value
      }
    })
  }
}

export default Form
