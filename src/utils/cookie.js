import Cookies from 'js-cookie'
export const DeafultTokenKey = 'GMR'
export function getToken (TokenKey = DeafultTokenKey) {
  return Cookies.get(TokenKey)
}
export function setToken (token, TokenKey = DeafultTokenKey) {
  return Cookies.set(TokenKey, token)
}
export function removeToken (TokenKey = DeafultTokenKey) {
  return Cookies.remove(TokenKey)
}
