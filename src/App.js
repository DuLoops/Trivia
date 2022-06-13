import React from "react"

import backgroundRight from "./images/background-yellow.png"
import backgroundLeft from "./images/background-blue.png"
import Landing from "./components/Landing"
import Quiz from "./components/Quiz"

export default function App() {
  const [start, setStart] = React.useState(false)
  

  function startTrivia() {setStart(true)}

  return(
    <main >
      <img className="background--right" src={backgroundRight} alt="rightImg" />
      <img className="background--left" src={backgroundLeft} alt="leftImg" />
      {!start && <Landing startHandle={startTrivia}/>}
      {start && <Quiz />}
    </main>
  )
}