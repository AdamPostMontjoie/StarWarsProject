import React from 'react'
import { nonUserShip, FavoriteShip } from '../../interfaces/Ship'
import { Container } from 'react-bootstrap'

const ClassCard = ({ships}:{ships:nonUserShip[] | FavoriteShip[]}) => {
    return (
        <div>
            <Container className='border border-info'>
                {ships.map((ship)=>(
                    <div>
                        <span className="fw-bold">{ship.properties.name}</span> 
                        {' - '} 
                        <span className="text-muted small">{ship.quantity}</span>
                    </div>
                    
                ))}
                
            </Container>
        </div>
    )
}

export default ClassCard