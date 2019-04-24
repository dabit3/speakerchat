import React, { useReducer, useEffect } from 'react'

import { css } from 'glamor'
import { API, graphqlOperation } from 'aws-amplify'
import { Link } from "@reach/router"
import { listTalks } from './graphql/queries'
import { createTalk as CreateTalk } from './graphql/mutations'
import { onCreateTalk } from './graphql/subscriptions'
import TalkModal from './TalkModal'
import { TalkModalContext, ClientIDContext } from './contexts'
import uuid from 'uuid/v4'

const KEY = 'SPEAKERCHAT_TALKS'

const initialState = {
  talks: [],
  error: false,
  loading: false,
  loaded: false
}

function reducer(state, action) {
  switch(action.type) {
    case 'set':
      return {
        ...state, talks: action.talks, loading: false, loaded: true
      }
    case 'add':
      return {
        ...state, talks: [action.talk, ...state.talks]
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
    console.log('talkData: ', talkData)
    const talks = talkData.data.listTalks.items
    setToStorage(talks)
    dispatch({ type: 'set', talks })
  } catch (error) {
    console.log('error:', error)
    dispatch({ type: 'error', error })
  }
}

async function createTalk(talk, toggle, CLIENT_ID, navigate) {
  if (talk.title === '' || talk.speakerName === '') {
    return
  }
  const ID = uuid()
  toggle()
  let talkWithId = {
    ...talk,
    id: ID,
    clientId: CLIENT_ID
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

  useEffect(() => {
    const subscriber = API.graphql(
      graphqlOperation(onCreateTalk)
    ).subscribe({
      next: eventData => {
        const talk = eventData.value.data.onCreateTalk
        if(props.CLIENT_ID === talk.clientId) return
        let talks = window.localStorage.getItem(KEY)
        talks = [...JSON.parse(talks), talk]
        setToStorage(talks)
        dispatch({
          type: 'add', talk
        })
      }
    })
    return () => subscriber.unsubscribe()
  }, [])

  const { CLIENT_ID, modalVisible, toggle } = props
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
      {
        state.loaded && (state.talks.length < 1) && <p {...styles.noTalks}>No Talks.</p>
      }
      {
        modalVisible && (
          <TalkModal
            createTalk={(talk) => createTalk(talk, toggle, CLIENT_ID, props.navigate)}
            toggleModal={toggle}
          />
        )
      }
       <div
        {...styles.footer}
       >
        Built with <a
        target="_blank"
        {...styles.footerHighlight}
        href="https://aws-amplify.github.io/">AWS Amplify</a> & <a
        {...styles.footerHighlight}
        target="_blank"
        href="https://aws.amazon.com/appsync/"
        >AWS AppSync</a>. Deployed on the <a
        href="https://aws.amazon.com/amplify/console/"
        target="_blank"
        {...styles.footerHighlight}
        >Amplify Console</a>. View Code <a
        href="https://github.com/dabit3/speakerchat"
        {...styles.footerHighlight}
        target="_blank"
        >Here</a>.
      </div>
    </div>
  )
}

function TalksWithContext(props) {
  return (
    <ClientIDContext.Consumer>
      {
        ({ CLIENT_ID }) => (
          <TalkModalContext.Consumer>
            {
              ({ modalVisible, toggle }) => (
                <Talks
                  {...props}
                  modalVisible={modalVisible}
                  toggle={toggle}
                  CLIENT_ID={CLIENT_ID}
                />
              )
            }
          </TalkModalContext.Consumer>
        )
      }
    </ClientIDContext.Consumer>
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
    paddingTop: 112,
    '@media(max-width: 500px)': {
      paddingTop: 175
    }
  }),
  noTalks: css({
    padding: '0px 20px',
    fontSize: 26
  }),
  footer: css({
    padding: 40
  }),
  footerHighlight: css({
    color: '#03b1f5',
    textDecoration: 'none',
  })
}

export default TalksWithContext