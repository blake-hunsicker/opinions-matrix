import React from 'react'
import { graphql } from 'gatsby'
import Slider from '../components/slider'
import Layout from '../components/layout'

const Quiz = ({ data }) => {
  const quiz = data.quiz.data

  return(
    <Layout>
      <div className='hero'>
        <h1>Article text</h1>
        <h4>By FirstName LastName</h4>
      </div>
      <div className='article-body'>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet mauris quis dui viverra aliquet. Nunc maximus euismod turpis et hendrerit. Proin sit amet tempor magna. Phasellus volutpat fringilla lacus non ultrices. Vestibulum vitae mi porta, laoreet massa a, malesuada dui. Integer sit amet lorem lacinia, pharetra arcu ut, consectetur lectus. In hac habitasse platea dictumst. Curabitur non lorem molestie, pellentesque neque eu, convallis dolor. Mauris neque neque, consequat nec semper id, venenatis tempor lectus. Nunc ac lacus sed magna rutrum aliquet. Pellentesque vitae urna molestie, hendrerit enim id, blandit magna. Nullam aliquet a ipsum non luctus.</p>
        <p>Vestibulum et quam lorem. Pellentesque efficitur ligula magna, sit amet viverra mauris lacinia a. Vestibulum erat elit, finibus non ultricies ac, placerat sed felis. Ut varius erat non justo fringilla condimentum. Integer eget libero ante. Morbi erat ante, porta id interdum et, pulvinar in nibh. Cras non neque enim. Mauris a ipsum nunc. Pellentesque non odio elit. Praesent nisl quam, elementum a dictum a, eleifend in ante.</p>
        <p>Morbi id feugiat enim, suscipit efficitur eros. Sed mattis lectus lacus, ac tincidunt mi convallis sit amet. Cras posuere, lorem at interdum posuere, enim diam accumsan quam, sed commodo arcu turpis dapibus mi. Morbi nec sem tempor leo tempor ultrices. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id felis neque. Maecenas eleifend quam nec ante placerat ornare. Fusce pulvinar mi vel est auctor consequat. Pellentesque nulla turpis, ultricies vel elit sed, laoreet blandit urna. Aliquam erat volutpat. Praesent vel neque ornare velit convallis viverra ac eget turpis. Nunc aliquam tortor lacus, sed efficitur ante tristique eu. Proin at fringilla erat. Fusce molestie dolor mollis dignissim consequat. Suspendisse convallis tellus quam, non pulvinar justo blandit sit amet. Ut congue augue tincidunt fermentum ultricies.</p>
        <p>Aliquam semper, urna non congue venenatis, lorem elit ultrices odio, ut finibus dui ante non est. Nam rutrum accumsan velit sit amet pulvinar. Nam lobortis arcu sed libero posuere, nec posuere risus blandit. Donec facilisis felis neque, sit amet dictum dui malesuada sed. Praesent finibus lacus quis egestas posuere. Morbi tincidunt, erat ut porttitor suscipit, enim tortor bibendum eros, quis tincidunt nibh quam nec arcu. In ornare magna eu ipsum vestibulum, eget ullamcorper justo aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat. Cras leo orci, interdum vitae congue sit amet, pretium at nisl. Nam a lobortis purus.</p>
        <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed maximus risus eget suscipit aliquam. Aenean a eros ut erat tincidunt fermentum nec in lacus. Nunc dictum condimentum semper. Cras ac purus eu dui eleifend rutrum in imperdiet quam. Nulla suscipit, velit consectetur dictum rutrum, eros lectus laoreet turpis, eget placerat dolor odio eu ex. Proin vel erat ac elit tristique posuere eget eget dolor. Aenean laoreet eu dui vel molestie. Ut luctus sagittis tortor, vitae consequat mauris ultricies eget. Integer vehicula gravida congue.</p>
      </div>
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
      }
    }
  }
`

export default Quiz