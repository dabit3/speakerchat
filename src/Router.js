import React, { useState } from 'react'
import {
  Router,
  createHistory,
  LocationProvider
} from "@reach/router"
import uuid from 'uuid/v4'
import createHashSource from 'hash-source'

import Header from './Header'
import Talks from './Talks'
import TalkComments from './TalkComments'
import { TalkModalContext, ClientIDContext } from './contexts'

const source = createHashSource()
const history = createHistory(source)
const CLIENT_ID = uuid()

const AppRouter = ({ children }) => (
  <div>
    {children}
  </div>
)

function App() {
  const [modalVisible, toggleModal] = useState(false)

  function toggle() {
    toggleModal(!modalVisible)
  }

  return (
    <LocationProvider history={history}>
      <TalkModalContext.Provider value={{
        modalVisible,
        toggle
      }}>
        <ClientIDContext.Provider value={{ CLIENT_ID }}>
          <div>
            <Header />
            <Router>
              <AppRouter path="/">
                <Talks path="/" />
                <TalkComments path="/talk/:talkId/:talkName" />
              </AppRouter>
            </Router>
          </div>
        </ClientIDContext.Provider>
      </TalkModalContext.Provider>
    </LocationProvider>
  )
}

export default App