import React from 'react'

import { ClickableTableHeader } from '_tables'

// TODO Table component should be customised?
class Table extends React.Component {
  render() {
    return (~
      %table.unstriped.hover.table-scroll
        %thead
          %tr
            %th Header 1
            %ClickableTableHeader(
              title="Sortable Header 2"
              onClick={this.handleHeader2Change})
            %th Header 3
        %tbody
          %tr
            %td Body 1A
            %td Body 2A
            %td Body 3A
          %tr
            %td Body 1B
            %td Body 2B
            %td Body 3B
    ~)
  }

  handleHeader2Change() {
    alert("handleHeader2Change")
  }
}

export { Table }
