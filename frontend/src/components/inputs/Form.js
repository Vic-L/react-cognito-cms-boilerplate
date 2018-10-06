import React from 'react'
import autobind from 'autobind-decorator'
import Loadable from 'react-loadable'
import moment from 'moment'

const TextField = Loadable({
  loader: () => import('_inputs/TextField'),
  loading: () => <div></div>,
})
const SelectField = Loadable({
  loader: () => import('_inputs/SelectField'),
  loading: () => <div></div>,
})
const RestrictedSelectField = Loadable({
  loader: () => import('_inputs/RestrictedSelectField'),
  loading: () => <div></div>,
})
const CountrySelector = Loadable({
  loader: () => import('_inputs/CountrySelector'),
  loading: () => <div></div>,
})
const AutoSuggestField = Loadable({
  loader: () => import('_inputs/AutoSuggestField'),
  loading: () => <div></div>,
})
const DatePickerField = Loadable({
  loader: () => import('_inputs/DatePickerField'),
  loading: () => <div></div>,
})
const FileField = Loadable({
  loader: () => import('_inputs/FileField'),
  loading: () => <div></div>,
})
const WYSIWYG = Loadable({
  loader: () => import('_inputs/WYSIWYG'),
  loading: () => <div></div>,
})
const TextArea = Loadable({
  loader: () => import('_inputs/TextArea'),
  loading: () => <div></div>,
})
const Button = Loadable({
  loader: () => import('_buttons/Button'),
  loading: () => <div></div>,
})
const ButtonWithLoader = Loadable({
  loader: () => import('_buttons/ButtonWithLoader'),
  loading: () => <div></div>,
})

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      formObject: {
        textAreaWithoutError: null,
        textAreaWithError: null,
        fieldWithNoError: null,
        fieldWithError: null,
        selectFieldWithNoError: null,
        restrictedSelectField: null,
        countrySelectorField: null,
        autoSuggestFieldWithNoError: null,
        datePickerFieldWithNoError: null,
        fileFieldWithoutError: null,
        fileFieldWithError: null,
      },
    }
  }

  render() {
    const { formObject, formErrors } = this.state

    return (
      <div>
        <TextField
          name="fieldWithNoError"
          placeholder="FieldWithNoError"
          type="text"
          label="FIELDWITHNOERROR"
          value={formObject.fieldWithNoError}
          error={""}
          onChange={this.onChangeFieldWithNoError}/>

        <TextArea
          name="textAreaWithoutError"
          placeholder="Enter text here"
          value={formObject.textAreaWithoutError}
          error={""}
          onChange={this.onChangeTextAreaWithoutError}/>

        <TextArea
          name="textAreaWithError"
          placeholder="Enter text here"
          value={formObject.textAreaWithError}
          error={"textAreaWithError"}
          onChange={this.onChangeTextAreaWithError}/>

        <TextField
          name="fieldWithError"
          placeholder="FieldWithError"
          type="text"
          label="FIELDWITHERROR"
          value={formObject.fieldWithError}
          error={'fieldWithError'}
          onChange={this.onChangeFieldWithError}/>

        <SelectField
          name="selectFieldWithNoError"
          placeholder="SelectFieldWithNoError"
          type="text"
          label="SELECTFIELDWITHNOERROR"
          value={formObject.selectFieldWithNoError}
          error={""}
          options={this.getOptions()}
          onChange={this.onChangeSelectFieldWithNoError}/>

        <RestrictedSelectField
          name="restrictedSelectField"
          placeholder="RestrictedSelectField"
          type="text"
          label="RESTRICTEDSELECTFIELD"
          value={formObject.restrictedSelectField}
          error={""}
          fullOptions={this.getOptions()}
          selectableOptions={[this.getOptions()[0]]}
          onChange={this.onChangeRestrictedSelectFieldWithNoError}/>

        <CountrySelector
          name="countrySelectorField"
          placeholder="Select Country"
          type="text"
          label="COUNTRY"
          labelKey="name"
          valueKey="alpha-2"
          value={formObject.countrySelectorField}
          error={""}
          onChange={this.onChangeCountrySelector}/>

        <AutoSuggestField
          name="AutoSuggestFieldWithNoError"
          placeholder="AutoSuggestFieldWithNoError"
          type="text"
          label="AUTOSUGGESTFIELDWITHNOERROR"
          value={formObject.autoSuggestFieldWithNoError}
          error={""}
          suggestionList={['John', 'Paul', 'George', 'Ringo']}
          onChange={this.onChangeAutoSuggestFieldWithNoError}/>

        <DatePickerField
          name="DatePickerFieldWithNoError"
          placeholder="DatePickerFieldWithNoError"
          type="text"
          label="DATEPICKERFIELDWITHNOERROR"
          value={formObject.datePickerFieldWithNoError}
          error={""}
          dateDisplayFormat="YYYY/MM/DD"
          minDate={moment().subtract(2, 'weeks')}
          maxDate={moment().add(1, 'year')}
          onChange={this.onChangeDatePickerFieldWithNoError}/>

        <FileField
          name="FileFieldWithoutError"
          text="FileFieldWithoutError"
          file={formObject.fileFieldWithoutError}
          error={""}
          onChange={this.onChangeFileFieldWithoutError}/>

        <FileField
          name="FileFieldWithError"
          text="FileFieldWithError"
          file={formObject.fileFieldWithError}
          error={"This field is required"}
          onChange={this.onChangeFileFieldWithError}/>

        <Button
          className="button"
          text="SUBMIT"/>

        <ButtonWithLoader
          className="button"
          text="SUBMIT WITH LOADER"
          isLoading={this.state.isLoading}
          onClick={this.toggleLoading}/>

        <WYSIWYG/>
      </div>
    )
  }

  getOptions() {
    return [
      {label: "label1", value: 1},
      {label: "label2", value: 2},
      {label: "label3", value: 3},
    ]
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
  onChangeTextAreaWithoutError(e) {
    this.setState({
      formObject: {
        ...this.state.formObject,
        textAreaWithoutError: e.target.value
      }
    })
  }

  @autobind
  onChangeTextAreaWithError(e) {
    this.setState({
      formObject: {
        ...this.state.formObject,
        textAreaWithError: e.target.value
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

  @autobind
  onChangeSelectFieldWithNoError(selectedOptionValue) {
    this.setState({
      formObject: {
        ...this.state.formObject,
        selectFieldWithNoError: selectedOptionValue
      }
    })
  }

  @autobind
  onChangeRestrictedSelectFieldWithNoError(selectedOptionValue) {
    this.setState({
      formObject: {
        ...this.state.formObject,
        restrictedSelectField: selectedOptionValue
      }
    })
  }

  @autobind
  onChangeCountrySelector(selectedCountry) {
    this.setState({
      formObject: {
        ...this.state.formObject,
        countrySelectorField: selectedCountry
      }
    })
  }

  @autobind
  onChangeAutoSuggestFieldWithNoError(e) {
    this.setState({
      formObject: {
        ...this.state.formObject,
        autoSuggestFieldWithNoError: e.target.value
      }
    })
  }

  @autobind
  onChangeDatePickerFieldWithNoError(dateString) {
    this.setState({
      formObject: {
        ...this.state.formObject,
        datePickerFieldWithNoError: dateString
      }
    })
  }

  @autobind
  onChangeFileFieldWithoutError(e) {
    this.setState({
      formObject: {
        ...this.state.formObject,
        fileFieldWithoutError: e.target.files[0]
      }
    })
  }

  @autobind
  onChangeFileFieldWithError(e) {
    this.setState({
      formObject: {
        ...this.state.formObject,
        fileFieldWithError: e.target.files[0]
      }
    })
  }

  @autobind
  toggleLoading() {
    this.setState({
      isLoading: !this.state.isLoading
    })
    setTimeout(() => {
      this.setState({
        isLoading: !this.state.isLoading
      })
    }, 2000)
  }
}

export default Form
