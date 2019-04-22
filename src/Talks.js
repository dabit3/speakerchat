import React, { useReducer, useEffect } from 'react'

import { css } from 'glamor'
import { API, graphqlOperation } from 'aws-amplify'
import { Link } from "@reach/router"
import { listTalks } from './graphql/queries'

const KEY = 'TALKS'

const initialState = {
  talks: [],
  error: false
}

function reducer(state, action) {
  switch(action.type) {
    case 'set':
      return {
        ...state, talks: action.talks
      }
    case 'error':
      return { ...state, error: action.error }
    default:
      throw Error()
  }
}

function setFromStorage(talks) {
  window.localStorage.setItem(KEY, JSON.stringify(talks))
}

function getFromStorage(dispatch) {
  const talks = window.localStorage.getItem(KEY)
  console.log('talks from storage: ', JSON.parse(talks))
  if (talks) {
    dispatch({ type: 'set', talks: JSON.parse(talks) })
  }
}

async function fetchTalks(dispatch) {
  try {
    getFromStorage(dispatch)
    const talkData = await API.graphql(graphqlOperation(listTalks))
    const talks = talkData.data.listTalks.items
    setFromStorage(talks)
    dispatch({ type: 'set', talks })
  } catch (error) {
    console.log('error:', error)
    dispatch({ type: 'error', error })
  }
}

function Talks(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    fetchTalks(dispatch)
  }, [])
  console.log('state:', state)
  return (
    <div {...styles.container}>
      {
        state.talks.map((t, i) => (
          <Link to={`/talk/${t.id}/${t.title.replace(/\//g, '%2F')}`} {...styles.link} key={i}>
            <div {...styles.talk}>
              <p className='hoverable' {...styles.title}>{t.title}</p>
              <p {...styles.subtitle}>{t.speakerName}</p>
            </div>
          </Link>
        ))
      }
    </div>
  )
}

const styles = {
  link: css({
    textDecoration: 'none'
  }),
  talk: css({
    borderTop: '1px solid rgba(0, 0, 0, .12)',
    padding: '15px 40px 15px',
    ':hover': {
      backgroundColor: 'rgb(3, 177, 245)',
      cursor: 'pointer'
    },
    ':hover .hoverable': {
      color:'white'
    }
  }),
  title: css({
    fontSize: 38,
    margin: 0,
    color: 'black'
  }),
  subtitle: css({
    fontSize: 22,
    margin: 0,
    color: 'rgba(0, 0, 0, .5)'
  }),
  container: css({
  })
}

export default Talks