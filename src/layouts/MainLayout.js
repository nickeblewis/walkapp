import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
// import Nav from '../components/Nav'
import { Link } from 'react-router'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router'
import gql from 'graphql-tag'
import { ReactSlackChat } from 'react-slack-chat'

class MainLayout extends React.Component {
  static propTypes = {
    router: React.PropTypes.object.isRequired,
    data: React.PropTypes.object,
  }

  _logout = () => {
    // remove token from local storage and reload page to reset apollo client
    window.localStorage.removeItem('graphcoolToken')
    location.reload()
    // this.props.router.push('/')
  }

  _showLogin = () => {
    this.props.router.push('/login')
  }

  _createEvent = () => {
    this.props.router.push('/events/create')
  }

  _showSignup = () => {
    this.props.router.push('/signup')
  }

  _isLoggedIn = () => {
    return this.props.data.user
  }


  render = () => {
    return (
      <main>
        <nav role="navigation" aria-label="main navigation" className="navbar">
          <div className="container">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item">
                <strong>🏠 Home</strong>
              </Link>
              <button data-target="navMenu" className="button navbar-burger"><span></span> <span></span> <span></span></button>
            </div>
            <div id="navMenu" className="navbar-menu">
              <div className="navbar-start">
                <Link to="/events" className="navbar-item"><span>Events</span></Link>
                {/* <Link to="/blog" className="navbar-item"><span>Blog</span></Link>  */}
              </div>
              <div className="navbar-end">
                {this._isLoggedIn() &&
                  <div className="navbar-item">
                    <span>
                      Logged in as {this.props.data.user.name}
                    </span>
                  </div>
                }

                {!this._isLoggedIn() &&
                  <div className="navbar-item">
                    <span onClick={this._showSignup} className="button is-primary">SIGN UP</span>
                  </div>
                }

                {!this._isLoggedIn() &&
                  <div className="navbar-item">
                    <span onClick={this._showLogin} className="button is-light">LOG IN</span>
                  </div>
                }

                {this._isLoggedIn() &&
                  <div className="navbar-item">
                    <Link to="/events/create" className="button is-light">CREATE EVENT</Link>
                  </div>
                }

                {this._isLoggedIn() &&
                  <div className="navbar-item">
                    <span onClick={this._logout} className="button is-light">LOG OUT</span>
                  </div>
                }
                
              </div>
            </div>
          </div>
        </nav>
        <Header />
        {this.props.children}
        <ReactSlackChat
          botName='farnbot' // VisitorID, CorpID, Email, IP address etc.
          apiToken='eG94Yi0yODIyMzgyNjI5NjYtYmZTV1hhUmJQYng0bXFQZUNIYk5IV0w1'
          channels={[
          {
            name: 'random'
          },
          {
            name: 'test',
            id: 'C48SAX4',
            icon: ''
          },
          {
            name: 'test22',
            id: '',
            icon: './logo.svg'
          }]}
          helpText='Optional Help Text'
          themeColor='#856090'
          userImage='http://www.iconshock.com/img_vista/FLAT/mail/jpg/robot_icon.jpg'
          debugMode={true}
          hooks={[
            {
              /* My Custom Hook */
              id: 'getSystemInfo',
              action: () => 'MY SYSTEM INFO!'
            }
          ]}
        />

        <Footer />
      </main>
    )
  }
}

const userQuery = gql`
  query {
    user {
      id
      name
    }
  }
`

export default graphql(userQuery, { options: { forceFetch: true } })(withRouter(MainLayout))