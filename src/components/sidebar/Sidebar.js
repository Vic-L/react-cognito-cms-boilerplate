import React from 'react'

import { SidebarOption } from '_sidebar'

class Sidebar extends React.Component {
  render() {
    return (~
      .sidebar
        %SidebarOption(dst="#")
    ~)
  }
}

export { Sidebar }
