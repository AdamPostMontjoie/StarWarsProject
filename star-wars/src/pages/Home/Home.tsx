import React from 'react'
import TopNav from '../../components/TopNav'
import ShipSearch from './ShipSearch'
import { useAuth } from '../../contexts/authContext'
import NotLoggedIn from '../../components/NotLoggedIn'
//this page is real barebones because originally was Character search as well
//biggest problem i have with my react code in this was not making more components, too much per page

const Home = () => {
  const {userLoggedIn, loading} = useAuth()

  return (
    <div>
      <TopNav/>
      {(userLoggedIn && !loading) || (!userLoggedIn && loading)?
      <div>
       
      <ShipSearch/> 
      </div>
      :
      <div>
        <NotLoggedIn/>
      </div>
      }
      
    </div>
  )
}

export default Home