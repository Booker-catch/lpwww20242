import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from 'react-bootstrap/Tab';

function Carta() {
    return (
      <div className='bg-primary-color'>
        <Container className='py-5'>
          <Tab.Container id="carta" defaultActiveKey="#cat1">
            <Row>
              <Col sm={3}>
                <ListGroup>
                  <ListGroup.Item action href='#cat1'>
                    Categoria 1
                  </ListGroup.Item>
                  <ListGroup.Item action href='#cat2'>
                    Categoria 2
                  </ListGroup.Item>
                  <ListGroup.Item action href='#cat3'>
                    Categoria 3
                  </ListGroup.Item>
                  <ListGroup.Item action href='#cat4'>
                    Categoria 4
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col>
                <Tab.Content>
                  <Tab.Pane eventKey="#cat1">Elementos categoria 1</Tab.Pane>
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