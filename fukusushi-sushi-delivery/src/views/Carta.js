import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa";

function Carta() {
    return (
      <div className='bg-primary-color'>
        <Container className='py-5'>
          <Tab.Container id="carta" defaultActiveKey="#cat1">
            <Row>
              <Col sm={3}>
                <ListGroup variant="flush" className='p-2.5 bg-dark-grey'>
                  <ListGroup.Item action href='#cat1' className='bg-dark-grey hover:bg-dark-grey-hover text-white'>
                    Categoria 1
                  </ListGroup.Item>
                  <ListGroup.Item action href='#cat2' className='bg-dark-grey hover:bg-dark-grey-hover text-white'>
                    Categoria 2
                  </ListGroup.Item>
                  <ListGroup.Item action href='#cat3' className='bg-dark-grey hover:bg-dark-grey-hover text-white'>
                    Categoria 3
                  </ListGroup.Item>
                  <ListGroup.Item action href='#cat4' className='bg-dark-grey hover:bg-dark-grey-hover text-white'>
                    Categoria 4
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col>
                <Tab.Content className='text-white'>
                  <Tab.Pane eventKey="#cat1">
                    <Row xs={1} md={3} className="g-4">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Col key={idx} className='flex justify-center'>
                          <Card className='bg-dark-grey max-w-60 text-white'>
                            <Card.Img variant="top" src="gyosas.jpg" />
                            <Card.Body>
                              <Card.Title>Gyosas Premium Pollo Teriyaki</Card.Title>
                              <Card.Text>
                                5 Bocados
                              </Card.Text>
                              <div className='flex w-full justify-center'>
                                <Button className='bg-btn-green hover:bg-btn-green-hover border-0'>+ $4.990</Button>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="#cat2">Elementos categoria 2</Tab.Pane>
                  <Tab.Pane eventKey="#cat3">Elementos categoria 3</Tab.Pane>
                  <Tab.Pane eventKey="#cat4">Elementos categoria 4</Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </div>
    );
}

export default Carta;