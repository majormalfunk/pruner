import { gql } from 'apollo-boost'

export const ACCOUNT_DETAILS = gql`
  fragment AccountDetails on CurrentUser {
    username
    nickname
    token
  }
`
export const RELOGIN = gql`
  mutation relogin($token: String) {
    relogin(token: $token) {
      ...AccountDetails
    }
  }
  ${ACCOUNT_DETAILS}
`
export const CREATE_ACCOUNT = gql`
  mutation createAccount($username: String!, $password: String!, $nickname: String!) {
    createAccount(username: $username, password: $password, nickname: $nickname) {
      ...AccountDetails
    }
  }
  ${ACCOUNT_DETAILS}
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ...AccountDetails
    }
  }
  ${ACCOUNT_DETAILS}
`
export const UPDATE_NICKNAME = gql`
  mutation updateNickname($nickname: String!) {
    updateNickname(nickname: $nickname) {
      ...AccountDetails
    }
  }
  ${ACCOUNT_DETAILS}
`
export const UPDATE_PASSWORD = gql`
  mutation updatePassword($oldPassword: String!, $newPassword: String!) {
    updatePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      ...AccountDetails
    }
  }
  ${ACCOUNT_DETAILS}
`
