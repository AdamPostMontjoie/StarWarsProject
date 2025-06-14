import React from 'react'
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import CharCard from './CharCard';

const CharSearch = () => {
    const [character, setCharacter] = useState('')
    const [characterData, setCharacterData] = useState<any>(null)
    async function search(e:React.FormEvent){
        e.preventDefault()
        try{
            const response = await axios.get(`https://www.swapi.tech/api/people/?name=${character}`)
            console.log(response.data.result)
            setCharacterData(response.data.result)
        }
        catch(err){
            console.error(err)
        }
    }
  return (
    <Container>
        <h1>Search for a Star Wars Character</h1>
        <Form onSubmit={search}>
      <Form.Group className="mb-3" controlId="formPlayer">
        <Form.Label>Character</Form.Label>
        <Form.Control
         type="input" placeholder="Enter character name" 
         onChange={(e) => setCharacter(e.target.value)}
         />
      </Form.Group>
      <Button as="input" type="submit" value="Submit" />
      </Form>
      {characterData && characterData.length > 0 && ( 
            <Row className="mt-4">
                {characterData.map((data: any) => (
                    <Col key={data.u_id} xs={12} sm={6} md={4} lg={3} className="mb-3">
                        <CharCard character={data}/>
                    </Col>
                ))}
            </Row>
            )}
    </Container>
  )
}

export default CharSearch