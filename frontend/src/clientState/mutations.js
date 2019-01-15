import gql from 'graphql-tag'

export const UPDATE_ALERT = gql`
  mutation(
    $title: String,
    $body: String,
  ) {
    updateAlert(
      title: $title,
      body: $body,
    ) @client {
      title
    }
  }
`
