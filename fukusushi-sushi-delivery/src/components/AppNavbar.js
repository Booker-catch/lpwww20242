import { useCart } from './AppContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaCartShopping, FaUserLarge } from "react-icons/fa6";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "./styles.css"; 
import ListGroup from 'react-bootstrap/ListGroup';

const ENDPOINT = "http://localhost:4000";





function AppNavbar() {
  const [show, setShow] = useState(false);
  const [showsign, setSign] = useState(false)
  const handleSignClose = () => setSign(false)
  const handleSignOpen = () => setSign(true)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [showcart, setCart] = useState(false);
  const {cartItems, setCartItems, updateQuantity, totalPrice} = useCart();
  const handleCartClose = () => setCart(false);
  const handleCartOpen = () => setCart(true);
  
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  const [signUpContactNumber, setSignUpContactNumber] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setSignUpConfirmPassword(confirmPassword);
  
    if (signUpPassword !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden.");
    } else {
      setPasswordError(""); // No hay error
    }
  };
  

  const handleRegister = () => {
    console.log(signUpEmail, signUpPassword, signUpConfirmPassword, signUpContactNumber);
    if (!signUpEmail || !signUpPassword || !signUpConfirmPassword || !signUpContactNumber) {
      alert("Por favor, completa todos los campos.");
      return;
    }
  
    if (signUpPassword !== signUpConfirmPassword) {
      alert("Las contraseñas no coinciden.");
      setPasswordError("Las contraseñas no coinciden.");
      return;
    }
  
    const signUpRequestBody = {
      query: `
        mutation AddUser($email: String!, $password: String!, $contactNumber: String!) {
          addUser(email: $email, password: $password, contactNumber: $contactNumber) {
            id
            email
            password
            contactNumber
          }
        }
      `,
      variables: {  
        "email": signUpEmail,
        "password": signUpPassword,
        "contactNumber": signUpContactNumber
      },
    };
    
    // Fetch addUser (signUp)
    fetch(ENDPOINT, {
      method: "POST",
      body: JSON.stringify(signUpRequestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          console.error("Error:", data.errors[0].message);
        }
        if (data && data.data && data.data.addUser) {
          console.log(data.data.addUser);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });

  };
  

  // const [cartItems, setCartItems] = useState([
  //   { id: 1, name: 'Amongus', quantity: 2 , price : 1000},
  //   { id: 2, name: 'Zabloingsus', quantity: 5, price : 1000 },
  //   { id: 3, name: 'Penembus', quantity: 1,price : 1000 },
  //   { id: 4, name: 'asdsa', quantity: 1, price : 1000 },
  //   { id: 5, name: 'Youl fone ringing', quantity: 10 ,  price : 1000},
  // ]);

  // Función para agregar productos al carrito
  // const addToCart = (product) => {
  //   setCartItems((prevItems) => {
  //     const existingProduct = prevItems.find(item => item.id === product.id);
  //     if (existingProduct) {
  //       // Si el producto ya está en el carrito, solo aumentamos la cantidad
  //       return prevItems.map(item =>
  //         item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
  //       );
  //     } else {
  //       // Si el producto no está en el carrito, lo agregamos
  //       return [...prevItems, { ...product, quantity: 1 }];
  //     }
  //   });
  // };

  // Function to remove an item from the cart
  // const updateQuantity = (id, change) => {
  //   setCartItems((prevItems) =>
  //     prevItems
  //       .map((item) =>
  //         item.id === id ? { ...item, quantity: item.quantity + change } : item
  //       )
  //       .filter((item) => item.quantity > 0) // Remove items with quantity <= 0
  //   );
  // };

  // const totalPrice = cartItems.reduce(
  //   (sum, item) => sum + item.quantity * item.price,
  //   0
  // );


  function cambioRegistro(){
    
    handleClose();
    handleSignOpen();
  }
  return (
    <>
      <Navbar className="bg-nav-bg" collapseOnSelect expand='lg'>
        <Container>
          <Navbar.Brand href="/">
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
              <Button className='bg-btn-green hover:bg-btn-green-hover p-3 rounded-none border-0' onClick={handleCartOpen}><FaCartShopping className='text-2xl' /></Button>
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
          <Button variant="secondary" onClick={cambioRegistro}>
            Registrarse
          </Button>
          <Button variant="primary">
            Iniciar sesión
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showsign} onHide={handleSignClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Registrarse</Modal.Title>
        </Modal.Header>
        <Modal.Body  >
          <Form>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo electrónico"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Repetir Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repite tu contraseña"
                value={signUpConfirmPassword}
                onChange={handleConfirmPasswordChange}
                isInvalid={!!passwordError} // Agrega estilo de error si existe un mensaje
              />
            </Form.Group>


            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Teléfono celular</Form.Label>
              <Form.Control
                type="text"
                placeholder="+56"
                value={signUpContactNumber}
                onChange={(e) => setSignUpContactNumber(e.target.value)}
              />
            </Form.Group>


            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSignClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleRegister}>
            Registrarse
          </Button>
        </Modal.Footer>
      </Modal>



      <Modal show={showcart} onHide={handleCartClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Carrito</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {console.log(cartItems)}
          {cartItems.map((item) => (
            <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
              <span>
                {item.name} x {item.quantity} = ${item.quantity * item.price}
              </span>
              <div>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => updateQuantity(item.id, 1)}
                  className="me-2"
                >
                  +
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  -
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="mt-3">
          <strong>Precio total del pedido: ${totalPrice}</strong>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCartClose}>
          Seguir comprando
        </Button>
        <Button variant="info" disabled={cartItems.length === 0}>
          Retiro en tienda
        </Button>
        <Button variant="success" disabled={cartItems.length === 0}>
          Pedido a domicilio
        </Button>
      </Modal.Footer>
    </Modal>
     
    </>
  );
}

export default AppNavbar;