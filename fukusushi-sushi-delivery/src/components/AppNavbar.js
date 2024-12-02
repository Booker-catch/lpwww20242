import { useCart } from './AppContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaCartShopping, FaUserLarge } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
// import "./styles.css"; 
import ListGroup from 'react-bootstrap/ListGroup';
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { Col, Row } from 'react-bootstrap';

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

  const [showdely, setDely] = useState(false)
  const handleDelyClose = () => setDely(false);
  const handleDelyOpen = () => setDely(true);
  
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpUserName, setSignUpUserName] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  const [signUpContactNumber, setSignUpContactNumber] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loginId, setLoginId] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginUserName, setLoginUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('authToken'));
    if (storedUser) {
      setUserData(storedUser.userName);
      setIsLoggedIn(true);
      setShow(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    alert("Sesión cerrada");
    setIsLoggedIn(false);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setSignUpConfirmPassword(confirmPassword);
  
    if (signUpPassword !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden.");
    } else {
      setPasswordError(""); // No hay error
    }
  };
  
  const handleLogin = () => {
    if (!loginEmail || !loginPassword) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const loginRequestBody = {
      query: `
      query UsersByEmail($email: String!) {
        UsersByEmail(email: $email) {
          id
          email
          userName
          password
        }
      }
      `,
      variables: {  
        "id": loginId,
        "email": loginEmail,
        "userName": loginUserName,
        "password": loginPassword,
      },
    };
    
    // Fetch UserByEmail (Login)
    fetch(ENDPOINT, {
      method: "POST",
      body: JSON.stringify(loginRequestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          console.error("Error:", data.errors[0].message);
        }
        if (data && data.data && data.data.UsersByEmail) {
          if (data.data.UsersByEmail.password !== loginPassword) {
            alert("La contraseña es incorrecta");
          }
          if (data.data.UsersByEmail.password === loginPassword) {
            const userInfo = { id: data.data.UsersByEmail.id, userName: data.data.UsersByEmail.userName, };
            localStorage.setItem('authToken', JSON.stringify(userInfo));
            setUserData(userInfo.userName);
            setIsLoggedIn(true);
            setShow(false); // Cierra el modal de login
            alert("Inicio de sesión exitoso");
          }
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });

  };

  const handleRegister = () => {
    console.log(signUpEmail, signUpUserName, signUpPassword, signUpConfirmPassword, signUpContactNumber);
    if (!signUpEmail || !signUpUserName || !signUpPassword || !signUpConfirmPassword || !signUpContactNumber) {
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
        mutation AddUser($email: String!, $userName: String!, $password: String!, $contactNumber: String!) {
          addUser(email: $email, userName: $userName password: $password, contactNumber: $contactNumber) {
            id
            email
            userName
            password
            contactNumber
          }
        }
      `,
      variables: {  
        "email": signUpEmail,
        "userName": signUpUserName,
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
          alert("Registro completado");
          cambioRegistro();
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });

  };


  function cambioRegistro(){
    
    if (show && !showsign){
      handleClose();
      handleSignOpen();
    }
    if (!show && showsign){
      handleShow();
      handleSignClose();
    }
  }

  function carro_a_dely(){
    if (showcart && !showdely){
      handleCartClose();
      handleDelyOpen();
    }
    if (!showcart && showdely){
      handleCartOpen();
      handleDelyClose();
    }

  }
  return (
    <>
      <Navbar className="bg-nav-bg" collapseOnSelect expand='lg'>
        <Container>
      
        {/* Botones de la izquierda */}
        <Navbar.Brand as={Link} to="/">
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
          <Nav className="me-auto text-center lg:text-left">
            <Nav.Link as={Link} to="/">
                Menú
            </Nav.Link>
            <Nav.Link as={Link} to="/pedidos">
                Tus Pedidos
            </Nav.Link>
          </Nav>

          {/* Botones de la derecha */}
          <div className="d-flex mt-2 align-items-center justify-center lg:justify-start gap-2"> 

            {isLoggedIn ? <h5>{userData}</h5> : null}
            {/* Boton del carrito */}
            <Button
              className="bg-btn-green hover:bg-btn-green-hover p-3 rounded-none border-0"
              onClick={handleCartOpen}
            >
              <FaCartShopping className="text-2xl" />
            </Button>
            
            {/* Boton del login */}
            {!isLoggedIn ? (
              <Button
                className="bg-btn-grey hover:bg-btn-grey-hover p-3 rounded-none border-0"
                onClick={handleShow}
              >
                <FaUserLarge className="text-2xl" />
              </Button>
            ) : (
              <Dropdown>
                <Dropdown.Toggle
                  className="bg-blue-500 hover:bg-blue-700 p-3 rounded-none border-0 d-flex align-items-center justify-content-center"
                  id="dropdown-basic"
                  style={{ boxShadow: "none", border: "none"}} // Ajustes aquí
                >
                  <FaUserLarge className="text-2xl" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/pedidos">
                    Mis pedidos
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}

          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    {/* Modal de inicio de sesión */}
    <Modal show={show && !isLoggedIn} onHide={() => setShow(false)} size="lg" centered>
      <Modal.Header className='bg-nav-bg' closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-nav-bg'>
        <Form>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa tu correo electrónico"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className='bg-nav-bg'>
        {/* <Button variant="secondary" onClick={() => setShow(false)}>
          Cerrar
        </Button> */}
        <Button variant="secondary" onClick={cambioRegistro}>
            Registrarse
          </Button>
        <Button className='bg-footer-bg hover:bg-stone-700 border-footer-bg' onClick={handleLogin}>
          Iniciar sesión
        </Button>
      </Modal.Footer>
    </Modal>
    
    {/* Modal de registro */}
    <Modal show={showsign} onHide={handleSignClose} size="lg" centered>
        <Modal.Header className='bg-nav-bg' closeButton>
          <Modal.Title>Registrarse</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-nav-bg'>
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

            <Form.Group className="mb-3" controlId="formUserName">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control
                type="userName"
                placeholder="Ingresa tu correo electrónico"
                value={signUpUserName}
                onChange={(e) => setSignUpUserName(e.target.value)}
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
        <Modal.Footer className='bg-nav-bg'>
          <Button variant="secondary" onClick={cambioRegistro}>
            Cerrar
          </Button>
          <Button className='bg-footer-bg hover:bg-stone-700 border-footer-bg' onClick={handleRegister}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>


      {/* Modal Carro */}
      <Modal show={showcart} onHide={handleCartClose} size="lg" centered>
      <Modal.Header className='bg-nav-bg' closeButton>
        <Modal.Title>Carro</Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-nav-bg'>
        <ListGroup>
          {cartItems.map((item) => (
            <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
              <Row className='w-full'>
                <Col>{item.name} (${item.price})</Col>
                <Col className='flex justify-center'>${item.quantity * item.price}</Col>
                <Col className='flex justify-center'>{item.quantity}</Col>
              <Col className='flex justify-end'>
                <Button
                  
                  size="sm"
                  onClick={() => updateQuantity(item.id, 1)}
                  className="me-2 text-lg bg-btn-grey hover:bg-btn-grey-hover border-0"
                  >
                  <FaPlus />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => updateQuantity(item.id, -1)}
                  className='text-lg'
                  >
                  <FaMinus />
                </Button>
              </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="mt-3">
          <strong>Total: ${totalPrice}</strong>
        </div>
      </Modal.Body>
      <Modal.Footer className='bg-nav-bg'>
        <Button variant="outline-dark" onClick={handleCartClose}>
          Seguir comprando
        </Button>
        <Button className='bg-footer-bg hover:bg-stone-700 border-footer-bg' disabled={cartItems.length === 0}>
          Retiro en tienda
        </Button>
        <Button className='bg-footer-bg hover:bg-stone-700 border-footer-bg' onClick={ carro_a_dely }  disabled={cartItems.length === 0}>
          Pedido a domicilio
        </Button>
      </Modal.Footer>
    </Modal>
    {/* Modal pedido a domicilio */}
    <Modal show={showdely} onHide={() => setDely(false)} size="lg" centered>
      <Modal.Header className='bg-nav-bg' closeButton>
        <Modal.Title>Pedido a domicilio</Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-nav-bg'>
      <Form>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="email"
                placeholder="Irarrazaval 4112"
                
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUserName">
              <Form.Label>Departamento/Numero</Form.Label>
              <Form.Control
                type="userName"
                placeholder="123"
                
              />
            </Form.Group>


            <Form.Group className="mb-3" controlId="formUserName">
              <Form.Label>Instrucciones especiales</Form.Label>
              <Form.Control
                type="userName"
                placeholder="No pepinillos"
                
              />
            </Form.Group>




            
          </Form>
      </Modal.Body>
      <Modal.Footer className='bg-nav-bg'>
        {/* <Button variant="secondary" onClick={() => setShow(false)}>
          Cerrar
        </Button> */}
        <Button variant="secondary" onClick={ carro_a_dely }>
            Atrás
          </Button>
        <Button className='bg-footer-bg hover:bg-stone-700 border-footer-bg' >
          Confirmar pedido
        </Button>
      </Modal.Footer>
    </Modal>

    </>
  );
}

export default AppNavbar;