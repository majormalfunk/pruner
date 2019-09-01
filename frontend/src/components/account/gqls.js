import { gql } from 'apollo-boost'
//import { EVENT_DETAILS } from '../event/gqls'

export const RELOGIN = gql`
  mutation relogin($token: String) {
    relogin(token: $token) {
      username
      nickname
      token
    }
  }
`
export const CREATE_ACCOUNT = gql`
  mutation createAccount($username: String!, $password: String!, $nickname: String!) {
    createAccount(username: $username, password: $password, nickname: $nickname) {
      username
      nickname
      token
    }
  }
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      nickname
      token
    }
  }
`
export const UPDATE_NICKNAME = gql`
  mutation updateNickname($username: String!, $nickname: String!) {
    updateNickname(username: $username, nickname: $nickname) {
      username
      nickname
      token
    }
  }
`
export const UPDATE_PASSWORD = gql`
  mutation updatePassword($username: String!, $oldPassword: String!, $newPassword: String!) {
    updatePassword(username: $username, oldPassword: $oldPassword, newPassword: $newPassword) {
      username
      nickname
      token
    }
  }
`
