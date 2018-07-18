import React from 'react'
import Loadable from 'react-loadable'

const Table = Loadable({
  loader: () => import('_tables/Table'),
  loading: () => <div></div>,
})

class Dashboard extends React.Component {
  render() {
    return (~
      %div
        %Table
    ~)
  }
}

export default Dashboard