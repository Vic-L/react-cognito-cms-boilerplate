import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import TransitionWrapper from '_transitions/TransitionWrapper'

const getPostsQuery = gql`
  query getPosts($count: Int!) {
    allPosts(count: $count) {
      id
      title
    }
  }
`

const Dashboard = () => {
  return(
    <div>
      <h1>GRAPHQL Posts</h1>
      <Query
        fetchPolicy='network-only'
        query={getPostsQuery}
        variables={{ count: 10 }}>

        {({ loading, error, data }) => {
          if (loading) return <p>Loading..."</p>;
          if (error) return <p>Error! {error.message}</p>;

          if (_.isNil(data.allPosts)) {
            return <p>No posts!</p>
          }

          return data.allPosts.map((post, index) => {
            return (
              <p key={`post-${index}`}>{post.title}</p>
            )
          })
        }}
      </Query>
    </div>
  )
}

export default TransitionWrapper(Dashboard)