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
  const [signUpUserName, setSignUpUserName] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  const [signUpContactNumber, setSignUpContactNumber] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginUserName, setLoginUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const user = token; // Decodifica el token para obtener los datos del usuario
      setUserData(user);
      setIsLoggedIn(true);
      setShow(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
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
          email
          userName
          password
        }
      }
      `,
      variables: {  
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
            localStorage.setItem("authToken", data.data.UsersByEmail.userName);
            setUserData(data.data.UsersByEmail.userName);
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
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
                Menú
            </Nav.Link>
            <Nav.Link as={Link} to="/pedidos">
                Tus Pedidos
            </Nav.Link>
          </Nav>

          {/* Botones de la derecha */}
          <div className="d-flex align-items-center gap-2"> 

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
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Cerrar
        </Button>
        <Button variant="secondary" onClick={cambioRegistro}>
            Registrarse
          </Button>
        <Button variant="primary" onClick={handleLogin}>
          Iniciar sesión
        </Button>
      </Modal.Footer>
    </Modal>
    
    {/* Modal de registro */}
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
        <Modal.Footer>
          <Button variant="secondary" onClick={cambioRegistro}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleRegister}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>



      <Modal show={showcart} onHide={handleCartClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Carrito</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {cartItems.map((item) => (
            <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
              <span>
                {item.name} ${item.price} x {item.quantity} = ${item.quantity * item.price}
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