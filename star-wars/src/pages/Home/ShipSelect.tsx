import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ShipCard from './ShipCard';
import { FavoriteShip, nonUserShip } from '../../interfaces/Ship';
import { Button, Offcanvas, Container, Row, Col, Spinner } from 'react-bootstrap';
import { Rocket, XIcon, FilterIcon } from 'lucide-react';
import './ShipSelect.css';

const ShipSelect = ({
  addToFleet,
  userShips,
  ready,
  onClose,
  isOpen
}: {
  addToFleet: any;
  userShips: nonUserShip[] | FavoriteShip[];
  ready: boolean;
  onClose:()=>void;
  isOpen:boolean;
}) => {
  const [ships, setShips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterClass, setFilterClass] = useState<string | null>('Starfighter');

  async function getShips() {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://starwars-backend-z23b.onrender.com/availableships'
      );
      setShips(response.data);
    } catch (error) {
      console.error('Failed to fetch ships:', error);
    } finally {
      setLoading(false);
    }
  }
  

  useEffect(() => {
    getShips();
  }, []);

  let filteredIndex = 0;
  const filteredShips = ships.filter((ship) => {
    if (filterClass && ship.class !== filterClass) {
      return false;
    }
    return true;
  });
  if(filteredShips.length > 0){
    if(filteredShips[0].class === "Capital"){
      filteredIndex = 8;
    } else if(filteredShips[0].class === "Starfighter"){
      filteredIndex = 0;
    } else {
      filteredIndex = 4
    }
  }
  
  const shipClasses = Array.from(new Set(ships.map((ship) => ship.class)));

  return (
    <>
      
      <Offcanvas
        show={isOpen}
        onHide={onClose}
        className="ship-select-drawer"
        backdrop={true}
        scroll={false}
      >
        <Offcanvas.Header closeButton={false} className="drawer-header">
          <Offcanvas.Title className="drawer-title">
            <Rocket className="me-2" size={24} />
            Ship Selection
          </Offcanvas.Title>
          <Button
            onClick={onClose}
            className="close-button"
            aria-label="Close ship selection"
          >
            <XIcon size={24} />
          </Button>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0 flex-column d-flex">
          <div className="filter-container">
            <div className="d-flex align-items-center mb-2">
              <FilterIcon size={16} className="filter-icon me-2" />
              <span className="filter-label">Select From Class</span>
            </div>
            <div className="d-flex flex-wrap gap-2">
              {shipClasses.map((classType) => (
                <Button
                  key={classType}
                  onClick={() => setFilterClass(classType)}
                  className={`filter-btn ${filterClass === classType ? 'filter-btn-active' : ''}`}
                >
                  {classType}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex-grow-1 overflow-auto custom-scrollbar p-4">
            {loading ? (
              <div className="h-100 d-flex flex-column align-items-center justify-content-center text-blue-300">
                <Spinner animation="border" role="status" className="mb-2" />
                <p>Loading ships from across the galaxy...</p>
              </div>
            ) : filteredShips.length > 0 ? (
              <Container>
                <Row xs={2} sm={2} md={2} lg={2} className="g-4">
                  {filteredShips.map((ship: nonUserShip, index: number) => (
                    <Col key={index}>
                      <ShipCard
                        index={index}
                        userShips={userShips}
                        addToFleet={addToFleet}
                        ship={ship}
                        filteredIndex={filteredIndex}
                      />
                    </Col>
                  ))}
                </Row>
              </Container>
            ) : (
              <div className="h-100 d-flex align-items-center justify-content-center text-blue-300">
                <p>No ships match your filter criteria.</p>
              </div>
            )}
          </div>
          <div className="drawer-footer">
            <Button
              variant="primary"
              className="w-100"
              onClick={onClose}
            >
              Done
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
export default ShipSelect;