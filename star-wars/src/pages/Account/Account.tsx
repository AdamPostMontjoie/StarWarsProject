import React, {useEffect, useState} from 'react'
import TopNav from '../../components/TopNav'
import FriendSearch from './FriendSearch';
import FriendsList from './FriendsList';
import { Container } from 'react-bootstrap';
import { useAuth } from '../../contexts/authContext';
import axios from 'axios';
import { User } from '../../interfaces/User';

const Account = () => {
  const {currentUser, userLoggedIn} = useAuth()
  const [dbUser,setDbUser] = useState<any>(null)
  const [allDbUsers, setAllDbUsers] = useState<User[]>([])


  useEffect(()=>{
    async function friendData(){
      console.log(userLoggedIn);
      console.log(currentUser);
      console.log(dbUser);
      console.log(allDbUsers.length);
      if(userLoggedIn){
        try{
          //given size of site no need for a real search function
          //more data on users is kept in mongodb like friends
          let allUsers = await axios.get('http://localhost:5050/users')
          console.log(allUsers.data);
          
          setAllDbUsers(allUsers.data.filter((u:User) => u.uid !== currentUser.uid))
          let user = await axios.get(`http://localhost:5050/users/${currentUser.uid}`)
          console.log(user.data)
          setDbUser(user.data)
        }
        catch(err){
          console.error(err)
        }
      }
    }
    friendData()
  },[userLoggedIn,currentUser])

  return (
    <Container>
      <TopNav/>
     {userLoggedIn && currentUser && dbUser && allDbUsers.length > 0 && (
      <div>
        <h1>Your account info</h1>
        <h3>Email: {currentUser.email}</h3> 
        <h5>Add to your friends list!</h5>
        <FriendSearch allUsers={allDbUsers}/>
        <h5>Your friends</h5>
        <FriendsList friends={dbUser.friends}/>
      </div>
      )}
    </Container>
  )
}

export default Account