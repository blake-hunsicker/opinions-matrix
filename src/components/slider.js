import React from 'react'
import Firebase from 'gatsby-plugin-firebase'
import ScatterPlot from '../components/scatterplot-with-trendline'

const Sliders = ({quizName, xQuestion, xRangeLowTickLabel, xRangeMidTickLabel, xRangeHighTickLabel, yQuestion, yRangeLowTickLabel, yRangeMidTickLabel, yRangeHighTickLabel}) => {

  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    const quiz = Firebase.firestore().collection('quizzes').doc(`${quizName}`).collection('clicks')

    function answerQuiz(e) {
      const scatterPlot = document.querySelector('.scatter-plot')
      scatterPlot.classList.toggle('hidden')
      const rangeContainer = document.querySelector('.range-container')
      rangeContainer.classList.toggle('hidden')
      const pastClicks = document.querySelector('.past-clicks')
      pastClicks.classList.toggle('hidden')
      const xRangeValue = document.querySelector('.questionOne').value
      const yRangeValue = document.querySelector('.questionTwo').value
      quiz.add({
        x: xRangeValue,
        y: yRangeValue,
        clickTime: Firebase.firestore.Timestamp.fromDate(new Date())
      })
    }

    quiz.onSnapshot((querySnapshot) => {
      const graphData = []
      const clicks = []
      querySnapshot.forEach((doc) => {
        const clickId = doc.id
        const xAnswer = doc.data().x
        const yAnswer = doc.data().y
        const clickTime = doc.data().clickTime

        graphData.push([xAnswer, yAnswer])
        clicks.push(
          <div className='past-click' data-timestamp={clickTime} key={clickId}>
            <p>{xQuestion} <strong>{xAnswer}</strong></p>
            <p>{yQuestion} <strong>{yAnswer}</strong></p>
          </div>
        )
      })
      clicks.sort(function(a, b) {
        return b.props['data-timestamp'] - a.props['data-timestamp']
      })
      setData(
        <>
          <div className='scatter-plot hidden'>
            <ScatterPlot data={graphData} xTicks={[xRangeLowTickLabel,xRangeMidTickLabel,xRangeHighTickLabel]} yTicks={[yRangeLowTickLabel,yRangeMidTickLabel,yRangeHighTickLabel]} />
          </div>
          <div className='range-container'>
            <div className='question'>
              <label>{xQuestion}</label>
              <input type='range' min='1' max='100' defaultValue='50' className='questionOne' id='questionOne' onChange={(event) => console.log(`${event.target.className}: ${event.target.value}`)} />
              <div className="ticks">
                <span className="tick">{xRangeLowTickLabel}</span>
                <span className="tick">{xRangeMidTickLabel}</span>
                <span className="tick">{xRangeHighTickLabel}</span>
              </div>
            </div>
            <div className='question'>
              <label>{yQuestion}</label>
              <input type='range' min='1' max='100' defaultValue='50' className='questionTwo' id='questionTwo' onChange={(event) => console.log(`${event.target.className}: ${event.target.value}`)} />
              <div className="ticks">
                <span className="tick">{yRangeLowTickLabel}</span>
                <span className="tick">{yRangeMidTickLabel}</span>
                <span className="tick">{yRangeHighTickLabel}</span>
              </div>
            </div>
            <button onClick={answerQuiz}>
              Submit
            </button>
          </div>
          <div className='past-clicks'>
            {clicks}
          </div>
        </>
      )
    });
    
  }, [])

  return (
    <>
      {data}
    </>
  )
}

export default Sliders