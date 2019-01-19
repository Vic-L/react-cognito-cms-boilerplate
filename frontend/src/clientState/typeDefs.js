const typeDefs = `
  type Alert {
    title: String
    body: String
    actions: [AlertAction]
  }

  type AlertAction {
    text: String
    alertResponse: AlertResponse!
  }

  enum AlertResponse {
    NEUTRAL
    POSITIVE
    NEGATIVE
  }

  type Mutation {
    updateAlert(
      title: String
      body: String
      actions: [AlertAction]!
    ): Boolean
  }

  type Mutation {
    dismissAlert(
      action: AlertAction
    ): AlertAction
  }

  type Query {
    alert: Alert
  }
`

export default typeDefs
