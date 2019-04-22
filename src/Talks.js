import React, { useReducer, useEffect, useState } from 'react'

import { css } from 'glamor'
import { API, graphqlOperation } from 'aws-amplify'
import { Link, navigate } from "@reach/router"
import { listTalks } from './graphql/queries'
import { createTalk as CreateTalk } from './graphql/mutations'
import TalkModal from './TalkModal'
import { TalkModalContext } from './contexts'
import uuid from 'uuid/v4'

const KEY = 'SPEAKERCHAT_TALKS'

const initialState = {
  talks: [],
  error: false,
  loading: false
}

function reducer(state, action) {
  switch(action.type) {
    case 'set':
      return {
        ...state, talks: action.talks, loading: false
      }
    case 'setLoading':
      return { ...state, loading: true }
    case 'error':
      return { ...state, error: action.error }
    default:
      throw Error()
  }
}

function setToStorage(talks) {
  window.localStorage.setItem(KEY, JSON.stringify(talks))
}

function getFromStorage(dispatch) {
  const talks = window.localStorage.getItem(KEY)
  if (talks) {
    dispatch({ type: 'set', talks: JSON.parse(talks) })
  } else {
    dispatch({ type: 'setLoading' })
  }
}

async function fetchTalks(dispatch) {
  try {
    getFromStorage(dispatch)
    const talkData = await API.graphql(graphqlOperation(listTalks))
    const talks = talkData.data.listTalks.items
    setToStorage(talks)
    dispatch({ type: 'set', talks })
  } catch (error) {
    console.log('error:', error)
    dispatch({ type: 'error', error })
  }
}

async function createTalk(talk, props, context) {
  const ID = uuid()
  context.toggle()
  let talkWithId = {
    ...talk,
    id: ID
  }
  navigate(`/talk/${ID}/${talk.title}`)
  
  try {
    await API.graphql(graphqlOperation(CreateTalk, { input: talkWithId }))
    console.log('talk successfully created!')
    let talks = window.localStorage.getItem(KEY)
    talks = [...JSON.parse(talks), talkWithId]
    setToStorage(talks)
  } catch (err) {
    console.log('error creating talk...', err)
  }
}

function Talks(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    fetchTalks(dispatch)
  }, [])

  console.log('state:', state)
  return (
    <TalkModalContext>
    {
      context => (
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
          {
            context.modalVisible && (
              <TalkModal
                createTalk={(talk) => createTalk(talk, props, context)}
                toggleModal={context.toggle}
              />
            )
          }
        </div>
      )
    }
    </TalkModalContext>
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