import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Box } from '@rebass/grid'

import TransitionWrapper from '_transitions/TransitionWrapper'
import * as ContentLoaders from '_contentLoaders'
import withCallbackAlert from '_hocs/withCallbackAlert'

const ButtonWithLoader = React.lazy(() => import('_buttons/ButtonWithLoader'))

const getPostsQuery = gql`
  query getPosts($count: Int!) {
    allPosts(count: $count) {
      id
      title
    }
  }
`

const Dashboard = ({
  updateAlert,
  alertResponse,
  updateAlertResponse,
}) => {
  return(
    <React.Fragment>
      <Box
        width={1/3}
        mx='auto'
        alignSelf='center'
        css={{
          textAlign: 'center'
        }}>
        <h1>GRAPHQL Posts</h1>
        <Query
          fetchPolicy='network-only'
          query={getPostsQuery}
          variables={{ count: 10 }}>

          {({ loading, error, data, refetch }) => {
            if (error) return <p>Error! {error.message}</p>

            if (alertResponse === 'POSITIVE') {
              refetch()
            }

            if (alertResponse) {
              updateAlertResponse({
                variables: {
                  alertResponse: null
                }
              })
            }

            const html = [
              <React.Suspense
                key='refetch-button'
                fallback={<ContentLoaders.Button/>}>
                <ButtonWithLoader
                  isLoading={loading}
                  text="Refetch!"
                  onClick={() => {
                    updateAlert({
                      variables: {
                        title: '',
                        body: 'Are you sure?',
                        actions: [
                          {
                            text: 'YES',
                            alertResponse: 'POSITIVE',
                          },
                          {
                            text: 'NO',
                            alertResponse: 'NEGATIVE',
                          }
                        ]
                      }
                    })
                  }}/>
              </React.Suspense>
            ]

            if (_.isNil(data.allPosts)) {
              html.unshift(<p key='no-post'>No posts!</p>)
              return html
            }

            const posts = data.allPosts.map((post, index) => {
              return (
                <p key={`post-${index}`}>{post.title}</p>
              )
            })

            posts.push(html)
            return posts
          }}
        </Query>
      </Box>
    </React.Fragment>
  )
}

export default TransitionWrapper(withCallbackAlert(Dashboard))