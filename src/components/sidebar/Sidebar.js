import React from 'react'

import {
  SidebarOption,
  SidebarOptionWithDropdown
} from '_sidebar'

class Sidebar extends React.Component {
  render() {
    return (~
      .sidebar
        %SidebarOption(
          text="Link1"
          dst="#")
        %SidebarOptionWithDropdown(
          text="Link2"
          dst="#"
          dropdown={[
            {
              text: "Link2A",
              dst: "#"
            },
            {
              text: "Link2B",
              dst: "#"
            }
          ]})
    ~)
  }
}

export { Sidebar }
