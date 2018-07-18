import React from 'react'
import Loadable from 'react-loadable'

import {
  LoadingModal
} from '_miscellaneous'

const Table = Loadable({
  loader: () => import('_tables'),
  loading: LoadingModal,
  render(loaded, props) {
    let Component = loaded.Table
    return <Component {...props}/>
  }
})

class Dashboard extends React.Component {
  render() {
    return (~
      %div
        %Table
    ~)
  }
}

export { Dashboard }