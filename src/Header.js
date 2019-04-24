import React from 'react'
import { css } from 'glamor'
import { Link, Location } from "@reach/router"

import logo from './assets/speakerchat.png'
import { TalkModalContext } from './contexts'

function Header(props) {
  const responsiveHeaderStyle = (props.location.pathname === '/') ? styles.responsiveHeader : null
    return (
      <div
        {...styles.header}
        {...responsiveHeaderStyle}
      >
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
              <div {...styles.buttonWrapper}>
                <p onClick={props.toggle}>New Talk</p>
              </div>
            </div>
          )
        }
      </div>
    )
}

function HeaderWithContext(props) {
  return (
    <TalkModalContext.Consumer>
      {
        ({ toggle }) => (
          <Location>
            {
              ({ location }) => (
                <Header
                  {...props}
                  location={location}
                  toggle={toggle}
                />
              )
            }
          </Location>
        )
      }
    </TalkModalContext.Consumer>
  )
}

const styles = {
  header: css({
    height: 112,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03b1f5',
    padding: 15,
    display: 'flex',
  }),
  responsiveHeader: css({
    '@media(max-width: 500px)': {
      flexDirection: 'column',
      height: 175,
    }
  }),
  logo: css({
    width: 230,
    cursor: 'pointer'
  }),
  buttonWrapper: css({
    backgroundColor: 'black',
    height: 44,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    width: 140,
    marginRight: 30,
    marginTop: 18,
    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, .75)',
    },
    '@media(max-width: 500px)': {
      marginTop: 10,
      marginRight: 0,
      marginLeft: 3
    }
  }),
  buttonContainer: css({
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    '& p': {
      color: 'white',      
      cursor: 'pointer',
      margin: 0
    },
    '@media(max-width: 500px)': {
      justifyContent: 'flex-start',
    }
  })
}

export default HeaderWithContext