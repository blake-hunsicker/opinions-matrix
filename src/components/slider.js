import React from 'react'
import Firebase from 'gatsby-plugin-firebase'

const Sliders = () => {

  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    const quiz = Firebase.firestore().collection('quizzes').doc('student-debt').collection('clicks')

    function answerQuiz(e) {
      const qOne = document.querySelector('.questionOne').value
      const qTwo = document.querySelector('.questionTwo').value
      console.log(qOne)
      quiz.add({
        questionOne: qOne,
        questionTwo: qTwo,
        clickTime: Firebase.firestore.Timestamp.fromDate(new Date())
      })
    }

    quiz.onSnapshot((querySnapshot) => {
      const clicks = []
      querySnapshot.forEach((doc) => {
        const clickId = doc.id
        const answerOne = doc.data().questionOne
        const answerTwo = doc.data().questionTwo
        const clickTime = doc.data().clickTime

        clicks.push(
          <div className='past-click' data-timestamp={clickTime} key={clickId}>
            <h4>Past click:</h4>
            <p>How much student debt should be cancelled? <strong>{answerOne}</strong></p>
            <p>What's your education level? <strong>{answerTwo}</strong></p>
          </div>
        )
      })
      clicks.sort(function(a, b) {
        return b.props['data-timestamp'] - a.props['data-timestamp']
      })
      setData(
        <>
          <div className='range-container'>
            <div className='question'>
              <label>How much student debt should be cancelled?</label>
              <input type='range' min='1' max='100' defaultValue='50' className='questionOne' id='questionOne' onChange={(event) => console.log(`${event.target.className}: ${event.target.value}`)} />
              <div className="ticks">
                <span className="tick">None</span>
                <span className="tick">Some</span>
                <span className="tick">All</span>
              </div>
            </div>
            <div className='question'>
              <label>What's your education level?</label>
              <input type='range' min='1' max='100' defaultValue='50' className='questionTwo' id='questionTwo' onChange={(event) => console.log(`${event.target.className}: ${event.target.value}`)} />
              <div className="ticks">
                <span className="tick">None</span>
                <span className="tick">Some</span>
                <span className="tick">PhD</span>
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