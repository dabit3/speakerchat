import React, { useReducer, useEffect } from 'react'
import { css } from 'glamor'
import { API, graphqlOperation } from 'aws-amplify'

import { listCommentsForTalk } from './graphql/queries'

const initialState = {
  loading: true,
  comments: []
}

function reducer(state, action) {
  switch(action.type) {

  }
}

async function fetchComments(talkId, dispatch) {
  try {
    const commentData = await API.graphql(graphqlOperation(listCommentsForTalk, { talkId }))
    const comments = commentData.data.listCommentsForTalk.items
    console.log('comments: ', comments)
    // dispatch({ type: 'set', talks })
  } catch (error) {
    // console.log('error:', error)
    // dispatch({ type: 'error', error })
  }
}

function TalkComments(props) {
  console.log('props: ', props)
  console.log('talkId: ', props.talkId)
  useEffect(() => {
    fetchComments(props.talkId)
  })
  return (
    <div>
      <div {...styles.header}>
        <h1 {...styles.heading}>{props.talkName}</h1>
      </div>
    </div>
  )
}

const styles = {
  header: css({
    borderBottom: '1px solid rgba(0, 0, 0, .15)'
  }),
  heading: css({
    padding: '10px 30px',
  })
}

export default TalkComments