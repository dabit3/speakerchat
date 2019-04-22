import React from 'react'
import { css } from 'glamor'
import { Link } from "@reach/router"

import logo from './assets/speakerchat.png'

function Header() {
  return (
    <div {...styles.header}>
      <Link to="/">
        <img
          alt='logo'
          src={logo}
          {...styles.logo}
        />
      </Link>
      <div {...styles.buttonContainer}>
        <p>New Talk</p>
      </div>
    </div>
  )
}

const styles = {
  header: css({
    backgroundColor: '#03b1f5',
    padding: 15,
    display: 'flex'
  }),
  logo: css({
    width: 230,
    cursor: 'pointer'
  }),
  buttonContainer: css({
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    '& p': {
      padding: '15px 40px',
      backgroundColor: 'black',
      color: 'white',
      marginRight: 15,
      borderRadius: 6,
      cursor: 'pointer',
    },
    '& p:hover': {
      backgroundColor: 'rgba(0, 0, 0, .75)',
    }
  })
}

export default Header