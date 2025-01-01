import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSellers from '../components/BestSellers'
import OurPolicy from '../components/OurPolicy'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <div>
      <Hero />      {/* then this component (Hero.jsx) starts rendering found in components directory and then below */}
      <LatestCollection />     {/* // this component (LatestCollection.jsx) will... & it is also found in components directory.  */}
      <BestSellers />           {/* // this component (BestSellers.jsx) will... & it is also found in components directory.  */}
      <OurPolicy />           {/* // this component (OurPolicy.jsx) will... & it is also found in components directory.  */}
      <NewsLetter />           {/* // this component (NewsLetter.jsx) will... & it is also found in components directory.  */}
    </div>
  )
}

export default Home
