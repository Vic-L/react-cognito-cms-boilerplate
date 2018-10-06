import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import PropTypes from 'prop-types'

const WYSIWYG = ({
  wrapperStyle,
  editorStyle,
  toolbarStyle,
  editorState,
  toolbar,
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
      toolbar={toolbar}
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
    />
  )
}

WYSIWYG.propTypes = {
  wrapperStyle: PropTypes.object,
  editorStyle: PropTypes.object,
  toolbarStyle: PropTypes.object,
  toolbar: PropTypes.object,
  editorState: PropTypes.object.isRequired,
  onEditorStateChange: PropTypes.func.isRequired,
}

export default WYSIWYG