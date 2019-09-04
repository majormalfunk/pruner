import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import ApolloClient from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'

import './index.css'
import { USER_TOKEN } from './constants'
import App from './App'
import store from './store'


const uri = (process.env.NODE_ENV === 'development' ? 'http://localhost:4000/graphql' : '/graphql')
const httpLink = createHttpLink({
  uri: uri
})

const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem(USER_TOKEN)
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
  <Provider store={store}>
    <ApolloHooksProvider client={client}>
      <App />
    </ApolloHooksProvider>
  </Provider>,
  document.getElementById('root')
)