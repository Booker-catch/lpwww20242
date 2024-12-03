import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const ENDPOINT = "http://localhost:4000";

const GET_PRODUCTS_BY_ID = `
  query ProductById($productByIdId: ID!) {
    ProductById(id: $productByIdId) {
      name
      description
      imageUrl
      price
    }
  }
`;

const formatDate = (timestamp) => {
  const date = new Date(Number(timestamp));
  return date.toLocaleDateString("es-ES", {
    day: "numeric",     // Día como número (1-31)
    month: "long",      // Mes completo (ej. "octubre")
    year: "numeric",    // Año completo
  });
};

const OrderList = ({ title, orders, emptyMessage, onCancelOrder }) => {
  const [productDetails, setProductDetails] = useState({});
  const [error, setError] = useState(null);

  const handleCancelOrder = (onDeleteOrder) => {
    // Confirmar antes de eliminar
    const confirmDelete = window.confirm("¿Estás seguro de que deseas cancelar esta orden?");
    if (!confirmDelete) return;
  
    // Configurar el body de la petición
    const deleteRequestBody = {
      query: `
      mutation DeleteOrder($deleteOrderId: ID!) {
        deleteOrder(id: $deleteOrderId)
      }
      `,
      variables: {
        "deleteOrderId": onDeleteOrder,
      },
    };
  
    // Realizar la solicitud para borrar la orden
    fetch(ENDPOINT, {
      method: "POST",
      body: JSON.stringify(deleteRequestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          console.error("Error:", data.errors[0].message);
          alert("Hubo un error al cancelar la orden.");
        } else {
          alert("Orden cancelada exitosamente.");
          window.location.reload(); // Recargar la página o actualizar el estado según sea necesario
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Hubo un error al cancelar la orden.");
      });
  };
  
  const fetchProductDetails = async (id) => {
    const fetchProductBody = {
      query: GET_PRODUCTS_BY_ID,
      variables: { productByIdId: id },
    };

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        body: JSON.stringify(fetchProductBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.errors) {
        setError(data.errors[0].message);
      } else {
        setProductDetails((prev) => ({
          ...prev,
          [id]: data.data.ProductById,
        }));
      }
    } catch (error) {
      setError('Error fetching product details');
    }
  };

  const handleFetchProduct = (productId) => {
    if (!productDetails[productId]) {
      fetchProductDetails(productId);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {orders && orders.length === 0 ? (
        <p className="text-gray-500 italic">{emptyMessage}</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="mb-4 border-black border-b pb-4 last:border-b-0">
            <h3 className="text-lg font-semibold mb-2">{formatDate(order.createdAt)}</h3>
            <ul className="space-y-4">
              {order.products.map((product, index) => {
                handleFetchProduct(product.product);
                const productInfo = productDetails[product.product];
  
                return (
                  <li key={index} className="flex items-center">
                    {/* Imagen y descripción */}
                    <div className="flex items-center space-x-4 flex-grow">
                      <div className="flex-shrink-0">
                        <Image
                          src={productInfo?.imageUrl || '/gyosas.jpg'}
                          alt={productInfo?.name || 'Producto'}
                          width={80}
                          height={80}
                          className="rounded-md object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{productInfo?.name || product.product}</p>
                        <p className="text-sm text-gray-500">{productInfo?.description}</p>
                        <p className="text-sm text-gray-700">Cantidad: {product.quantity}</p>
                      </div>
                    </div>
                    {/* Botón de anular */}
                    <Button
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      onClick={() => handleCancelOrder(order.id)} 
                    >
                      Anular Pedido
                    </Button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-right font-bold">Total: ${order.totalAmount}</p>
          </div>
        ))
      )}
    </div>
  );
  
  
};

export default OrderList;
