import React from "react"
import Header from "./components/Header"
import TalkIndex from "./pages/TalkIndex"

const App = (props) => {
  return (
    <>
      <Header {...props} />
      {props.logged_in && <TalkIndex />}
    </>
  )
}

export default App