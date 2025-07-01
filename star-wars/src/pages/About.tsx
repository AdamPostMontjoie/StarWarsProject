import React from 'react';
import TopNav from '../components/TopNav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'; 
import { Image } from 'react-bootstrap';

const About = () => {
  return (
    <div>
      <TopNav />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card>
              <Card.Body>
                <Card.Title as="h1" className="text-center mb-4">
                  About This App
                </Card.Title>
                <a href='https://github.com/AdamPostMontjoie'>
                <div  className="d-flex justify-content-center align-items-center mb-4">
                  <Card.Text className="lead m-0">
                    Built by Adam Post
                  </Card.Text>
                  <Image

                      src="/images/github-mark.png"
                      roundedCircle
                      style={{ width: '20px', height: '20px', marginLeft: '5px' }}
                    />
                </div>
                </a>
                <Card.Text className="d-flex justify-content-center align-items-center mb-4"><a href='https://swapi.tech/'>Powered by  Star Wars API</a></Card.Text>
                <p className="text-center">
                  A Star Wars Fleet Battle Simulator where users can manage fleets, challenge other users, and get AI-generated battle reports.
                </p>
                <h3 className="text-center mt-5 mb-3">Technologies Utilized:</h3>
                <ListGroup variant="flush">
                  <ListGroup.Item className="text-center">
                    <strong>Frontend:</strong> React.js, React Bootstrap
                  </ListGroup.Item>
                  <ListGroup.Item className="text-center">
                    <strong>Backend:</strong> Node.js, Express.js
                  </ListGroup.Item>
                  <ListGroup.Item className="text-center">
                    <strong>Database:</strong> MongoDB
                  </ListGroup.Item>
                  <ListGroup.Item className="text-center">
                    <strong>Authentication:</strong> Firebase
                  </ListGroup.Item>
                  <ListGroup.Item className="text-center">
                    <strong>AI Integration:</strong> Google Gemini AI
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;