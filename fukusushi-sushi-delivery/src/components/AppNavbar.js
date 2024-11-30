import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { FaCartShopping, FaUserLarge } from "react-icons/fa6";

function AppNavbar() {
  return (
    <>
      <Navbar className="custom-nav-bg" collapseOnSelect expand='lg'>
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
            <Nav className="me-auto">
              <Nav.Link href="#home">Carta</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <div>
              <Button variant="success" className='custom-success-btn p-3'><FaCartShopping className='text-2xl' /></Button>
              <Button variant="secondary" className='custom-secondary-btn p-3'><FaUserLarge className='text-2xl'/></Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AppNavbar;