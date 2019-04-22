import React, { useState } from 'react'
import { css } from 'glamor'

function Talk({ toggleModal, createTalk }) {
  const [state, update] = useState({
    title: '', speakerName: ''
  })

  function updateInput(key, e) {
    update({
      ...state, [key]: e.target.value
    })
  }

  return (
    <div {...styles.container}>
      <h2>New Talk</h2>
      <div {...styles.inputContainer}>
        <input
          value={state.title}
          onChange={e => updateInput('title', e)}
          placeholder='Talk Title'
          {...styles.input}
        />
        <input
          value={state.speakerName}
          onChange={e => updateInput('speakerName', e)}
          placeholder='Speaker Name'
          {...styles.input}
        />
      </div>
      <div {...css(styles.buttonContainer)}>
        <button onClick={() =>  createTalk(state)}>Comment</button>
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
    height: 235,
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
  }),
  cancel: css({
    backgroundColor: '#ddd !important',
    marginLeft: 10,
    color: 'black !important'
  }),
  buttonContainer: css({
    display: 'flex'
  }),
  input: css({
    border: '1px solid #ddd',
    padding: '10px 8px',
    fontSize: 16,
    marginBottom: 7,
    outline: 'none'
  }),
  inputContainer: css({
    display: 'flex',
    flexDirection: 'column'
  })
}

export default Talk