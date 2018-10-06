import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import PropTypes from 'prop-types'

const WYSIWYG = ({
  wrapperStyle,
  editorStyle,
  toolbarStyle,
  editorState,
  onEditorStateChange,
}) => {
  return (
    <Editor
      wrapperClassName="wysiwyg-wrapper"
      editorClassName="wysiwyg-editor"
      toolbarClassName="wysiwyg-toolbar"
      wrapperStyle={wrapperStyle || {}}
      editorStyle={editorStyle || {}}
      toolbarStyle={toolbarStyle || {}}
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
    />
  )
}

WYSIWYG.propTypes = {
  wrapperStyle: PropTypes.object,
  editorStyle: PropTypes.object,
  toolbarStyle: PropTypes.object,
  editorState: PropTypes.object.isRequired,
  onEditorStateChange: PropTypes.func.isRequired,
}

export default WYSIWYG