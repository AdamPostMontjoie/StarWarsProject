import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { User } from '../../interfaces/User'
import axios from 'axios'
import { useAuth } from '../../contexts/authContext'

const FriendSearch = ({allUsers} :{allUsers:User[]}) => {

    const {currentUser} = useAuth()
    async function addFriend(newFriend:User){
        console.log("clicked")
        try{
            const response = await axios.patch(
                `https://starwars-backend-z23b.onrender.com/users/${currentUser.uid}`, 
                {friendUid: newFriend.uid,friendEmail:newFriend.email, userEmail:currentUser.email}
            )
            console.log(response.data);
            
        }
        catch(err){
            console.error(err)
        }
    }

    return (
        <div>
        {allUsers.length > 0 ? <Dropdown>
            <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
            >
                Select from site's users
            </Dropdown.Toggle>

            <Dropdown.Menu
                style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                }}>
                {allUsers.map((user:User) =>(
                    <Dropdown.Item onClick={()=> addFriend(user)} key={user.uid} href="#">{user.email}</Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown> : 
        <h1>Cannot render users, please reload page</h1>
        }
        </div>
    )
}

export default FriendSearch