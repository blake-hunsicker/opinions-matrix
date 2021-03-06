import * as React from 'react'
import { useStaticQuery } from 'gatsby'
import '../components/styles/styles.css'

const Dummy = ({children}) => {

  return (
    <>
    <div className='hero'>
        <h1>A student debt bailout would be unjust</h1>
        <h4>Wiping out college loans would disproportionately enrich the well-to-do at the expense of those less fortunate.</h4>
        <h3>By Jeff Jacoby Globe Columnist, Updated November 22, 2020, 4:00 a.m.</h3>
        <img src="https://bostonglobe-prod.cdn.arcpublishing.com/resizer/a7uTLlSex-CeSHEmlKD7zemNVpI=/1024x0/cloudfront-us-east-1.images.arcpublishing.com/bostonglobe/NPKIHTV7NSIW6JMRTQMRWUN3MY.jpg" style={{width: 400}}></img>
      </div>
      <div className='article-body'>
        <p>During the presidential primary campaign last winter, as Democratic candidates were promoting various plans to cancel federal student loan debt, one Iowa father’s encounter with Elizabeth Warren captured the raw unfairness of the idea.</p>
        <p>That exchange vividly illustrates the injustice of student-debt proposals that would, in effect, punish those who saved and worked more to pay for college, those who deferred higher education until they could afford it, and those who responsibly repaid their loans — by forcing them to pay for those who didn’t. Even more outrageous, it would compel the two-thirds of Americans who didn’t earn a college degree to help pick up the tab for many of those who did.</p>
        <p>Of the nearly $1.7 trillion in student loan debt, according to the Federal Reserve, the vast majority, more than $1.5 trillion, is held by the US government. Since higher education correlates strongly with higher earnings, these college loans are concentrated among the relatively well-to-do. So an immense government program to forgive outstanding student debt would disproportionately benefit high-income people at the expense of those less fortunate. Democrats a year ago may have thought that offering a bailout to college-educated, upper-middle-class voters made political sense. But how can they still think so after an election in which the “blue wave” they expected never materialized, in part because of Republican gains among working-class Americans without college degrees?</p>
        <p>et leading Democrats and progressives are doubling down. “Biden-Harris can cancel billions of dollars in student loan debt,” Warren tweeted recently. Chuck Schumer, the Senate minority leader, claims that any college graduate’s “first $50,000 of debt [can] be vanquished” through an executive order by the next president. On Wednesday, a coalition of 236 liberal organizations called upon Biden to issue that order upon taking office.
        It is far from clear that billions of dollars of debt can be simply written off via presidential decree. But set aside the procedural question. A huge new student loan forgiveness scheme is indefensible as a matter of policy.</p>
        <p>As noted, it would amount to a boon for the relatively well-off. But it would also treat similarly situated people dissimilarly. Imagine three 30-year-old neighbors, each of whom earns $50,000 — a construction worker who never went to college, a legal secretary with a two-year associate’s degree and $2,000 in remaining student debt, and a software engineer who attended a four-year college and graduate school and still has $50,000 in unpaid loans. A bailout that erased $50,000 of student debt would give nothing to one of the neighbors, a modest $2,000 to the second, and a $50,000 bonanza to the third.</p>
        <p>College loan forgiveness isn’t just unfair. It is unnecessary. Some borrowers have a hard time managing their student debt, but the data make clear that this is not a national crisis. According to the Consumer Financial Protection Bureau, 70 percent of college loans are fully paid off within 10 years. Among borrowers with loan amounts between $5,000 and $10,000, fully 80 percent clear the debt within a decade.</p>
      </div>
    </>

  )
}

export default Dummy