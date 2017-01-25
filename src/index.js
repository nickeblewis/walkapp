// The first two imports are always essential in React projects
import React from 'react'
import ReactDOM from 'react-dom'

// The next four lines import are own components
import ListPage from './components/ListPage'
import ListCategory from './components/ListCategory'
import CreatePage from './components/CreatePage'
import CreateCategory from './components/CreateCategory'

// Next we need to include the tools for app routing
import { Router, Route, browserHistory } from 'react-router'

// ApolloClient is a tool for connecting our app to the GraphQL database
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

// Our CSS bits and bobs follow
import 'tachyons'
import './index.css'

const networkInterface = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cixraxev60e4c0121krsia44h' })

// The x-graphcool-source header is to let the server know that the example app has started.
// (Not necessary for normal projects)
networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      // Create the header object if needed.
      req.options.headers = {}
    }
    req.options.headers['x-graphcool-source'] = 'example:react-apollo-instagram'
    next()
  },
}])

const client = new ApolloClient({ networkInterface })

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route path='/' component={ListPage} />
      <Route path='/create' component={CreatePage} />
      <Route path='/createcategory' component={CreateCategory} />
      <Route path='/categories' component={ListCategory} />
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('root')
)
