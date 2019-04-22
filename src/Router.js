import React from 'react'
import { Router, Link } from "@reach/router"

import Header from './Header'
import Talks from './Talks'
import TalkComments from './TalkComments'

function App() {
  return (
    <div>
      <Header />
      <Router>
        <Talks path="/" />
        <TalkComments path="/talk/:talkId/:talkName" />
      </Router>
    </div>
  )
}

export default App