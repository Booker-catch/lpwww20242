import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useCart } from '../components/AppContext';

const ENDPOINT = "http://localhost:4000";

const GET_PRODUCTS_BY_CATEGORY = `
  query ProductsByCategory($category: String!) {
    ProductsByCategory(category: $category) {
      id
      name
      price
      description
      imageUrl
    }
  }`

function Carta() {
  const { addToCart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState("Promociones");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  const categories = [
    'Promociones', 'Hand Rolls', 'Hosomaki y Gyosas', 
    'Sashimi', 'Niguiri', 'Chirasi', 'Yakimeshi', 
    'Yakisoba', 'Extras', 'Para compartir', 'Líquidos'
  ]

  useEffect(() => {

    const fetchProductsBody = {
      query: GET_PRODUCTS_BY_CATEGORY,
      variables: {  
        "category": selectedCategory,
      },
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch(ENDPOINT, {
          method: "POST",
          body: JSON.stringify(fetchProductsBody),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.errors) {
          setError(data.errors[0].message);
        } else {
          setProducts(data.data.ProductsByCategory || []); // revisar campo
        }
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false)
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  if (loading) {
    return <div>Loading...</div>;  // Puedes mostrar algo mientras se cargan los productos
  }

  if (error) {
    return <div>Error: {error}</div>;  // Muestra un mensaje de error si ocurre un problema
  }


  return (
    <div className='bg-primary-color'>
      <Container className='py-5'>
        <Tab.Container id="carta" defaultActiveKey="#promociones">
          <Row>
            <Col sm={4} lg={3}>
              <ListGroup variant="flush" className='p-2.5 bg-dark-grey'>
                {categories.map((category) => (
                  <ListGroup.Item
                    key={category}
                    action
                    href={`#${category.toLowerCase().replace(" ", "")}`}
                    className='bg-dark-grey hover:bg-dark-grey-hover text-white'
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col>
              <Tab.Content className='text-white'>
                <Tab.Pane eventKey={`#${selectedCategory.toLowerCase().replace(" ", "")}`}>
                  <Row xs={1} md={2} lg={3} className="g-4">
                    {products.map((product, idx) => (
                      <Col key={idx} className='flex justify-center'>
                        <Card className='bg-dark-grey max-w-60 text-white'>
                          <Card.Img variant="top" src="gyosas.jpg" />
                          <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>{product.description}</Card.Text>
                            <div className='flex w-full justify-center'>
                              <Button 
                                className='bg-btn-green hover:bg-btn-green-hover border-0'
                                onClick={() => addToCart(product)}
                                >
                                + ${product.price}
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
}

export default Carta;