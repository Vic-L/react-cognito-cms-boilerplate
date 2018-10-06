import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg'


const WYSIWYG = ({
  wrapperStyle,
  editorStyle,
  toolbarStyle
}) => {
  return (
    <Editor
      wrapperClassName="wysiwyg-wrapper"
      editorClassName="wysiwyg-editor"
      toolbarClassName="wysiwyg-toolbar"
      wrapperStyle={wrapperStyle}
      editorStyle={editorStyle}
      toolbarStyle={toolbarStyle}
    />
  )
}

export default WYSIWYG