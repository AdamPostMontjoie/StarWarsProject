import React, {useEffect, useState} from "react";
import Dropdown from "react-bootstrap/Dropdown";

const FriendsList = ({friends, handleClick} : {friends:{uid:string, email:string}[], handleClick:(uid:string)=>void}) => {
    return (
        <div>
            { friends.length > 0 ? 
                <Dropdown>
            <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
            >
                Your Friends
            </Dropdown.Toggle>

            <Dropdown.Menu
                style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                }}>
                {friends.map((friend) =>(
                    <Dropdown.Item onClick={()=>handleClick(friend.uid)} key={friend.uid}>{friend.email}</Dropdown.Item>
                ))}
                
            </Dropdown.Menu>
        </Dropdown>
        : <h1>Add some friends!</h1>
            } 
        </div>
        
    );
};

export default FriendsList