import React from "react"
import Header from "./components/Header"
import TalkIndex from "./pages/TalkIndex"

const App = (props) => {
  return (
    <>
      <h1>Devise a Different View Point</h1>
      <Header {...props} />
      {props.logged_in && <TalkIndex />}
      
    </>
  )
}

export default App