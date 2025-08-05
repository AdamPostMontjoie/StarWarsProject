import React from 'react';
import './ShipCard.css';
import { Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

interface ShipQuantityProps {
    count: number;
    setCount: (count: number) => void;
}

const ShipQuantity = ({ count, setCount }: ShipQuantityProps) => {
    const MIN_QUANTITY = 0;
    const MAX_QUANTITY = 100;
    
    function incrementCount() {
        if (count < MAX_QUANTITY) {
            setCount(count + 1);
        }
    }
    function decrementCount() {
        if (count > MIN_QUANTITY) {
            setCount(count - 1);
        }
    }

    return (
        <div className="styled-ship-quantity">
            <Button onClick={decrementCount}>
                <Icon.Dash size={100} />
            </Button>
            <div className="styled-quantity-display">
                {count}
            </div>
            <Button onClick={incrementCount}>
                <Icon.Plus size={20} />
            </Button>
        </div>
    );
};

export default ShipQuantity;