import React from 'react'
import { nonUserShip, FavoriteShip } from '../../interfaces/Ship'
import { Container } from 'react-bootstrap'
import './ClassCard.css'; // Import the new CSS file

const ClassCard = ({ships}:{ships:nonUserShip[] | FavoriteShip[]}) => {
    return (
        <div>
            <Container className='class-card-container'> 
                {ships.map((ship)=>(
                    <div className='class-card-ship-item'>
                        <span className="fw-bold class-card-ship-name">{ship.properties.name}</span> 
                        {' - '} 
                        <span className="class-card-ship-quantity">{ship.quantity}</span>
                    </div>
                    
                ))}
            </Container>
        </div>
    )
}

export default ClassCard