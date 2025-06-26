import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";

interface ShipQuantityProps {
    count: number; 
    setCount: React.Dispatch<React.SetStateAction<number>>;
}

const ShipQuantity = ({ count, setCount }: ShipQuantityProps) => {
    
      function incrementCount() {
        count = count + 1;
        setCount(count);
      }
      function decrementCount() {
        count = count - 1;
        setCount(count);
      }
      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const newCount = parseInt(value, 10); 
        if (!isNaN(newCount) && newCount >= 0) {
            setCount(newCount);
        } else if (value === '') {
            setCount(0); 
        }
    }   
    return (
        <div className="d-flex align-items-center justify-content-center flex-nowrap">
        <Button variant="outline-secondary" size="sm" onClick={decrementCount}>-</Button>
        <Form.Control
                size="sm"
                type="number"
                placeholder="Quantity"
                value={count}
                onChange={handleInputChange} 
                className="mx-1 text-center" 
                style={{ width: '60px' }} 
        />
        <Button variant="outline-secondary" size="sm" onClick={incrementCount}>+</Button>
        </div>
    );
}


export default ShipQuantity