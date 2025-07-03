import React, {useEffect, useState} from 'react'
import TopNav from '../../components/TopNav'
import FriendSearch from './FriendSearch';
import FriendsList from '../../components/FriendsList';
import { Container } from 'react-bootstrap';
import { useAuth } from '../../contexts/authContext';
import axios from 'axios';
import { User } from '../../interfaces/User';

const Account = () => {
  const {currentUser, userLoggedIn} = useAuth()
  const [dbUser,setDbUser] = useState<User | null>(null)
  const [allDbUsers, setAllDbUsers] = useState<User[]>([])

  useEffect(()=>{
    async function friendData(){

      if(userLoggedIn && currentUser?.uid){
      console.log('logged in')
        try{
          //given size of site no need for a real search function
          //more data on users is kept in mongodb like friends
          let allUsers = await axios.get('https://starwars-backend-z23b.onrender.com/users')
          console.log(allUsers.data);
          
          setAllDbUsers(allUsers.data.filter((u:User) => u.uid !== currentUser.uid))
          let user = await axios.get(`https://starwars-backend-z23b.onrender.com/users/${currentUser.uid}`)
          console.log(user.data)
          setDbUser(user.data)
        }
        catch(err){
          console.error(err)
        }
      }else{
        console.log("nope");
        
      }
    }
    friendData()
  },[userLoggedIn,currentUser]) 
  //blank function, didn't want to make second component
  const handleClick = ()=> {};
   console.log(userLoggedIn,currentUser,dbUser,allDbUsers.length)
  return (
    <div>
    <TopNav/>
    <Container>
     {userLoggedIn && currentUser && dbUser && allDbUsers.length > 0 && (
      <div>
        <h1>Your account info</h1>
        <h3>Email: {currentUser.email}</h3> 
        <h5>Add to your friends list!</h5>
        <FriendSearch allUsers={allDbUsers}/>
        <h5>Your friends</h5>
        <FriendsList handleClick={handleClick} friends={dbUser.friends || []}/>
      </div>
      )}
    </Container>
    </div>
  )
}

export default Account