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
            const response = await axios.get(`https://www.swapi.tech/api/starships/?model=${ship}`)
            setShipData(response.data.result)
            console.log(response.data.result)
        }
        catch(err){
            console.error("API Error:",err)
        }
    }
  return (
    <Container className='text-center'>
        <h1>Add Starships To Your Fleet</h1>
        <Container style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Form onSubmit={search}>
            <Form.Group className="mb-3" controlId="formPlayer">
                <Form.Control
                type="input" placeholder="Enter starship model name" 
                onChange={(e) => setShip(e.target.value)}
                />
                <Form.Text>Use model names to search, i.e. "DS-1 Orbital Battle Station" instead of "Death Star"</Form.Text>
            </Form.Group>
            <Button as="input" type="submit" value="Submit" />
      </Form>
      </Container>
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