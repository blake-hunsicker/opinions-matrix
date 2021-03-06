import React from 'react'
import Firebase from 'gatsby-plugin-firebase'
// import ScatterPlot from '../components/scatterplot-with-trendline'
import ScatterPlot from '../components/scatterplot_middleaxes'

const Sliders = ({quizName, xQuestion, xRangeLowTickLabel, xRangeMidTickLabel, xRangeHighTickLabel, yQuestion, yRangeLowTickLabel, yRangeMidTickLabel, yRangeHighTickLabel, UI}) => {

  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    const quiz = Firebase.firestore().collection('quizzes').doc(`${quizName}`).collection('clicks')

    function enableNextQuestion(e) {
      e.preventDefault()
      const disabledSlider = document.querySelector('.question.disabled')

      if (!disabledSlider) {} else {
        disabledSlider.classList.remove('disabled')
      }

      const hiddenSlider = document.querySelector('.question.hidden')

      if (!hiddenSlider) {} else {
        hiddenSlider.classList.remove('hidden')
      }
      
      const rangeSlider = document.querySelector('.questionTwo')
      rangeSlider.disabled = false
      
    }

    function enableSubmit(e) {
      const button = document.querySelector('.submit-button')
      button.classList.remove('disabled')
      button.addEventListener('click',answerQuiz)

    }

    function skipToAnswers(e) {
      const scatterPlot = document.querySelector('.scatter-plot')
      scatterPlot.classList.toggle('hidden')
      const rangeContainer = document.querySelector('.range-container')
      rangeContainer.classList.toggle('hidden')
      const pastClicks = document.querySelector('.past-clicks')
      pastClicks.classList.toggle('hidden')
      // AJB / added this lastCircle toggle to turn off most recent circle if user 'skips'
      const lastCircle = document.querySelector('.last_circle')
      lastCircle.classList.toggle('hidden')
      const circleLabel = document.querySelector('.circleLabel')
      circleLabel.classList.toggle('hidden')
      
    }

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

    quiz.orderBy('clickTime', 'desc').onSnapshot((querySnapshot) => {
      const graphData = []
      const clicks = []
      const allClicks = querySnapshot.size
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
            <ScatterPlot label={[xQuestion, yQuestion]}  data={graphData} xTicks={[xRangeLowTickLabel,xRangeMidTickLabel,xRangeHighTickLabel]} yTicks={[yRangeLowTickLabel,yRangeMidTickLabel,yRangeHighTickLabel]} />
          </div>
          <div className='range-container'>
            {/* <h3 className='range-title'>Share Your Opinion</h3> */}
            {
              UI === 'secondQuestionGray' ?
                <>
                  <div className='question'>
                    <label>{xQuestion}</label>
                    <input type='range' list='tickmarks' min='1' max='100' defaultValue='50' className='questionOne' id='questionOne' onClick={enableNextQuestion} />
                    <datalist id='tickmarks'>
                      <option value='1' className='prominent-tick'></option>
                      <option value='10'></option>
                      <option value='20'></option>
                      <option value='30'></option>
                      <option value='40'></option>
                      <option value='50' className='prominent-tick'></option>
                      <option value='60'></option>
                      <option value='70'></option>
                      <option value='80'></option>
                      <option value='90'></option>
                      <option value='100' className='prominent-tick'></option>
                    </datalist>
                    <div className='ticks'>
                      <span className='tick'>{xRangeLowTickLabel}</span>
                      <span className='tick'>{xRangeMidTickLabel}</span>
                      <span className='tick'>{xRangeHighTickLabel}</span>
                    </div>
                  </div>
                  <div className='question disabled'>
                    <label>{yQuestion}</label>
                    <input disabled type='range' list='tickmarks' min='1' max='100' defaultValue='50' className='questionTwo' id='questionTwo' onChange={enableSubmit} />
                    <datalist id='tickmarks'>
                      <option value='1' className='prominent-tick'></option>
                      <option value='10'></option>
                      <option value='20'></option>
                      <option value='30'></option>
                      <option value='40'></option>
                      <option value='50' className='prominent-tick'></option>
                      <option value='60'></option>
                      <option value='70'></option>
                      <option value='80'></option>
                      <option value='90'></option>
                      <option value='100' className='prominent-tick'></option>
                    </datalist>
                    <div className="ticks">
                      <span className="tick">{yRangeLowTickLabel}</span>
                      <span className="tick">{yRangeMidTickLabel}</span>
                      <span className="tick">{yRangeHighTickLabel}</span>
                    </div>
                  </div>
                </>
              // : UI === 'secondQuestionHidden' ?
              //   <>
              //     <div className='question'>
              //       {/* <h1>SecondQuestionHidden</h1> */}
              //       <label>{xQuestion}</label>
              //       <input type='range' min='1' max='100' defaultValue='50' className='questionOne' id='questionOne' onClick={enableNextQuestion} />
              //       <div className="ticks">
              //         <span className="tick">{xRangeLowTickLabel}</span>
              //         <span className="tick">{xRangeMidTickLabel}</span>
              //         <span className="tick">{xRangeHighTickLabel}</span>
              //       </div>
              //     </div>
              //     <div className='question hidden'>
              //       <label>{yQuestion}</label>
              //       <input disabled type='range' min='1' max='100' defaultValue='50' className='questionTwo' id='questionTwo' onChange={enableSubmit} />
              //       <div className="ticks">
              //         <span className="tick">{yRangeLowTickLabel}</span>
              //         <span className="tick">{yRangeMidTickLabel}</span>
              //         <span className="tick">{yRangeHighTickLabel}</span>
              //       </div>
              //     </div>
              //   </>
              :
                <>
                  <div className='question'>
                    <label>{xQuestion}</label>
                    <input type='range' list='tickmarks' min='1' max='100' defaultValue='50' className='questionOne' id='questionOne' />
                    <datalist id='tickmarks'>
                      <option value='1' className='prominent-tick'></option>
                      <option value='10'></option>
                      <option value='20'></option>
                      <option value='30'></option>
                      <option value='40'></option>
                      <option value='50' className='prominent-tick'></option>
                      <option value='60'></option>
                      <option value='70'></option>
                      <option value='80'></option>
                      <option value='90'></option>
                      <option value='100' className='prominent-tick'></option>
                    </datalist>
                    <div className="ticks">
                      <span className="tick">{xRangeLowTickLabel}</span>
                      <span className="tick">{xRangeMidTickLabel}</span>
                      <span className="tick">{xRangeHighTickLabel}</span>
                    </div>
                  </div>
                  <div className='question'>
                    <label>{yQuestion}</label>
                    <input type='range' list='tickmarks' min='1' max='100' defaultValue='50' className='questionTwo' id='questionTwo' onChange={enableSubmit} />
                    <datalist id='tickmarks'>
                      <option value='1' className='prominent-tick'></option>
                      <option value='10'></option>
                      <option value='20'></option>
                      <option value='30'></option>
                      <option value='40'></option>
                      <option value='50' className='prominent-tick'></option>
                      <option value='60'></option>
                      <option value='70'></option>
                      <option value='80'></option>
                      <option value='90'></option>
                      <option value='100' className='prominent-tick'></option>
                    </datalist>
                    <div className="ticks">
                      <span className="tick">{yRangeLowTickLabel}</span>
                      <span className="tick">{yRangeMidTickLabel}</span>
                      <span className="tick">{yRangeHighTickLabel}</span>
                    </div>
                  </div>
                </>
            }
            <h5 className='respondent-count'>{allClicks} people have responded</h5>
            <div className='buttons'>
              <button className='submit-button disabled'>
                See How You Compare To Others...
              </button>
              <button className='skip-button' onClick={skipToAnswers}>
                Skip to Responses
              </button>
            </div>
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