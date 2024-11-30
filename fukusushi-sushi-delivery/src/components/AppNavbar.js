import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaCartShopping, FaUserLarge } from "react-icons/fa6";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "./styles.css"; 











function AppNavbar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Navbar className="bg-nav-bg" collapseOnSelect expand='lg'>
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="fukusuke-logo2.png"
              width="120"
              height="100"
              className="d-inline-block align-top"
              alt="logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className=" me-auto">
              <Nav.Link>
                <Link to="/" className="no-underline text-black">
                  Menú
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/pedidos" className="no-underline text-black">
                  Tus Pedidos
                </Link>
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/" className="no-underline text-black">
                    Action
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/" className="no-underline text-black">
                    Another action
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/" className="no-underline text-black">
                    Something
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to="/" className="no-underline text-black">
                    Separated link
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <div>
              <Button className='bg-btn-green hover:bg-btn-green-hover p-3 rounded-none border-0'><FaCartShopping className='text-2xl' /></Button>
              <Button className='bg-btn-grey hover:bg-btn-grey-hover p-3 rounded-none border-0' onClick={handleShow}><FaUserLarge className='text-2xl'/></Button>
            </div>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body  >
          <Form>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control type="email" placeholder="Ingresa tu correo eléctrónico" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Ingresa tu contraseña" />
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center">
              <Form.Check type="checkbox" label="Recuerda mi sesión" />
              <a href="#forgot-password" className="text-primary">
                Se te olvido tu contraseña?
              </a>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary">
            Iniciar sesión
          </Button>
        </Modal.Footer>
      </Modal>
      
      
     
    </>
  );
}

export default AppNavbar;