import React from 'react'
import {Card, ListGroup} from 'react-bootstrap'
import './LogBox.css'; 

const LogBox = ({battleLog}: {battleLog:string[]}) => {
  return (
    <div className="logbox-container">
        <Card className="log-card">
            <Card.Header className="log-card-header">Log</Card.Header>
            <ListGroup variant="flush" className="log-list-group">
                {battleLog.map((log, index) =>(
                    <ListGroup.Item key={index} className="log-list-item">{log}</ListGroup.Item>
                ))}
            </ListGroup>
        </Card>
    </div>
  )
}

export default LogBox