import React, { useState } from 'react'
import { Router } from "@reach/router"

import Header from './Header'
import Talks from './Talks'
import TalkComments from './TalkComments'

import { TalkModalContext, ClientIDContext } from './contexts'
import uuid from 'uuid/v4'

const CLIENT_ID = uuid()

// const TalkModalContext = React.createContext()
// const ClientIDContext = React.createContext()

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
      <ClientIDContext.Provider value={{ CLIENT_ID }}>
        <div>
          <Header />
          <Router>
            <Talks path="/" />
            <TalkComments path="/talk/:talkId/:talkName" />
          </Router>
        </div>
      </ClientIDContext.Provider>
    </TalkModalContext.Provider>
  )
}

export default App