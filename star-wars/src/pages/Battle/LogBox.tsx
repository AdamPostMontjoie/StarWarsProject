import React from 'react'
import {Card, ListGroup} from 'react-bootstrap'

const LogBox = ({battleLog}: {battleLog:string[]}) => {
  return (
    <div>
        <Card style={{ width: '18rem' }}>
        <Card.Header>Featured</Card.Header>
        <ListGroup variant="flush">
            {battleLog.map((log) =>(
                <ListGroup.Item>{log}</ListGroup.Item>
            ))}
        </ListGroup>
        </Card>
    </div>
  )
}

export default LogBox