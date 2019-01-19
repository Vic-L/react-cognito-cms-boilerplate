function mutate(cache, data) {
  cache.writeData({ data })
}

const resolvers = {
  Mutation: {
    updateAlert: (_, {
      title,
      body,
      actions,
    }, { cache }) => {
      const payload = {
        alert: {
          __typename: 'Alert',
          title,
          body,
          actions: actions.map(action => { 
            return {
              __typename: 'AlertAction',
              ...action
            }
          })
        }
      }
      mutate(cache, payload)
      return null
    },

    dismissAlert: (_, {
      action,
    }, { cache }) => {
      const payload = {
        alert: {
          __typename: 'Alert',
          title: null,
          body: null,
          actions: null,
        }
      }
      mutate(cache, payload)
      return action
    }
  }
}

export default resolvers
