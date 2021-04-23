import React from 'react'
import { graphql } from 'gatsby'
import Slider from '../components/slider'
import Layout from '../components/layout'
import Dummy from '../components/dummy'
import unified from 'unified'
import markdown from 'remark-parse'
import html from 'remark-html'

const Quiz = ({ data }) => {
  const quiz = data.quiz.data

  return(
    <Layout>
      <div
        className='article'
        dangerouslySetInnerHTML={{
          __html: unified()
            .use(markdown)
            .use(html)
            .processSync(quiz.articleText)
        }}
      />
      <Slider
        quizName={quiz.quizName}
        xQuestion={quiz.xQuestion}
        xRangeLowTickLabel={quiz.xRangeLowTickLabel}
        xRangeMidTickLabel={quiz.xRangeMidTickLabel}
        xRangeHighTickLabel={quiz.xRangeHighTickLabel}
        yQuestion={quiz.yQuestion}
        yRangeLowTickLabel={quiz.yRangeLowTickLabel}
        yRangeMidTickLabel={quiz.yRangeMidTickLabel}
        yRangeHighTickLabel={quiz.yRangeHighTickLabel}
      />
    </Layout>
  )
}
export const query = graphql`
  query ($quizName: String!) {
    quiz: airtable(
      data: {
        quizName: {
          eq: $quizName
        }
      }
    ) {
      data {
        quizName
        xQuestion
        xRangeLowTickLabel
        xRangeMidTickLabel
        xRangeHighTickLabel
        yQuestion
        yRangeLowTickLabel
        yRangeMidTickLabel
        yRangeHighTickLabel
        dummyText
        articleText
      }
    }
  }
`

export default Quiz