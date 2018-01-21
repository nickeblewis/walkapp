import React from 'react'
import ReactDOM from 'react-dom'

// Layouts
import MainLayout from './layouts/MainLayout'

// Components
import LoginUser from './containers/LoginUser'
import CreateUser from './containers/CreateUser'
import HomePage from './containers/HomePage'
import SocialPage from './containers/SocialPage'
// import WalkPage from './containers/WalkPage'
// import BusinessPage from './containers/BusinessPage'
import ListPage from './containers/ListPage'
import PlaceListPage from './containers/PlaceListPage'
import ListCategory from './containers/ListCategory'
import CreatePage from './containers/CreatePage'
import CreateEvent from './containers/CreateEvent'
import PhotoPage from './containers/PhotoPage'
import EventPage from './containers/EventPage'
import DashboardPage from './containers/DashboardPage'
import PlacePage from './containers/PlacePage'
import EventListPage from './containers/EventListPage'
import MessagePage from './containers/MessagePage'
import ThankyouPage from './containers/ThankyouPage'
import AboutPage from './containers/AboutPage'
// import CreateCategory from './containers/CreateCategory'

import { Router, Route, browserHistory } from 'react-router'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

// import 'tachyons'
import './index.css'

const networkInterface = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cixraxev60e4c0121krsia44h' })

networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }

    if (localStorage.getItem('graphcoolToken')) {
      req.options.headers.authorization = `Bearer ${localStorage.getItem('graphcoolToken')}`
    }
    next()
  },
}])

const client = new ApolloClient({ networkInterface })

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route component={MainLayout}>
        <Route path='/' component={HomePage} />
        <Route path='/social' component={SocialPage} />
        <Route path='/about' component={AboutPage} />
        <Route path='/photos' component={ListPage} />
        <Route path='/places' component={PlaceListPage} />
        <Route path='/events' component={EventListPage} />
        <Route path='/admin' component={DashboardPage} />
        <Route path='/places/:id' component={PlacePage} />
        {/*<Route path='/walks' component={WalkPage} />*/}
        {/*<Route path='/contacts' component={BusinessPage} />*/}
        <Route path='/photos/create' component={CreatePage} />
        <Route path='/events/create' component={CreateEvent} />
        <Route path='/photos/view/:id' component={PhotoPage} />
        <Route path='/events/:id' component={EventPage} />
        {/*<Route path='/categories/create' component={CreateCategory} />*/}
        <Route path='/categories' component={ListCategory} />
        <Route path='login' component={LoginUser} />
        <Route path='signup' component={CreateUser}/>
        <Route path='registeryourinterest' component={MessagePage}/>
        <Route path='thankyou' component={ThankyouPage}/>
      </Route>
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('root')
)
