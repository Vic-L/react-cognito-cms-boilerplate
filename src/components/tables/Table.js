import React from 'react'

class Table extends React.Component {
  render() {
    return (~
      %table.unstriped.hover.table-scroll
        %thead
          %tr
            %th Header 1
            %th Header 2
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
}

export { Table }
