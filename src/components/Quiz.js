import React from "react"

import Question from "./Question"
import {nanoid} from 'nanoid'



export default function Quiz() {

  const [quizes, setQuizes] = React.useState([])
  const [answer, setAnswer] = React.useState({
    submited: false,
    correct:0,
    total: 0
  })

  const [totalScore, setTotalScore] = React.useState({
    correct: 0,
    total: 0
  })

  const [gameCount, setGameCount] = React.useState(0)

  function createMarkup() {
    return {__html: 'First &middot; Second'};
  }

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=18")
    .then(res => res.json())
    .then(result => createQuizes(result))
  }, [gameCount])

  function chooseAnswer(event, id) {
    setQuizes(prevQuizes => prevQuizes.map(quiz => {
      if (quiz.id === id) {
        return ({...quiz, chosen_answer: event.target.value})
      } else return quiz
    }))

  }

  function createQuizes(quizApi) {
    setQuizes(quizApi.results.map(quiz => {
      const answers = quiz.incorrect_answers
      const randomIndex = Math.floor(Math.random() * answers.length)
      answers.splice(randomIndex, 0, quiz.correct_answer)

      return ({
        question:String(quiz.question),
        answers: answers,
        correct_answer: quiz.correct_answer,
        chosen_answer: answers[0],
        id: nanoid(),
        clickHandle: chooseAnswer
      })
    })
    )
  }

  function checkAnswers() {
    let correct = 0;
    quizes.forEach(quiz => {
      if (quiz.chosen_answer === quiz.correct_answer) correct++;
    })
    setAnswer({
      submited: true,
      correct: correct,
      total: quizes.length
    })
    setTotalScore(prevTotalScore => ({
      correct: prevTotalScore.correct + correct,
      total: prevTotalScore.total + quizes.length
    }))
  }

  function playAgain() {
    setGameCount(prevGameCount => prevGameCount + 1)
    setAnswer({
      submited: false,
      correct: 0,
      total: 0
    })
  }

  const quizElements = quizes.map((quiz, index) => (
    <Question data={quiz} key={index} reveal={answer.submited}/>
  ))

  return (
    <div className="quiz" >
        {quizElements}
      <div className="quiz--btns">
        {!answer.submited ? 
        <button className="quiz--submit btn" onClick={checkAnswers}>Check Answers</button> :
        <div className="quiz--replay">
          <strong className="currentScore">{`You scored ${answer.correct}/${answer.total} correct Answers this round`}</strong>
          <button className="quiz--playAgain btn" onClick={playAgain}>Play Again</button>
        </div>}
      </div>
      {gameCount > 0 && <h4 className="totalScore">{`Total score ${totalScore.correct}/${totalScore.total}`}</h4>}

        
    </div>
  )
}