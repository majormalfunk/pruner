import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import './index.css'
import { USER_TOKEN } from './constants'
import App from './App'

const uri = (process.env.NODE_ENV === 'development' ? 'http://localhost:4000/graphql' : '/graphql')
console.log('uri:', uri)
const httpLink = createHttpLink({
  uri: uri
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(USER_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null
    }
  }
})

const link = authLink.concat(httpLink)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <App />
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root')
)