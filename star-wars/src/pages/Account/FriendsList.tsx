import React, {useEffect, useState} from "react";
import Dropdown from "react-bootstrap/Dropdown";

const FriendsList = ({friends} : {friends:{uid:string, email:string}[]}) => {
    return (
        <div>
            { friends.length > 0 ? 
                <Dropdown>
            <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
            >
                select from here
            </Dropdown.Toggle>

            <Dropdown.Menu
                style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                }}>
                {friends.map((friend) =>(
                    <Dropdown.Item key={friend.uid}>{friend.email}</Dropdown.Item>
                ))}
                
            </Dropdown.Menu>
        </Dropdown>
        : <h1>Add some friends!</h1>
            } 
        </div>
        
    );
};

export default FriendsList