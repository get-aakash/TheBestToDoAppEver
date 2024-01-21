import React from 'react'
import Header from './Layout/Header'
import Footer from './Layout/Footer'

const DefaultLayout = ({children}) => {
  return (
    <div>
        <Header />
        <div className="main">{children}</div>
        <Footer />
      
    </div>
  )
}

export default DefaultLayout
