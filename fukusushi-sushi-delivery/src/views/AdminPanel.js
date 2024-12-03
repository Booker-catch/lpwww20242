import {Container, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AdminPanel() {
  return(
    <>
      <Container className='flex justify-center align-items-center flex-col'>
        <Button 
          className='w-9/12 mt-8 bg-footer-bg hover:bg-stone-700 border-footer-bg'
          as={Link}
          to="/productos">
            Productos y Categorías
        </Button>
        <Button 
          className='w-9/12 mt-8 bg-footer-bg hover:bg-stone-700 border-footer-bg'
          as={Link}
          to="/">
            Usuarios
        </Button>
        <Button 
          className='w-9/12 mt-8 bg-footer-bg hover:bg-stone-700 border-footer-bg'
          as={Link}
          to="/">
            Clientes
        </Button>
        <Button 
          className='w-9/12 mt-10 bg-footer-bg hover:bg-stone-700 border-footer-bg'
          as={Link}
          to="/reportes">
            Reportes
        </Button>
        <Button 
          className='w-9/12 mt-8 bg-footer-bg hover:bg-stone-700 border-footer-bg'
          as={Link}
          to="/sensor">
              Sensores Local
        </Button>
      </Container>
    </>
  )
}

export default AdminPanel;