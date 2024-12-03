import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const ENDPOINT = "http://localhost:4000"

const GET_USERS = `
  query Users {
    Users {
      id
      userName
      email
      contactNumber
    }
  }
`

export default function PedidosView() {
  const [userId, setUserId] = useState(false)
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [adminUsers, setAdminUsers] = useState([])

  const [showsign, setSign] = useState(false)
  const handleSignClose = () => setSign(false)
  const handleSignOpen = () => setSign(true)

  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpUserName, setSignUpUserName] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  const [signUpContactNumber, setSignUpContactNumber] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('authToken') || '{}')
    if (storedUser) {
      setUserData(storedUser.userName)
      setUserId(storedUser.id)
    }
  }, [])


  const fetchUsers = async () => {
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        body: JSON.stringify({ query: GET_USERS }),
        headers: { "Content-Type": "application/json" },
      })
      const data = await response.json()
      if (data.errors) {
        setError(data.errors[0].message)
      } else {
        setAdminUsers(data.data.Users || [])
      }
    } catch (error) {
      setError('Error fetching data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [userId])

  const handleDelete = (adminUserDeleted) => {
    // Confirmar antes de eliminar
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (!confirmDelete) return;
  
    // Configurar el body de la petición
    const deleteUserBody = {
      query: `
        mutation DeleteUser($deleteUserId: ID!) {
        deleteUser(id: $deleteUserId)
        }
      `,
      variables: {
        "deleteUserId": adminUserDeleted,
      },
    };
  
    // Realizar la solicitud para borrar la orden
    fetch(ENDPOINT, {
      method: "POST",
      body: JSON.stringify(deleteUserBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          // console.error("Error:", data.errors[0].message);
          // alert("Hubo un error al cancelar la orden.");
        } else {
          alert("Usuario eliminado exitosamente");
          // window.location.reload(); // Recargar la página o actualizar el estado según sea necesario
          fetchUsers();
        }
      })
  }

  const handleAdd = () => {
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
          handleSignClose();
          // Actualizar la lista de usuarios
          fetchUsers(); // Llama a la función fetchUsers para obtener la lista actualizada.
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  const handleConfirmPasswordChange = (e) => {
    setSignUpConfirmPassword(e.target.value);
    if (e.target.value !== signUpPassword) {
      setPasswordError("Las contraseñas no coinciden");
    } else {
      setPasswordError("");
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title mb-0">Usuarios en el sistema</h5>
                  <h6 className="card-subtitle text-muted">Cargando usuarios...</h6>
                </div>
                <button className="btn btn-success bg-btn-green hover:bg-btn-green-hover" disabled>Agregar</button>
              </div>
              <div className="card-body">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="d-flex align-items-center mb-3">
                    <div className="spinner-grow spinner-grow-sm me-3" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div>
                      <div className="placeholder-glow">
                        <span className="placeholder col-7"></span>
                      </div>
                      <div className="placeholder-glow">
                        <span className="placeholder col-4"></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Error</h5>
              </div>
              <div className="card-body">
                <p className="card-text text-danger">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mt-4">
      <Button 
          variant="link" 
          className=' text-white align-self-end'
          as={Link}
          to="/admin"
          >
            Volver
      </Button>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <div>
                <h5 className="card-title mb-0">Usuarios en el sistema</h5>
                <h6 className="card-subtitle text-muted">Lista de usuarios registrados</h6>
              </div>
              <button className="btn btn-success bg-btn-green hover:bg-btn-green-hover" onClick={handleSignOpen}>Agregar</button>
            </div>
            <div className="card-body">
              {adminUsers.length === 0 ? (
                <p className="card-text text-muted fst-italic">No hay usuarios registrados</p>
              ) : (
                <ul className="list-group list-group-flush">
                  {adminUsers.map((user, index) => (
                    <li key={index} className="list-group-item">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '48px', height: '48px'}}>
                              {user.userName.charAt(0).toUpperCase()}
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6 className="mb-0">{user.userName}</h6>
                            <p className="mb-0 text-muted small">{user.email}</p>
                            <p className="mb-0 small">Contacto: {user.contactNumber}</p>
                          </div>
                        </div>
                        <div>
                          <button 
                            className="btn btn-sm btn-danger me-2" 
                            onClick={() => handleDelete(user.id)}
                            aria-label={`Eliminar ${user.userName}`}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

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
                type="text"
                placeholder="Ingresa tu nombre de usuario"
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

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Repetir Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repite tu contraseña"
                value={signUpConfirmPassword}
                onChange={handleConfirmPasswordChange}
                isInvalid={!!passwordError}
              />
              <Form.Control.Feedback type="invalid">
                {passwordError}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formContactNumber">
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
          <Button variant="secondary" onClick={handleSignClose}>
            Cerrar
          </Button>
          <Button className='bg-footer-bg hover:bg-stone-700 border-footer-bg' onClick={handleAdd}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

