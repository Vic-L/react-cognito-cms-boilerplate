export const typeDefs = `
  type Alert {
    title: String
    body: String
  }

  type Mutation {
    updateAlert(
      title: String,
      body: String
    ): Alert
  }

  type Query {
    alert: Alert
  }
`
