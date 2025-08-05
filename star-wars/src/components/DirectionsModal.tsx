import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DirectionsModal = () => {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    return (
        <div>
            <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="d-flex justify-content-center">
          <Modal.Title className='flex-grow-1 text-center'>How to play</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center lead mb-4">Add ships from store page</p>
          
          <h5 className="mb-3 text-center">Key Intel</h5>
          
        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          <Button variant="primary" onClick={handleClose}>Understood</Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}

export default DirectionsModal