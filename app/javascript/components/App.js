import React from "react"
import Header from "./components/Header"

const App = (props) => {
  return (
    <>
      <h1>Devise a Different View Point</h1>
      <Header {...props} />
    </>
  )
}

export default App