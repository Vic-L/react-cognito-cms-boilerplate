import React from 'react';
import { fromJS } from 'immutable';
import autobind from 'autobind-decorator';
import moment from 'moment';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Grid, Cell } from 'styled-css-grid';

import Shimmer from '_elements/Shimmer';
import TransitionWrapper from '_transitions/TransitionWrapper';

const TextField = React.lazy(() => import('_elements/TextField'));
const SelectField = React.lazy(() => import('_elements/SelectField'));
const CountrySelector = React.lazy(() => import('_elements/CountrySelector'));
const AutoSuggestField = React.lazy(() => import('_elements/AutoSuggestField'));
const DatePickerField = React.lazy(() => import('_elements/DatePickerField'));
const WeekPickerField = React.lazy(() => import('_elements/WeekPickerField'));
const FileField = React.lazy(() => import('_elements/FileField'));
const WYSIWYG = React.lazy(() => import('_elements/WYSIWYG'));
const Checkbox = React.lazy(() => import('_elements/Checkbox'));
const TextArea = React.lazy(() => import('_elements/TextArea'));
const Button = React.lazy(() => import('_elements/Button'));
const ButtonWithLoader = React.lazy(() => import('_elements/ButtonWithLoader'));

class Form extends React.Component {
  constructor(props) {
    super(props);

    const initialHTML = '<p><strong>ONE PIECE</strong> rox!</p>';
    const initialContentBlock = htmlToDraft(initialHTML);
    this.state = {
      isLoading: false,
      formObject: fromJS({
        textAreaWithoutError: null,
        textAreaWithError: null,
        fieldWithNoError: null,
        fieldWithError: null,
        selectFieldWithNoError: null,
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
    };

    if (initialContentBlock) {
      const initialContentState = ContentState.createFromBlockArray(
        initialContentBlock.contentBlocks
      );
      const initialEditorState = EditorState.createWithContent(initialContentState);
      this.state.formObject.set('editorState', initialEditorState);
    }
  }

  @autobind
  onChangeFieldWithNoError(e) {
    const fieldWithNoError = e.target.value;
    this.setState(({ formObject }) => ({
      formObject: formObject.set('fieldWithNoError', fieldWithNoError)
    }));
  }

  @autobind
  onChangeTextAreaWithoutError(e) {
    const textAreaWithoutError = e.target.value;
    this.setState(({ formObject }) => ({
      formObject: formObject.set('textAreaWithoutError', textAreaWithoutError)
    }));
  }

  @autobind
  onChangeTextAreaWithError(e) {
    const textAreaWithError = e.target.value;
    this.setState(({ formObject }) => ({
      formObject: formObject.set('textAreaWithError', textAreaWithError)
    }));
  }

  @autobind
  onChangeFieldWithError(e) {
    const fieldWithError = e.target.value;
    this.setState(({ formObject }) => ({
      formObject: formObject.set('fieldWithError', fieldWithError)
    }));
  }

  @autobind
  onChangeSelectFieldWithNoError(selectedOptionValue) {
    this.setState(({ formObject }) => ({
      formObject: formObject.set('selectFieldWithNoError', selectedOptionValue)
    }));
  }

  @autobind
  onChangeCountrySelector(selectedCountry) {
    this.setState(({ formObject }) => ({
      formObject: formObject.set('countrySelectorField', selectedCountry)
    }));
  }

  @autobind
  onChangeAutoSuggestFieldWithNoError(e) {
    const autoSuggestFieldWithNoError = e.target.value;
    this.setState(({ formObject }) => ({
      formObject: formObject.set('autoSuggestFieldWithNoError', autoSuggestFieldWithNoError)
    }));
  }

  @autobind
  onChangeDatePickerFieldWithNoError(dateString) {
    this.setState(({ formObject }) => ({
      formObject: formObject.set('datePickerFieldWithNoError', dateString)
    }));
  }

  @autobind
  onChangeWeekPickerFieldWithNoError(dateString) {
    // will return monday of the week
    this.setState(({ formObject }) => ({
      formObject: formObject.set('weekPickerFieldWithNoError', dateString)
    }));
  }

  @autobind
  onChangeFileFieldWithoutError(e) {
    const fileFieldWithoutError = e.target.files[0];
    this.setState(({ formObject }) => ({
      formObject: formObject.set('fileFieldWithoutError', fileFieldWithoutError)
    }));
  }

  @autobind
  onChangeFileFieldWithError(e) {
    const fileFieldWithError = e.target.files[0];
    this.setState(({ formObject }) => ({
      formObject: formObject.set('fileFieldWithError', fileFieldWithError)
    }));
  }

  @autobind
  onCheckMale() {
    this.setState(({ formObject }) => ({
      formObject: formObject.set('isMaleChecked', !formObject.get('isMaleChecked'))
    }));
  }

  @autobind
  onCheckFemale() {
    this.setState(({ formObject }) => ({
      formObject: formObject.set('isFemaleChecked', !formObject.get('isFemaleChecked'))
    }));
  }

  @autobind
  onEditorStateChange(editorState) {
    this.setState(({ formObject }) => ({
      formObject: formObject.set('editorState', editorState)
    }));
  }

  @autobind
  onSubmit() {
    console.log('this.state', this.state);
  }

  getOptions() {
    return [
      { label: 'label1', value: 1 },
      { label: 'label2', value: 2 },
      { label: 'label3', value: 3 },
    ];
  }

  @autobind
  toggleLoading() {
    this.setState({
      isLoading: !this.state.isLoading
    });
    setTimeout(() => {
      this.setState({
        isLoading: !this.state.isLoading
      });
    }, 2000);
  }

  @autobind
  uploadImageCallBack(file) {
    return new Promise(
      (resolve) => {
        resolve({ data: { link: URL.createObjectURL(file) } });
      }
    );
  }

  render() {
    const { formObject } = this.state;

    return (
      <React.Fragment>
        <Shimmer />

        <Grid columns={2} gap='1rem'>
          {/* row */}
          <Cell center>
            <React.Suspense fallback={<Shimmer />}>
              <Checkbox
                text='Male'
                isChecked={formObject.get('isMaleChecked')}
                onClick={this.onCheckMale}
              />
            </React.Suspense>
          </Cell>
          <Cell center>
            <React.Suspense fallback={<Shimmer />}>
              <Checkbox
                text='Female'
                isChecked={formObject.get('isFemaleChecked')}
                onClick={this.onCheckFemale}
              />
            </React.Suspense>
          </Cell>

          {/* row */}
          <Cell>
            <React.Suspense fallback={<Shimmer />}>
              <TextField
                isFloating
                name='fieldWithNoError'
                placeholder='FieldWithNoError'
                type="text"
                label="FIELDWITHNOERROR"
                value={formObject.get('fieldWithNoError')}
                error={''}
                onChange={this.onChangeFieldWithNoError}
              />
            </React.Suspense>
          </Cell>
          <Cell />

          {/* row */}
          <Cell>
            <React.Suspense
              fallback={
                <Shimmer
                  css={`
                    height: 100px;
                    width: 100%`
                  }
                />
              }
            >
              <TextArea
                name='textAreaWithoutError'
                placeholder='Enter text here'
                value={formObject.get('textAreaWithoutError')}
                error={''}
                onChange={this.onChangeTextAreaWithoutError}
              />
            </React.Suspense>
          </Cell>
          <Cell />

          {/* row */}
          <Cell>
            <React.Suspense
              fallback={
                <Shimmer
                  css={`
                    height: 100px;
                    width: 100%`
                  }
                />
              }
            >
              <TextArea
                name='textAreaWithError'
                placeholder='Enter text here'
                value={formObject.get('textAreaWithError')}
                error={'textAreaWithError'}
                onChange={this.onChangeTextAreaWithError}
              />
            </React.Suspense>
          </Cell>
          <Cell />

          {/* row */}
          <Cell>
            <React.Suspense fallback={<Shimmer />}>
              <TextField
                name='fieldWithError'
                placeholder='FieldWithError'
                type="text"
                label="FIELDWITHERROR"
                value={formObject.get('fieldWithError')}
                error={'fieldWithError'}
                onChange={this.onChangeFieldWithError}
              />
            </React.Suspense>
          </Cell>
          <Cell />

          {/* row */}
          <Cell>
            <React.Suspense fallback={<Shimmer />}>
              <SelectField
                name='selectFieldWithNoError'
                placeholder='SelectFieldWithNoError'
                type="text"
                label="SELECTFIELDWITHNOERROR"
                value={formObject.get('selectFieldWithNoError')}
                error={''}
                options={this.getOptions()}
                onChange={this.onChangeSelectFieldWithNoError}
              />
            </React.Suspense>
          </Cell>
          <Cell />

          {/* row */}
          <Cell>
            <React.Suspense fallback={<Shimmer />}>
              <CountrySelector
                name='countrySelectorField'
                placeholder='Select Country'
                type="text"
                label="COUNTRY"
                labelKey="name"
                valueKey="alpha-2"
                value={formObject.get('countrySelectorField')}
                error={''}
                onChange={this.onChangeCountrySelector}
              />
            </React.Suspense>
          </Cell>
          <Cell />

          {/* row */}
          <Cell>
            <React.Suspense fallback={<Shimmer />}>
              <AutoSuggestField
                name='AutoSuggestFieldWithNoError'
                placeholder='AutoSuggestFieldWithNoError'
                type="text"
                label="AUTOSUGGESTFIELDWITHNOERROR"
                value={formObject.get('autoSuggestFieldWithNoError')}
                error={''}
                suggestionList={fromJS(['John', 'Paul', 'George', 'Ringo'])}
                onChange={this.onChangeAutoSuggestFieldWithNoError}
              />
            </React.Suspense>
          </Cell>
          <Cell />

          {/* row */}
          <Cell>
            <React.Suspense fallback={<Shimmer />}>
              <DatePickerField
                name='DatePickerFieldWithNoError'
                placeholder='DatePickerFieldWithNoError'
                type="text"
                label="DATEPICKERFIELDWITHNOERROR"
                value={formObject.get('datePickerFieldWithNoError')}
                error={''}
                dateDisplayFormat="YYYY/MM/DD"
                minDate={moment().subtract(2, 'weeks').toDate()}
                maxDate={moment().add(1, 'year').toDate()}
                onChange={this.onChangeDatePickerFieldWithNoError}
                fieldIconSrc='http://simpleicon.com/wp-content/uploads/Calendar-1.svg'
              />
            </React.Suspense>
          </Cell>
          <Cell />

          {/* row */}
          <Cell>
            <React.Suspense fallback={<Shimmer />}>
              <WeekPickerField
                name='WeekPickerFieldWithNoError'
                placeholder='WeekPickerFieldWithNoError'
                type="text"
                label="DATEPICKERFIELDWITHNOERROR"
                value={formObject.get('weekPickerFieldWithNoError')}
                error={''}
                minDate={moment().subtract(1, 'year').toDate()}
                maxDate={moment().add(1, 'year').toDate()}
                onChange={this.onChangeWeekPickerFieldWithNoError}
              />
            </React.Suspense>
          </Cell>
          <Cell />

          {/* row */}
          <Cell>
            <React.Suspense fallback={<Shimmer />}>
              <FileField
                name='FileFieldWithoutError'
                text='FileFieldWithoutError'
                file={formObject.get('fileFieldWithoutError')}
                error={''}
                onChange={this.onChangeFileFieldWithoutError}
              />
            </React.Suspense>
          </Cell>
          <Cell>
            <React.Suspense fallback={<Shimmer />}>
              <FileField
                name='FileFieldWithError'
                text='FileFieldWithError'
                file={formObject.get('fileFieldWithError')}
                error={'This field is required'}
                onChange={this.onChangeFileFieldWithError}
              />
            </React.Suspense>
          </Cell>

          {/* row */}
          <Cell>
            <React.Suspense fallback={<Shimmer />}>
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
                placeholder='Begin typing...'
              />
            </React.Suspense>
          </Cell>
          <Cell>
            <textarea
              disabled
              value={draftToHtml(convertToRaw(formObject.get('editorState').getCurrentContent()))}
            />
          </Cell>

          {/* row */}

          <Cell>
            <React.Suspense fallback={<Shimmer />}>
              <Button onClick={this.onSubmit}>
                SUBMIT
              </Button>
            </React.Suspense>
          </Cell>
          <Cell>
            <React.Suspense fallback={<Shimmer />}>
              <ButtonWithLoader
                text='SUBMIT WITH LOADER'
                isLoading={this.state.isLoading}
                onClick={this.toggleLoading}
              />
            </React.Suspense>
          </Cell>
        </Grid>
      </React.Fragment>
    );
  }
}

export default TransitionWrapper(Form);
