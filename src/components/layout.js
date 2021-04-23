import * as React from 'react'
import { Link } from 'gatsby'
import '../components/styles/styles.css'

const Layout = ({children}) => {

  return (
    <>
    <nav>
      <Link to='/'><h4>Sentiment Slider Test V2</h4></Link>
    </nav>
    <main>
      {children}
    </main>
    </>

  )
}

export default Layout