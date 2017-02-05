/**
 * Lets talk a bit about the typical format of a React app file, this is what we call
 * a "pattern" and you can think of it as being a template for all script files
 * 
 * IMPORTS
 * 
 * ES6 supports modular javascript which enables us to break a project down into 
 * chunks
 */

// The first two imports are always essential in React projects
// you will find these are included in the package.json file and are installed
// when we run "npm install"
import React from 'react'
import ReactDOM from 'react-dom'

// The next four lines import our own components
import HomePage from './containers/HomePage'
import ListPage from './containers/ListPage'
import ListCategory from './containers/ListCategory'
import CreatePage from './containers/CreatePage'
import CreateCategory from './containers/CreateCategory'

// Next we need to include the tools for app routing
import { Router, Route, browserHistory } from 'react-router'

// ApolloClient is a tool for connecting our app to the GraphQL database
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

// Our CSS bits and bobs follow
import 'tachyons'
import './index.css'

// You will see the endpoint from our Farnborough database is below
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

// The routes below were updated as part of the changes I made, so that if you go 
// to http://localhost:4000/categories the user is routed to the ListCategory
// component
ReactDOM.render((
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route path='/' component={HomePage} />
      <Route path='/photos' component={ListPage} />
      <Route path='/create' component={CreatePage} />
      <Route path='/createcategory' component={CreateCategory} />
      <Route path='/categories' component={ListCategory} />
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('root')
)
