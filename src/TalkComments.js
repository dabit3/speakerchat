import React, { useReducer, useEffect, useState } from 'react'
import { css } from 'glamor'
import { API, graphqlOperation } from 'aws-amplify'
import ReactMarkdown from 'react-markdown'

import CommentModal from './CommentModal'
import { listCommentsForTalk } from './graphql/queries'
import { onCreateCommentWithId } from './graphql/subscriptions'
import { createComment as CreateComment, deleteComment as DeleteComment } from './graphql/mutations'
import { ClientIDContext } from './contexts'
import { SC_PROFILE_KEY } from './constants'
import Popup from 'react-popup'
import 'react-popup/style.css'

const USERNAME = window.localStorage.getItem(SC_PROFILE_KEY)
const KEY = 'SPEAKERCHAT_TALK_COMMENTS_'

const initialState = {
  loading: false,
  loaded: false,
  comments: [],
  error: false
}

function reducer(state, action) {
  switch(action.type) {
    case 'set':
      return { ...state, comments: action.comments, loading: false, loaded: true }
    case 'add':
      return {
        ...state, comments: [action.comment, ...state.comments]
      }
    case 'delete':
      var index = state.comments.findIndex(c => c.id === action.comment.id)
      const comments = [...state.comments]
      comments.splice(index, 1);
      return {
        ...state, comments
      }
    case 'error':
      return { ...state, error: action.error }
    case 'setLoading':
      return { ...state, loading: true }
    default:
      throw Error()
  }
}

function getFromStorage(talkId, dispatch) {
  const comments = window.localStorage.getItem(`${KEY}${talkId}`)
  if (comments) {
    dispatch({ type: 'set', comments: JSON.parse(comments) })
  } else {
    dispatch({ type: 'setLoading' })
  }
}

function setToStorage(talkId, talks) {
  window.localStorage.setItem(`${KEY}${talkId}`, JSON.stringify(talks))
} 

async function fetchComments(talkId, dispatch) {
  try {
    getFromStorage(talkId, dispatch)
    const commentData = await API.graphql(graphqlOperation(listCommentsForTalk, { talkId }))
    const comments = commentData.data.listCommentsForTalk.items
    setToStorage(talkId, comments)
    dispatch({ type: 'set', comments })
  } catch (error) {
    console.log('error:', error)
    dispatch({ type: 'error', error })
  }
}

async function deleteComment(comment, dispatch) {
  dispatch({
    type: 'delete', comment
  })
  let commentsFromStorage = window.localStorage.getItem(`${KEY}${comment.talkId}`)
  commentsFromStorage = JSON.parse(commentsFromStorage)
  var index = commentsFromStorage.findIndex(c => c.id === comment.id)
  const comments = [...commentsFromStorage]
  comments.splice(index, 1)
  setToStorage(comment.talkId, comments)
  try {
    await API.graphql(graphqlOperation(DeleteComment, { input: {
      id: comment.id
    } }))
    console.log('deleted comment')
  } catch (err) {
    console.log('error deleting comment: ', err)
  }
}

async function createComment(talkId, comment, dispatch, toggleModal, CLIENT_ID) {
  if (comment === '') {
    alert('Please create a comment')
    return
  }
  
  let newComment = {
    talkId,
    text: comment,
    clientId: CLIENT_ID,
    createdAt: Date.now(),
    createdBy: USERNAME
  }
  const comments = window.localStorage.getItem(`${KEY}${talkId}`)
  let newCommentArray = JSON.parse(comments)
  newCommentArray = [newComment, ...newCommentArray]

  setToStorage(talkId, newCommentArray)

  dispatch({
    type: 'add', comment: newComment
  })
  toggleModal()
  try {
    await API.graphql(graphqlOperation(CreateComment, { input: newComment }))
    console.log('successfully created comment!')
  } catch (err) {
    console.log('error creating comment..', err)
  }
}

function TalkComments(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [modalVisible, toggle] = useState(false)

  function toggleModal() {
    toggle(!modalVisible)
  }

  function shareTalk() {
    console.log('props: ', props)
    console.log('sharing...')
    navigator.clipboard.writeText(props.location.href)
    Popup.alert('Link copied to your clipboard!')
  }
  
  useEffect(() => {
    fetchComments(props.talkId, dispatch)
  }, [])

  useEffect(() => {
    const subscriber = API.graphql(
      graphqlOperation(onCreateCommentWithId, { talkId: props.talkId })
    ).subscribe({
      next: eventData => {
        const comment = eventData.value.data.onCreateCommentWithId
        if(props.CLIENT_ID === comment.clientId) return
        dispatch({
          type: 'add', comment
        })
      }
    })
    return () => subscriber.unsubscribe()
  }, [])

  const comments = [...state.comments].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).reverse()
  return (
    <div>
      <div {...styles.header}>
        <div>
          <h1 {...styles.heading}>{props.talkName}</h1>
          <p
            onClick={shareTalk}
            {...styles.shareButton}
          >Share Talk</p>
        </div>
        <div {...styles.commentButton}>
          <p onClick={toggleModal} {...styles.commentButtonText}>New Comment</p>
        </div>
      </div>
      {
        state.loading && <h2>Loading...</h2>
      }
      {
        state.loaded && (comments.length < 1) && <p {...styles.noComments}>No Comments.</p>
      }
      {
        comments.map((c, i) => (
          <div key={i} {...styles.comment}>
            <ReactMarkdown source={c.text} />
            <p {...styles.createdBy}>{c.createdBy}</p>
            <p
              onClick={() => deleteComment(c, dispatch)}
            {...styles.delete}>Delete</p>
          </div>
        ))
      }
      {
        modalVisible && (
          <CommentModal
            toggleModal={toggleModal}
            createComment={(comment) => createComment(props.talkId, comment, dispatch, toggleModal, props.CLIENT_ID)}
          />
        )
      }
      <Popup />
    </div> 
  )
}

function TalkCommentsWithContext(props) {
  return (
    <ClientIDContext.Consumer>
      {
        ({ CLIENT_ID }) => (
          <TalkComments
            {...props}
            CLIENT_ID={CLIENT_ID}
          />
        )
      }
    </ClientIDContext.Consumer>
)
}

const styles = {
  header: css({
    paddingTop: 112,
    borderBottom: '1px solid rgba(0, 0, 0, .15)',
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, .05)',
    '@media(max-width: 600px)': {
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  }),
  heading: css({
    padding: '10px 30px',
    marginBottom: 0,
    '@media(max-width: 600px)': {
      paddingBottom: 0,
      marginBottom: 0
    }
  }),
  shareButton: css({
    backgroundColor: 'black',
    color: 'white',
    width: 100,
    margin: 0,
    borderRadius: 6,
    cursor: 'pointer',
    padding: '5px 0px',
    marginLeft: 30,
    marginBottom: 25,
    textAlign: 'center',
    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, .8)'
    },
    '@media(max-width: 600px)': {
      marginTop: 10,
      marginBottom: 0,
    }
  }),
  comment: css({
    border: '1px solid rgba(0, 0, 0, .1)',
    padding: "10px 20px",
    margin: 10,
    borderRadius: 10,
    '& p': {
      margin: '10px 0px',
    },
    '& h1': {
      margin: '5px 0px',
    },
    '& pre': {
      margin: '5px 0px',
      backgroundColor: 'rgba(0, 0, 0, .07)',
      padding: 10,
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      '@media(max-width: 600px)': {
        width: 'calc(100%)'
      }
    },
    '& img': {
      margin: '5px 0px',
      '@media(max-width: 600px)': {
        width: '100%'
      }
    },
    '& blockquote': {
      borderLeft: '8px solid black',
      marginLeft: 0,
      padding: '8px 0px 8px 14px',
    }
  }),
  commentButton: css({
    display: 'flex',
    flex: 1,
    height: 78,
    justifyContent: 'flex-end',
    marginRight: 20,
    marginTop: 10,
    '@media(max-width: 600px)': {
      marginLeft: 30,
      marginTop: 0
    }
  }),
  commentButtonText: css({
    padding: '12px 40px',
    width: 190,
    backgroundColor: 'rgba(3, 177, 245, .85)',
    borderRadius: 7,
    color: 'white',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'rgb(3, 177, 245)'
    }
  }),
  commentText: css({
    fontSize: 20,
    margin: '0px 0px 5px'
  }),
  createdBy: css({
    fontSize: 15,
    color: 'rgba(0, 0, 0, .4)',
    margin: '0px 0px 5px'
  }),
  noComments: css({
    padding: '0px 20px',
    fontSize: 26
  }),
  delete: css({
    cursor: 'pointer',
    backgroundColor: 'black',
    color: 'white',
    padding: '3px 0px',
    margin: 0,
    width: 66,
    fontSize: 12,
    textAlign: 'center',
    ':hover': {
       backgroundColor: 'rgba(0, 0, 0, .7)'
    }
  })
}

export default TalkCommentsWithContext