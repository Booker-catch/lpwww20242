import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Tab, Card, ListGroup, Modal, Form} from 'react-bootstrap';
import { Button, Collapse } from 'react-bootstrap';
import { MdDelete, MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";


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

const DELETE_PRODUCT_BY_ID = `
    mutation DeleteProduct($deleteProductId: ID!) {
        deleteProduct(id: $deleteProductId)
    }`

const ADD_NEW_PRODUCT = `
    mutation AddProduct($name: String!, $categories: [String!]!, $price: Float!, $description: String!, $imageUrl: String!) {
        addProduct(name: $name, categories: $categories, price: $price, description: $description, imageUrl: $imageUrl) {
            id
        }
    }`

function AdminProducts() {
  const [selectedCategory, setSelectedCategory] = useState("Promociones");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);

	// Campos formulario agregar producto
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [tags, setTags] = useState([]);
	const [price, setPrice] = useState('');


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

	const handleCancelAddProd = () => {
		setShowAddProduct(false);
		setName("");
		setDescription("");
		setPrice("");
	}

  const handleDeleteProduct = async (id) => {
    const deleteProductBody = {
      query: DELETE_PRODUCT_BY_ID,
      variables: { deleteProductId: id },
    };

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        body: JSON.stringify(deleteProductBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.errors) {
        setError(data.errors[0].message);
        return;
      }

      // Actualizar la lista de productos localmente tras eliminar
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      setError("Error deleting product");
    }
  };

	const handleAddProduct = async () => {
		if (!name || !description || !price || tags.length === 0) {
			alert("Por favor, completa todos los campos y selecciona al menos un tag.");
			return;
		}
	
		const addProductBody = {
			query: ADD_NEW_PRODUCT,
			variables: {
				name: name.trim(),
				description: description.trim(),
				price: parseFloat(price),
				categories: tags,
				imageUrl: "gyosas.jpg", // Puedes agregar una opción para subir imagen en el futuro
			},
		};
	
		try {
			const response = await fetch(ENDPOINT, {
				method: "POST",
				body: JSON.stringify(addProductBody),
				headers: {
					"Content-Type": "application/json",
				},
			});
	
			const data = await response.json();
	
			if (data.errors) {
				setError(data.errors[0].message);
				alert("Error al añadir el producto.");
				return;
			}
	
			// Actualiza la lista de productos localmente
			const newProduct = {
				id: data.data.addProduct.id,
				name,
				description,
				price: parseFloat(price),
				imageUrl: "gyosas.jpg",
			};
	
			setProducts([...products, newProduct]);
	
			// Limpia el formulario y cierra el modal
			handleCancelAddProd();
		} catch (error) {
			alert("Error al conectar con el servidor.");
			console.error(error);
		}
	};

	const handleTagChange = (category) => {
		if (tags.includes(category)) {
			setTags(tags.filter((tag) => tag !== category));
		} else {
			setTags([...tags, category]);
		}
	};

   // Manejar cambios de tamaño de pantalla
   useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsCollapsed(false); // Mostrar lista en pantallas grandes
      }
    };

    // Añadir listener para cambios de tamaño
    window.addEventListener('resize', handleResize);

    // Configuración inicial al cargar el componente
    handleResize();

    // Limpiar el listener al desmontar el componente
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Puedes mostrar algo mientras se cargan los productos
  }

  if (error) {
    return <div>Error: {error}</div>;  // Muestra un mensaje de error si ocurre un problema
  }


  return (
    <>
        <div className='bg-primary-color'>
        <Container className='py-5'>
            <Tab.Container id="carta" defaultActiveKey="#promociones">
            <Row className='flex-md-row flex-column'>
                <Col sm={12} md={4} lg={3} className="mb-3 mb-md-0 flex justify-center flex-col md:justify-start">
                <Button
                    className="d-md-none mb-3 bg-dark-grey text-white"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    aria-controls="category-list"
                    aria-expanded={!isCollapsed}
                >
                {isCollapsed ? 'Mostrar Categorías' : 'Ocultar Categorías'}
                </Button>
                <Collapse in={!isCollapsed}>
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
                </Collapse>
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
                                <Card.Text className='mb-0'>{product.description}</Card.Text>
                                <Card.Text>${product.price}</Card.Text>
                                <div className='flex w-full justify-evenly'>
                                {/* <Button 
                                    className='bg-btn-green hover:bg-btn-green-hover border-0'
                                    onClick={() => addToCart(product)}
                                    >
                                    + ${product.price}
                                </Button> */}
                                    <Button
                                        variant='secondary'
                                        >
                                        <MdEdit />
                                    </Button>
                                    <Button 
                                        variant="danger"
                                        onClick={() => handleDeleteProduct(product.id)}
                                        >
                                        <MdDelete/>
                                    </Button>
                                </div>
                            </Card.Body>
                            </Card>
                        </Col>
                        ))}
                        <Col className='flex align-items-center justify-center'>
                            <Button 
                                className='bg-btn-green hover:bg-btn-green-hover border-0 text-4xl'
																onClick={() => setShowAddProduct(true)}>
                                <FaPlus />
                            </Button>
                        </Col>
                    </Row>
                    </Tab.Pane>
                </Tab.Content>
                </Col>
            </Row>
            </Tab.Container>
        </Container>
        </div>


        {/* Modal de addProduct */}
        <Modal 
            show={showAddProduct} 
            onHide={() => setShowAddProduct(false)} 
            size="lg" 
            centered>

            <Modal.Header className='bg-nav-bg' closeButton>
            <Modal.Title>Añadir Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body className='bg-nav-bg'>
            <Form>
                <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingrese el nombre del producto"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingresa una descripción para el producto"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                </Form.Group>
								
                <Form.Group className="mb-3" controlId="formPrecio">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Ingrese el precio del producto"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formTags">
                <Form.Label>Tags</Form.Label>
                {categories.map((cat) => (
									<Form.Check
										type='checkbox'
										id={`checkbox-${cat}`}
										label={`${cat}`}
										onChange={() => handleTagChange(cat)}
									/>
								))}
                </Form.Group>

                
            </Form>
            </Modal.Body>
            <Modal.Footer className='bg-nav-bg'>
            <Button variant="secondary" onClick={() => handleCancelAddProd()}>
                Cancelar
            </Button>
            <Button className='bg-footer-bg hover:bg-stone-700 border-footer-bg' onClick={handleAddProduct}>
                Confirmar
            </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}

export default AdminProducts;