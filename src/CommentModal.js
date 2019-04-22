import React, { useState } from 'react'
import { css } from 'glamor'

function CommentModal({ toggleModal, createComment }) {
  const [input, updateInput] = useState('')

  return (
    <div {...styles.container}>
      <h2>New Comment</h2>
      <textarea
        value={input}
        onChange={e => updateInput(e.target.value)}
        placeholder='Leave your comment (markdown accepted)'
      />
      <div {...css(styles.buttonContainer)}>
        <button onClick={() =>  createComment(input)}>Comment</button>
        <button onClick={toggleModal} {...css(styles.cancel)}>Cancel</button>
      </div>
    </div>
  )
}

const styles = {
  container: css({
    position: 'fixed',
    zIndex: 100,
    backgroundColor: 'white',
    width: 600,
    height: 300,
    left: 'calc(50vw - 300px)',
    top: 'calc(50vh - 150px)',
    borderRadius: 7,
    boxShadow: '0px 0px 6px rgba(0, 0, 0, .15)',
    padding: 20,
    '& h2': {
      margin: '0px 0px 15px'
    },
    '& textarea': {
      width: 560,
      height: 170,
      border: '1px solid #ddd',
      outline: 'none',
      padding: '6px',
      fontSize: 18,
      '@media(max-width: 640px)': {
        width: '100%'
      }
    },
    '& button': {
      outline: 'none',
      border: 'none',
      backgroundColor: 'rgb(3, 177, 245)',
      color: 'white',
      padding: '10px 30px',
      borderRadius: 3,
      marginTop: 8,
      cursor: 'pointer',
      fontSize: 16
    },
    '@media(max-width: 640px)': {
      width: 'calc(100% - 20px)',
      marginLeft: 10,
      marginRight: 10,
      left: 0
    }
  }),
  cancel: css({
    backgroundColor: '#ddd !important',
    marginLeft: 10,
    color: 'black !important'
  }),
  buttonContainer: css({
    display: 'flex'
  })
}

export default CommentModal