import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

const IndexPage = ({data}) => {

  const quizzes = data.quizzes

  return (
    <Layout>
      <div className='quiz-list'>
        {quizzes.edges.map(({node}, index) => (
          <Link to={node.data.quizName}>
            <p>{node.data.quizName}</p>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    quizzes: allAirtable {
      edges {
        node {
          data {
            quizName
          }
        }
      }
    }
  }
`

export default IndexPage
