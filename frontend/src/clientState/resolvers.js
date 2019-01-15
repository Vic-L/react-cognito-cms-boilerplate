function mutate(cache, payload) {
  cache.writeData({ data: payload })
}

const resolvers = {
  Mutation: {
    updateAlert: (_, {
      title,
      body,
    }, { cache }) => {
      mutate(cache, {
        alert: {
          __typename: 'Alert',
          title,
          body,
        }
      })
      return null;
    }
  }
}

export default resolvers
