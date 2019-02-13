const typeDefs = `
  type Alert {
    title: String
    body: String
    actions: [AlertAction]
  }

  type AlertAction {
    text: String
    alertResponse: String!
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
    ): Boolean
  }

  type Mutation {
    updateAlertResponse(
      alertResponse: String
    ): Boolean
  }

  type Query {
    alert: Alert
  }
`;

export default typeDefs;
