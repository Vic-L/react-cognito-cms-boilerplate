import React from 'react'
import Loadable from 'react-loadable'

import LoadingModal from '_miscellaneous/LoadingModal'

const Table = Loadable({
  loader: () => import('_tables/Table'),
  loading: LoadingModal,
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