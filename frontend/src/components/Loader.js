import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'

const Loader = ({loadingFromReducer, loading: isLoadingFromGraphql, error}) => {
  console.log('Loader error', error)
    const isLoadingFromReducer = _.some(Object.keys(loadingFromReducer), (loadingKey) => {
    return loadingFromReducer[loadingKey]
  })

  if (isLoadingFromGraphql || isLoadingFromReducer) {
    return (
      <div className='loading-overlay'>
        <h1>ロード中...</h1>
      </div>
    )
  } else {
    return null
  }
  
}

function mapStateToProps({ loading }) {
  return { loadingFromReducer: loading }
}

export default connect(mapStateToProps)(Loader)