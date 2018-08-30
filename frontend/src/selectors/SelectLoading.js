import _ from 'lodash'

const SelectLoading = (actions) => (state) => {
  // returns true only when all actions is not loading
  return _(actions) // make array of actions into a lodash instance for easy calling of lodash methods
    .some((action) => { // return true if predicate is truthy the first time
    return _.get(state, `loading.${action}`)  // dot notation to access requestName of the action, following the format <ACTION>_REQUEST, <ACTION>_FAILURE, <ACTION>_SUCCESS
  })
}

export default SelectLoading