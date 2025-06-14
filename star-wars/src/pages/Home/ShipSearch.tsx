import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import { Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShipCard from './ShipCard';

const ShipSearch = () => {
    const [ship, setShip] = useState('')
    const [shipData, setShipData] = useState<any>(null)
    async function search(e:React.FormEvent){
        e.preventDefault()
        try{
            const response = await axios.get(`https://www.swapi.tech/api/starships/?name=${ship}`)
            setShipData(response.data.result)
            console.log(response.data.result)
        }
        catch(err){
            console.error("API Error:",err)
        }
    }
  return (
    <Container>
        <h1>Search for a Star Wars Starship</h1>
        <Form onSubmit={search}>
      <Form.Group className="mb-3" controlId="formPlayer">
        <Form.Label>Character</Form.Label>
        <Form.Control
         type="input" placeholder="Enter starship name" 
         onChange={(e) => setShip(e.target.value)}
         />
      </Form.Group>
      <Button as="input" type="submit" value="Submit" />
      </Form>
      {shipData && shipData.length > 0 && ( 
            <Row className="mt-4">
                {shipData.map((data:any) => (
                    <Col key={data.uid} xs={12} sm={6} md={4} lg={3} className="mb-3">
                        <ShipCard ship={data}/>
                    </Col>
                )) }
            </Row>
            )}
    </Container>
  )
}

export default ShipSearch