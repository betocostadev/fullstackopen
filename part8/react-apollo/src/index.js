import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// split used for subscriptions
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from '@apollo/client'
import { setContext } from 'apollo-link-context'
// getMainDefinition and WebSocketLink for subscriptions
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('phonenumbers-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
})
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})

// Without login implementation
// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: new HttpLink({
//     uri: 'http://localhost:4000',
//   })
// })

// const query = gql`
// query {
//   allPersons  {
//     name,
//     phone,
//     address {
//       street,
//       city
//     }
//     id
//   }
// }
// `

// client.query({ query })
//   .then((response) => {
//     console.log(response.data)
//   })

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'))
