import _ from 'lodash'

const SelectLoading = (actions) => (loading) => {
  // returns true only when all actions is not loading
  return _(actions) // make array of actions into a lodash instance for easy calling of lodash methods
    .some((action) => { // return true if predicate is truthy the first time
      console.log('loading.get(action)', loading.get(action))
    return loading.get(action)
  })
}

export default SelectLoading
