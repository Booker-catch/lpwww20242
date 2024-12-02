import {Container, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AdminPanel() {
  return(
    <>
      <Container className='flex justify-center align-items-center flex-col'>
        <Button 
          className='w-9/12 mt-10 bg-footer-bg hover:bg-stone-700 border-footer-bg'>
            Productos y Categorías
        </Button>
        <Button 
          className='w-9/12 mt-10 bg-footer-bg hover:bg-stone-700 border-footer-bg'>
            Usuarios
        </Button>
        <Button 
          className='w-9/12 mt-10 bg-footer-bg hover:bg-stone-700 border-footer-bg'>
            Clientes
        </Button>
        <Button 
          className='w-9/12 mt-10 bg-footer-bg hover:bg-stone-700 border-footer-bg'>
            Reportes
        </Button>
        <Button 
          className='w-9/12 mt-10 bg-footer-bg hover:bg-stone-700 border-footer-bg'
          as={Link}
          to="/sensor">
              Sensores
        </Button>
      </Container>
    </>
  )
}

export default AdminPanel;