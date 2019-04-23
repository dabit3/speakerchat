import { SC_PROFILE_KEY } from './constants'
import profile from './profileinfo'

const USER = window.localStorage.getItem(SC_PROFILE_KEY)

if (!USER) {
  window.localStorage.setItem(SC_PROFILE_KEY, profile)
  console.log('profile: ', profile)
}