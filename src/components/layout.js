import * as React from 'react'
import { Link } from 'gatsby'
import '../components/styles/styles.css'

const Layout = ({children}) => {

  return (
    <>
    <nav>
      <Link to='/'><h4>Sentiment slider test</h4></Link>
    </nav>
    <main>
      {children}
    </main>
    </>

  )
}

export default Layout