import React from 'react'
import { css } from 'glamor'
import { Link, Location } from "@reach/router"

import logo from './assets/speakerchat.png'
import { TalkModalContext } from './contexts'

function Header(props, context) {
  return (
    <TalkModalContext>
    {
      context => (
        <Location>
          {props => {
            return (
              <div {...styles.header}>
                <Link to="/">
                  <img
                    alt='logo'
                    src={logo}
                    {...styles.logo}
                  />
                </Link>
                {
                  props.location.pathname === '/' && (
                    <div {...styles.buttonContainer}>
                      <p onClick={context.toggle}>New Talk</p>
                    </div>
                  )
                }
              </div>
            )
          }}
        </Location>
      )
    }
    </TalkModalContext>
  )
}

const styles = {
  header: css({
    backgroundColor: '#03b1f5',
    padding: 15,
    display: 'flex',
    '@media(max-width: 500px)': {
      flexDirection: 'column'
    }
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
    },
    '@media(max-width: 500px)': {
      justifyContent: 'flex-start',
    }
  })
}

export default Header