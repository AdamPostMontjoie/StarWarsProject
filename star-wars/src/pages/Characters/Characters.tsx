import React, {useEffect, useState} from 'react'
import TopNav from '../../components/TopNav'
import axios from 'axios'
import CharCard from './CharCard'
import { Container,Row, Col, } from 'react-bootstrap'
import { Character } from '../../interfaces/Character'
import { useAuth } from '../../contexts/authContext'

const Characters = () => {
  const [favChars, setFavChars] = useState<Character[]>([])
  const {userLoggedIn,currentUser} = useAuth()
  //prevents need for page reload
  const handleCharDeleted = (deletedCharId: string) => {
    setFavChars(prevChars => prevChars.filter(char => char._id !== deletedCharId));
  };
  useEffect(()=>{
    async function loadChars(){
      if(userLoggedIn){
        try{
          let characters = await axios.get(`http://localhost:5050/characters?uid=${currentUser.uid}`)
          setFavChars(characters.data)
          console.log("Data from backend (ships.data):", characters.data);
        }
        catch(error){
          console.log(error);
        }
      }
    }
    loadChars()
  },[currentUser,userLoggedIn])
  return (
    <Container>
        <TopNav/>
        <h1>Favorite Characters</h1>
        {favChars && favChars.length > 0 && (
          <Row className="mt-4">
          {favChars.map((data:Character) => (
              <Col key={data.uid} xs={12} sm={6} md={4} lg={3} className="mb-3">
                  <CharCard onDelete={handleCharDeleted} character={data}/>
              </Col>
          )) }
      </Row>
        )}
        {favChars.length === 0 && (<h2>Add some characters to your favorites!</h2>)}
    </Container>
  )
}

export default Characters