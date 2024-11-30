import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaCartShopping, FaUserLarge } from "react-icons/fa6";

function AppNavbar() {
  return (
    <>
      <Navbar className="bg-[#fbfbf3] custom-nav-bg" collapseOnSelect expand='lg'>
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
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/pedidos" className="no-underline text-black">
                  Pedidos
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
              <Button variant="success" className='custom-success-btn'><FaCartShopping /></Button>
              <Button variant="secondary" className='custom-secondary-btn'><FaUserLarge /></Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AppNavbar;