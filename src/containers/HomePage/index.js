import React from 'react'
import PhotoSection from './PhotoSection'
import IntroBlock from './IntroBlock'
// import BusinessSection from './BusinessSection'

class HomePage extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  render () {
    // if (this.props.data.loading) {
    //   return (<div>Loading</div>)
    // }
    // Now for the JSX template that defines how our component actually looks!
    return (
      <article>
        <IntroBlock />
        {/* <BusinessSection title="Featured Businesses" /> */}
        { /* Would be great to pass through a value for number of photos to show here */ }
        <PhotoSection title="Newest Photos" />
      </article>
    )
  }
}

export default HomePage
