import React from 'react'
import Loadable from 'react-loadable'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const Table = Loadable({
  loader: () => import('_tables/Table'),
  loading: () => <div></div>,
})

const getPostsQuery = gql`
  query getPosts {
    allPosts(count: 100) {
      id
      title
    }
  }
`

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h1>GRAPHQL Posts</h1>
        {this.renderPosts()}
      </div>
    )
  }

  renderPosts() {
    if (_.isNil(this.props.data.allPosts)) {
      return null
    }
    return this.props.data.allPosts.map((post, index) => {
      return (
        <p key={`post-${index}`}>{post.title}</p>
      )
    })
  }
}

export default graphql(getPostsQuery)(Dashboard)