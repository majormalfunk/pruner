const { gql } = require('apollo-server')

module.exports = {
  typeDef: gql`
    type CurrentUser {
      username: String!
      nickname: String!
      token: String!
    }
    type Token {
      value: String!
    }
    extend type Mutation {
      createAccount(
        username: String!
        password: String!
        nickname: String!
      ): CurrentUser
      login(
        username: String!
        password: String!
      ): CurrentUser
      updateNickname(
        username: String!
        nickname: String!
      ): CurrentUser
      updatePassword(
        username: String!
        oldPassword: String!
        newPassword: String!
      ): CurrentUser
      relogin(token: String): CurrentUser
    }
  `
}