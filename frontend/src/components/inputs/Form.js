import React from 'react';
import { fromJS } from 'immutable';
import autobind from 'autobind-decorator';
import moment from 'moment';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Grid, Cell } from 'styled-css-grid';

import * as ContentLoaders from '_contentLoaders';
import TransitionWrapper from '_transitions/TransitionWrapper';

const TextField = React.lazy(() => import('_inputs/TextField'))
const SelectField = React.lazy(() => import('_inputs/SelectField'))
const RestrictedSelectField = React.lazy(() => import('_inputs/RestrictedSelectField'))
const CountrySelector = React.lazy(() => import('_inputs/CountrySelector'))
const AutoSuggestField = React.lazy(() => import('_inputs/AutoSuggestField'))
const DatePickerField = React.lazy(() => import('_inputs/DatePickerField'))
const WeekPickerField = React.lazy(() => import('_inputs/WeekPickerField'))
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
      isLoading: false,
      formObject: fromJS({
        textAreaWithoutError: null,
        textAreaWithError: null,
        fieldWithNoError: null,
        fieldWithError: null,
        selectFieldWithNoError: null,
        restrictedSelectField: null,
        countrySelectorField: null,
        autoSuggestFieldWithNoError: null,
        datePickerFieldWithNoError: null,
        weekPickerFieldWithNoError: null,
        fileFieldWithoutError: null,
        fileFieldWithError: null,
        editorState: EditorState.createEmpty(),
        isMaleChecked: true,
        isFemaleChecked: false,
      }),
    }

    if (initialContentBlock) {
      const initialContentState = ContentState.createFromBlockArray(initialContentBlock.contentBlocks)
      const initialEditorState = EditorState.createWithContent(initialContentState)
      this.state.formObject.set('editorState', initialEditorState)
    }
  }

  render() {
    const { formObject } = this.state

    return (
      <React.Fragment>
        <ContentLoaders.Button/>
        <ContentLoaders.InputField/>

        <Grid columns={2} gap='1rem'>
          {/* row */}
          <Cell center>
            <React.Suspense fallback={<div/>}>
              <Checkbox
                text="Male"
                isChecked={formObject.get('isMaleChecked')}
                onClick={this.onCheckMale}/>
            </React.Suspense>
          </Cell>
          <Cell center>
            <React.Suspense fallback={<div/>}>
              <Checkbox
                text="Female"
                isChecked={formObject.get('isFemaleChecked')}
                onClick={this.onCheckFemale}/>
            </React.Suspense>
          </Cell>

          {/* row */}
          <Cell>
            <React.Suspense fallback={<ContentLoaders.InputField/>}>
              <TextField
                name="fieldWithNoError"
                placeholder="FieldWithNoError"
                type="text"
                label="FIELDWITHNOERROR"
                value={formObject.get('fieldWithNoError')}
                error={""}
                onChange={this.onChangeFieldWithNoError}/>
            </React.Suspense>
          </Cell>
          <Cell/>

          {/* row */}
          <Cell>
            <React.Suspense fallback={<ContentLoaders.TextAreaField/>}>
              <TextArea
                name="textAreaWithoutError"
                placeholder="Enter text here"
                value={formObject.get('textAreaWithoutError')}
                error={""}
                onChange={this.onChangeTextAreaWithoutError}/>
            </React.Suspense>
          </Cell>
          <Cell/>

          {/* row */}
          <Cell>
            <React.Suspense fallback={<ContentLoaders.TextAreaField/>}>
              <TextArea
                name="textAreaWithError"
                placeholder="Enter text here"
                value={formObject.get('textAreaWithError')}
                error={"textAreaWithError"}
                onChange={this.onChangeTextAreaWithError}/>
            </React.Suspense>
          </Cell>
          <Cell/>

          {/* row */}
          <Cell>
            <React.Suspense fallback={<ContentLoaders.InputField/>}>
              <TextField
                name="fieldWithError"
                placeholder="FieldWithError"
                type="text"
                label="FIELDWITHERROR"
                value={formObject.get('fieldWithError')}
                error={'fieldWithError'}
                onChange={this.onChangeFieldWithError}/>
            </React.Suspense>
          </Cell>
          <Cell/>

          {/* row */}
          <Cell>
            <React.Suspense fallback={<ContentLoaders.InputField/>}>
              <SelectField
                name="selectFieldWithNoError"
                placeholder="SelectFieldWithNoError"
                type="text"
                label="SELECTFIELDWITHNOERROR"
                value={formObject.get('selectFieldWithNoError')}
                error={""}
                options={this.getOptions()}
                onChange={this.onChangeSelectFieldWithNoError}/>
            </React.Suspense>
          </Cell>
          <Cell/>

          {/* row */}
          <Cell>
            <React.Suspense fallback={<ContentLoaders.InputField/>}>
              <RestrictedSelectField
                name="restrictedSelectField"
                placeholder="RestrictedSelectField"
                type="text"
                label="RESTRICTEDSELECTFIELD"
                value={formObject.get('restrictedSelectField')}
                error={""}
                fullOptions={this.getOptions()}
                selectableOptions={[this.getOptions()[0]]}
                onChange={this.onChangeRestrictedSelectFieldWithNoError}/>
            </React.Suspense>
          </Cell>
          <Cell/>

          {/* row */}
          <Cell>
            <React.Suspense fallback={<ContentLoaders.InputField/>}>
              <CountrySelector
                name="countrySelectorField"
                placeholder="Select Country"
                type="text"
                label="COUNTRY"
                labelKey="name"
                valueKey="alpha-2"
                value={formObject.get('countrySelectorField')}
                error={""}
                onChange={this.onChangeCountrySelector}/>
            </React.Suspense>
          </Cell>
          <Cell/>

          {/* row */}
          <Cell>
            <React.Suspense fallback={<ContentLoaders.InputField/>}>
              <AutoSuggestField
                name="AutoSuggestFieldWithNoError"
                placeholder="AutoSuggestFieldWithNoError"
                type="text"
                label="AUTOSUGGESTFIELDWITHNOERROR"
                value={formObject.get('autoSuggestFieldWithNoError')}
                error={""}
                suggestionList={fromJS(['John', 'Paul', 'George', 'Ringo'])}
                onChange={this.onChangeAutoSuggestFieldWithNoError}/>
            </React.Suspense>
          </Cell>
          <Cell/>

          {/* row */}
          <Cell>
            <React.Suspense fallback={<ContentLoaders.InputField/>}>
              <DatePickerField
                name="DatePickerFieldWithNoError"
                placeholder="DatePickerFieldWithNoError"
                type="text"
                label="DATEPICKERFIELDWITHNOERROR"
                value={formObject.get('datePickerFieldWithNoError')}
                error={""}
                dateDisplayFormat="YYYY/MM/DD"
                minDate={moment().subtract(2, 'weeks').toDate()}
                maxDate={moment().add(1, 'year').toDate()}
                onChange={this.onChangeDatePickerFieldWithNoError}
                fieldIconSrc='http://simpleicon.com/wp-content/uploads/Calendar-1.svg'/>
            </React.Suspense>
          </Cell>
          <Cell/>

          {/* row */}
          <Cell>
            <React.Suspense fallback={<ContentLoaders.InputField/>}>
              <WeekPickerField
                name="WeekPickerFieldWithNoError"
                placeholder="WeekPickerFieldWithNoError"
                type="text"
                label="DATEPICKERFIELDWITHNOERROR"
                value={formObject.get('weekPickerFieldWithNoError')}
                error={""}
                minDate={moment().subtract(1, 'year').toDate()}
                maxDate={moment().add(1, 'year').toDate()}
                onChange={this.onChangeWeekPickerFieldWithNoError}/>
            </React.Suspense>
          </Cell>
          <Cell/>

          {/* row */}
          <Cell>
            <React.Suspense fallback={<ContentLoaders.InputField/>}>
              <FileField
                name="FileFieldWithoutError"
                text="FileFieldWithoutError"
                file={formObject.get('fileFieldWithoutError')}
                error={""}
                onChange={this.onChangeFileFieldWithoutError}/>
            </React.Suspense>
          </Cell>
          <Cell>
            <React.Suspense fallback={<ContentLoaders.InputField/>}>
              <FileField
                name="FileFieldWithError"
                text="FileFieldWithError"
                file={formObject.get('fileFieldWithError')}
                error={"This field is required"}
                onChange={this.onChangeFileFieldWithError}/>
            </React.Suspense>
          </Cell>

          {/* row */}
          <Cell>
            <React.Suspense fallback={<div/>}>
              <WYSIWYG
                editorState={formObject.get('editorState')}
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
          </Cell>
          <Cell>
            <textarea
              disabled
              value={draftToHtml(convertToRaw(formObject.get('editorState').getCurrentContent()))}/>
          </Cell>

          {/* row */}

          <Cell>
            <React.Suspense fallback={<ContentLoaders.Button/>}>
              <Button onClick={this.onSubmit}>
                SUBMIT
              </Button>
            </React.Suspense>
          </Cell>
          <Cell>
            <React.Suspense fallback={<ContentLoaders.Button/>}>
              <ButtonWithLoader
                text="SUBMIT WITH LOADER"
                isLoading={this.state.isLoading}
                onClick={this.toggleLoading}/>
            </React.Suspense>
          </Cell>
        </Grid>
      </React.Fragment>
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
    const fieldWithNoError = e.target.value
    this.setState(({formObject}) => ({
      formObject: formObject.set('fieldWithNoError', fieldWithNoError)
    }))
  }

  @autobind
  onChangeTextAreaWithoutError(e) {
    const textAreaWithoutError = e.target.value
    this.setState(({formObject}) => ({
      formObject: formObject.set('textAreaWithoutError', textAreaWithoutError)
    }))
  }

  @autobind
  onChangeTextAreaWithError(e) {
    const textAreaWithError = e.target.value
    this.setState(({formObject}) => ({
      formObject: formObject.set('textAreaWithError', textAreaWithError)
    }))
  }

  @autobind
  onChangeFieldWithError(e) {
    const fieldWithError = e.target.value
    this.setState(({formObject}) => ({
      formObject: formObject.set('fieldWithError', fieldWithError)
    }))
  }

  @autobind
  onChangeSelectFieldWithNoError(selectedOptionValue) {
    this.setState(({formObject}) => ({
      formObject: formObject.set('selectFieldWithNoError', selectedOptionValue)
    }))
  }

  @autobind
  onChangeRestrictedSelectFieldWithNoError(selectedOptionValue) {
    this.setState(({formObject}) => ({
      formObject: formObject.set('restrictedSelectField', selectedOptionValue)
    }))
  }

  @autobind
  onChangeCountrySelector(selectedCountry) {
    this.setState(({formObject}) => ({
      formObject: formObject.set('countrySelectorField', selectedCountry)
    }))
  }

  @autobind
  onChangeAutoSuggestFieldWithNoError(e) {
    const autoSuggestFieldWithNoError = e.target.value
    this.setState(({formObject}) => ({
      formObject: formObject.set('autoSuggestFieldWithNoError', autoSuggestFieldWithNoError)
    }))
  }

  @autobind
  onChangeDatePickerFieldWithNoError(dateString) {
    this.setState(({formObject}) => ({
      formObject: formObject.set('datePickerFieldWithNoError', dateString)
    }))
  }

  @autobind
  onChangeWeekPickerFieldWithNoError(dateString) {
    // will return monday of the week
    this.setState(({formObject}) => ({
      formObject: formObject.set('weekPickerFieldWithNoError', dateString)
    }))
  }

  @autobind
  onChangeFileFieldWithoutError(e) {
    const fileFieldWithoutError = e.target.files[0]
    this.setState(({formObject}) => ({
      formObject: formObject.set('fileFieldWithoutError', fileFieldWithoutError)
    }))
  }

  @autobind
  onChangeFileFieldWithError(e) {
    const fileFieldWithError = e.target.files[0]
    this.setState(({formObject}) => ({
      formObject: formObject.set('fileFieldWithError', fileFieldWithError)
    }))
  }

  @autobind
  onCheckMale() {
    this.setState(({formObject}) => ({
      formObject: formObject.set('isMaleChecked', !formObject.get('isMaleChecked'))
    }))
  }

  @autobind
  onCheckFemale() {
    this.setState(({formObject}) => ({
      formObject: formObject.set('isFemaleChecked', !formObject.get('isFemaleChecked'))
    }))
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
    this.setState(({formObject}) => ({
      formObject: formObject.set('editorState', editorState)
    }))
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

export default TransitionWrapper(Form)
