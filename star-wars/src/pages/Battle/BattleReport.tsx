import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const BattleReport = ({ text, winner, reset,loggedIn }:{text:string, winner:string, reset:any, loggedIn:boolean}) => {
  
  function handleReset(){
   // e.preventDefault();
    reset()
  }

  return (
<Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <h1>{winner}</h1>
        <Col md={10} lg={8}>
          <Card className="shadow-lg border-0 bg-light">
            <Card.Header as="h3" className="text-center bg-primary text-white py-3">
              Gemini-Generated Battle Report
            </Card.Header>
            <Card.Body className="p-4">
              <Card.Text className="text-dark line-height-report">
                {text.split('\n\n').map((paragraph, index) => (
                  <p key={index} className={index < text.split('\n\n').length - 1 ? 'mb-3' : ''}>
                    {paragraph}
                  </p>
                ))}
              </Card.Text>
              {loggedIn? (
                <Card.Footer className="text-muted border-0 bg-light pt-3 d-flex justify-content-center align-items-center">
                <Button  size="lg" onClick={handleReset} className="me-2">
                    Play Again!
                  </Button>
                </Card.Footer>
              ): (
                <Card.Footer className="text-muted border-0 bg-light pt-3 d-flex justify-content-between align-items-center">
                <Button  size="lg" onClick={handleReset} className="me-2">
                    Play Again!
                  </Button>
                  <Button variant="outline-primary" size="lg">
                  <a style={{textDecoration:'none'}} href='/register'>Want More? Sign Up & Unlock Levels!</a>
                  </Button>
                </Card.Footer>
              )}
              
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BattleReport;