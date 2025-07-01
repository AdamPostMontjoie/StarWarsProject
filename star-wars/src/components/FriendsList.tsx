import Dropdown from "react-bootstrap/Dropdown";

const FriendsList = ({friends, handleClick} : {friends:{uid:string, email:string}[], handleClick:(uid:string)=>void}) => {
    return (
        <div>
            { friends.length > 0 ?
                <Dropdown>
            <Dropdown.Toggle
                style={{ backgroundColor: 'black', color: 'white' }} // Changed here
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
        : <h1><a href="/account">Add some friends!</a></h1>
            }
        </div>

    );
};

export default FriendsList;