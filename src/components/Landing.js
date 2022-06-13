import React from "react"

export default function Landing(props) {
  return(
    <div className="landing">
      <h1 className="landing--title">Trivia</h1>
      <button className="landing--btn btn" onClick={props.startHandle}>Start Trivia</button>
    </div>
  )
}