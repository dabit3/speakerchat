import React, { useState } from 'react'
import { Router, Link } from "@reach/router"

import Header from './Header'
import Talks from './Talks'
import TalkComments from './TalkComments'

import { TalkModalContext } from './contexts'

function App() {
  const [modalVisible, toggleModal] = useState(false)

  function toggle() {
    toggleModal(!modalVisible)
  }

  return (
    <TalkModalContext.Provider value={{
      modalVisible,
      toggle
    }}>
      <div>
        <Header />
        <Router>
          <Talks path="/" />
          <TalkComments path="/talk/:talkId/:talkName" />
        </Router>
      </div>
    </TalkModalContext.Provider>
  )
}

export default App