import React from 'react'
import autobind from 'autobind-decorator'
import moment from 'moment'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

import * as ContentLoaders from '_contentLoaders'
import AnimationWrapper from '_animationWrappers/AnimationWrapper'

const TextField = React.lazy(() => import('_inputs/TextField'))
const SelectField = React.lazy(() => import('_inputs/SelectField'))
const RestrictedSelectField = React.lazy(() => import('_inputs/RestrictedSelectField'))
const CountrySelector = React.lazy(() => import('_inputs/CountrySelector'))
const AutoSuggestField = React.lazy(() => import('_inputs/AutoSuggestField'))
const DatePickerField = React.lazy(() => import('_inputs/DatePickerField'))
const FileField = React.lazy(() => import('_inputs/FileField'))
const WYSIWYG = React.lazy(() => import('_inputs/WYSIWYG'))
const Checkbox = React.lazy(() => import('_inputs/Checkbox'))
const TextArea = React.lazy(() => import('_inputs/TextArea'))
const Button = React.lazy(() => import('_buttons/Button'))
const ButtonWithLoader = React.lazy(() => import('_buttons/ButtonWithLoader'))

class Form extends React.Component {
  constructor(props) {
    super(props)

    const initialHTML = '<p><strong>ONE PIECE</strong> rox!</p>'
    const initialContentBlock = htmlToDraft(initialHTML)
    this.state = {
      in: true,
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
        editorState: EditorState.createEmpty(),
        isMaleChecked: true,
        isFemaleChecked: false,
      },
    }

    if (initialContentBlock) {
      const initialContentState = ContentState.createFromBlockArray(initialContentBlock.contentBlocks)
      const initialEditorState = EditorState.createWithContent(initialContentState)
      this.state.formObject.editorState = initialEditorState
    }
  }

  componentWillUnmount() {
    this.setState({in: false})
  }

  render() {
    const { formObject, formErrors } = this.state

    return (
      <AnimationWrapper
        classNames="fade"
        shouldShow={this.state.in}
        render={() => {
          return (
            <div>
              <ContentLoaders.Button/>
              <ContentLoaders.InputField/>

              <div className='grid-x grid-margin-x'>
                <div className='cell medium-6 text-center'>
                  <React.Suspense fallback={<div/>}>
                    <Checkbox
                      text="Male"
                      isChecked={formObject.isMaleChecked}
                      onClick={this.onCheckMale}/>
                  </React.Suspense>
                  <React.Suspense fallback={<div/>}>
                    <Checkbox
                      text="Female"
                      isChecked={formObject.isFemaleChecked}
                      onClick={this.onCheckFemale}/>
                  </React.Suspense>
                </div>
              </div>

              <div className='grid-x grid-margin-x'>
                <div className='cell medium-6'>
                  <React.Suspense fallback={<ContentLoaders.InputField/>}>
                    <TextField
                      name="fieldWithNoError"
                      placeholder="FieldWithNoError"
                      type="text"
                      label="FIELDWITHNOERROR"
                      value={formObject.fieldWithNoError}
                      error={""}
                      onChange={this.onChangeFieldWithNoError}/>
                  </React.Suspense>
                </div>
              </div>

              <div className='grid-x grid-margin-x'>
                <div className='cell medium-6'>
                  <React.Suspense fallback={<ContentLoaders.TextAreaField/>}>
                    <TextArea
                      name="textAreaWithoutError"
                      placeholder="Enter text here"
                      value={formObject.textAreaWithoutError}
                      error={""}
                      onChange={this.onChangeTextAreaWithoutError}/>
                  </React.Suspense>
                </div>
              </div>

              <div className='grid-x grid-margin-x'>
                <div className='cell medium-6'>
                  <React.Suspense fallback={<ContentLoaders.TextAreaField/>}>
                    <TextArea
                      name="textAreaWithError"
                      placeholder="Enter text here"
                      value={formObject.textAreaWithError}
                      error={"textAreaWithError"}
                      onChange={this.onChangeTextAreaWithError}/>
                  </React.Suspense>
                </div>
              </div>

              <div className='grid-x grid-margin-x'>
                <div className='cell medium-6'>
                  <React.Suspense fallback={<ContentLoaders.InputField/>}>
                    <TextField
                      name="fieldWithError"
                      placeholder="FieldWithError"
                      type="text"
                      label="FIELDWITHERROR"
                      value={formObject.fieldWithError}
                      error={'fieldWithError'}
                      onChange={this.onChangeFieldWithError}/>
                  </React.Suspense>
                </div>
              </div>

              <div className='grid-x grid-margin-x'>
                <div className='cell medium-6'>
                  <React.Suspense fallback={<ContentLoaders.InputField/>}>
                    <SelectField
                      name="selectFieldWithNoError"
                      placeholder="SelectFieldWithNoError"
                      type="text"
                      label="SELECTFIELDWITHNOERROR"
                      value={formObject.selectFieldWithNoError}
                      error={""}
                      options={this.getOptions()}
                      onChange={this.onChangeSelectFieldWithNoError}/>
                  </React.Suspense>
                </div>
              </div>

              <div className='grid-x grid-margin-x'>
                <div className='cell medium-6'>
                  <React.Suspense fallback={<ContentLoaders.InputField/>}>
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
                  </React.Suspense>
                </div>
              </div>

              <div className='grid-x grid-margin-x'>
                <div className='cell medium-6'>
                  <React.Suspense fallback={<ContentLoaders.InputField/>}>
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
                  </React.Suspense>
                </div>
              </div>

              <div className='grid-x grid-margin-x'>
                <div className='cell medium-6'>
                  <React.Suspense fallback={<ContentLoaders.InputField/>}>
                    <AutoSuggestField
                      name="AutoSuggestFieldWithNoError"
                      placeholder="AutoSuggestFieldWithNoError"
                      type="text"
                      label="AUTOSUGGESTFIELDWITHNOERROR"
                      value={formObject.autoSuggestFieldWithNoError}
                      error={""}
                      suggestionList={['John', 'Paul', 'George', 'Ringo']}
                      onChange={this.onChangeAutoSuggestFieldWithNoError}/>
                  </React.Suspense>
                </div>
              </div>

              <div className='grid-x grid-margin-x'>
                <div className='cell medium-6'>
                  <React.Suspense fallback={<ContentLoaders.InputField/>}>
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
                  </React.Suspense>
                </div>
              </div>

              <div className='grid-x grid-margin-x'>
                <div className='cell medium-6'>
                  <React.Suspense fallback={<ContentLoaders.InputField/>}>
                    <FileField
                      name="FileFieldWithoutError"
                      text="FileFieldWithoutError"
                      file={formObject.fileFieldWithoutError}
                      error={""}
                      onChange={this.onChangeFileFieldWithoutError}/>
                  </React.Suspense>
                </div>
              </div>

              <div className='grid-x grid-margin-x'>
                <div className='cell medium-6'>
                  <React.Suspense fallback={<ContentLoaders.InputField/>}>
                    <FileField
                      name="FileFieldWithError"
                      text="FileFieldWithError"
                      file={formObject.fileFieldWithError}
                      error={"This field is required"}
                      onChange={this.onChangeFileFieldWithError}/>
                  </React.Suspense>
                </div>
              </div>

              <div className='grid-x grid-margin-x'>
                <div className='cell medium-6'>
                  <React.Suspense fallback={<div/>}>
                    <WYSIWYG
                      editorState={formObject.editorState}
                      onEditorStateChange={this.onEditorStateChange}
                      toolbar={{
                        image: {
                          previewImage: true,
                          uploadCallback: this.uploadImageCallBack,
                          alt: { present: true, mandatory: false },
                        },
                      }}
                      placeholder='Begin typing...'/>
                  </React.Suspense>
                </div>

                <div className='cell medium-6'>
                  <textarea
                    disabled
                    value={draftToHtml(convertToRaw(formObject.editorState.getCurrentContent()))}/>
                </div>
              </div>

              <div className='grid-x grid-margin-x'>
                <div className='cell medium-6 text-center'>
                  <React.Suspense fallback={<ContentLoaders.Button/>}>
                    <Button onClick={this.onSubmit}>
                      SUBMIT
                    </Button>
                  </React.Suspense>
                </div>
              </div>

              <div className='grid-x grid-margin-x'>
                <div className='cell medium-6 text-center'>
                  <React.Suspense fallback={<ContentLoaders.Button/>}>
                    <ButtonWithLoader
                      text="SUBMIT WITH LOADER"
                      isLoading={this.state.isLoading}
                      onClick={this.toggleLoading}/>
                  </React.Suspense>
                </div>
              </div>

            </div>
          )
        }}/>
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
  onCheckMale() {
    const { formObject } = this.state
    this.setState({
      formObject: {
        ...formObject,
        isMaleChecked: !formObject.isMaleChecked
      }
    })
  }

  @autobind
  onCheckFemale() {
    const { formObject } = this.state
    this.setState({
      formObject: {
        ...formObject,
        isFemaleChecked: !formObject.isFemaleChecked
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

  @autobind
  onEditorStateChange(editorState) {
    this.setState({
      formObject: {
        ...this.state.formObject,
        editorState,
      }
    })
  }

  @autobind
  uploadImageCallBack(file) {
    return new Promise(
      (resolve, reject) => {
        resolve({ data: { link: URL.createObjectURL(file) } })
      }
    )
  }

  @autobind
  onSubmit() {
    console.log("this.state", this.state)
  }
}

export default Form
