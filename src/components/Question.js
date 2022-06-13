import React from "react"

export default function Question(props) {

  const stylesCorrect = {
    backgroundColor: "#94D7A2"
  }  
  const stylesWrong = {
    backgroundColor: "#F8BCBC",
    opacity: 0.5
  }  

  function revealAns(ans) {
    if (ans === props.data.correct_answer) {
      return stylesCorrect
    } else if (ans === props.data.chosen_answer){
      return stylesWrong
    } else {
      return {opacity: 0.5}
    }
  }

  function createMarkup(data) {
    return {__html: data};
  }
  const answerElements = props.data.answers.map((answer, index) => {
    return (
      <div key={index} className="question--container">
        <input type="radio" 
          id={`${props.data.id}${index}`}
          name="answer" value={answer} 
          checked={answer === props.data.chosen_answer}
          onChange={(event) => props.data.clickHandle(event, props.data.id)}
          className="question--radio"
          />
        <label dangerouslySetInnerHTML={createMarkup(answer)}
          for={`${props.data.id}${index}`}
          style={props.reveal ? revealAns(answer) : null}
          >
        </label>
        
      </div>
    
  )}
  )


  return (
    <form className="question">
      <p className="question-desc" dangerouslySetInnerHTML={createMarkup(props.data.question)}></p>
      <div className="question--answers" >
        {answerElements}
      </div>
    </form>
  )
}