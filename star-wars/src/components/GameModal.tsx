import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ListGroup } from 'react-bootstrap';
import './GameModal.css';

function GameModal() {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="info-modal-content"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Battle Mode Tutorial</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="mb-3 text-center">How to Play</h5>
          <ListGroup variant="flush">
            <ListGroup.Item className='text-center'>
              <span role="img" aria-label="user-turn-icon"></span> Your Turn: Click one of your classes, then select an enemy class to attack.
            </ListGroup.Item>
            <ListGroup.Item className='text-center'>
              <span role="img" aria-label="enemy-turn-icon"></span> Enemy's Turn: After your attack, the enemy will retaliate, choosing one of their own classes to attack one of yours.
            </ListGroup.Item>
            <ListGroup.Item className='text-center'>
              <span role="img" aria-label="who-wins-icon"></span> Who Wins?: The battle continues until one side's fleet is completely destroyed.
            </ListGroup.Item>
          </ListGroup>

          <h5 className="mb-3 text-center mt-4">Different Classes</h5>
          <ListGroup variant="flush">
            <ListGroup.Item className='text-center'>
              <span role="img" aria-label="starfighter-icon"></span> Starfighters: Strong against bombers, but weak against capital ships.
            </ListGroup.Item>
            <ListGroup.Item className='text-center'>
              <span role="img" aria-label="bomber-icon"></span> Bombers: Ideal for attacking capital ships, but vulnerable to starfighters.
            </ListGroup.Item>
            <ListGroup.Item className='text-center'>
              <span role="img" aria-label="capital-ship-icon"></span> Capital Ships: The heavy hitters of your fleet. Strong against starfighters.
            </ListGroup.Item>
          </ListGroup>

        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          <Button variant="primary" onClick={handleClose}>Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GameModal;