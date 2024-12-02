import React, { useState, useEffect } from 'react';
import OrderList from '../components/OrderList';
import HistoricalList from '../components/HistoricalList';

const ENDPOINT = "http://localhost:4000";

const GET_ORDERS_BY_USER = `
  query OrderByUser($user: ID!) {
  OrderByUser(user: $user) 
  {
    id
    products {
      product
      quantity
    }
    status
    totalAmount
    createdAt
  }
}`

const PedidosView = () => {
  const [userId, setUserId] = useState(false);
  const [userData, setUserData] = useState(null);

  const [userOrders, setUserOrders] = useState([]);
  const [ongoingOrders, setOngoingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('authToken'));
    if (storedUser) {
      setUserData(storedUser.userName);
      setUserId(storedUser.id);
    }
  }, []);
  
  useEffect(() => {

    const fetchOrdersBody = {
      query: GET_ORDERS_BY_USER,
      variables: {  
        "user": userId
      },
    };

    const fetchOrders = async () => {
      try {
        const response = await fetch(ENDPOINT, {
          method: "POST",
          body: JSON.stringify(fetchOrdersBody),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.errors) {
          setError(data.errors[0].message);
        } else {
          setUserOrders(data.data.OrderByUser || []); // revisar campo
        }
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false)
      }
    };

    fetchOrders();
  }, [userId]);


  useEffect(() => {
    const ongoing = userOrders.filter(order => order.status === 'In Progress');
    const completed = userOrders.filter(order => order.status === 'Completed');
    setOngoingOrders(ongoing);
    setCompletedOrders(completed);
  }, [userOrders]);

  const handleCancelOrder = (orderId) => {
    setOngoingOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
  };

  if (loading) {
    return <div>Loading...</div>;  // Puedes mostrar algo mientras se cargan los productos
  }

  return (
    <div className="bg-primary-color min-h-screen flex justify-center p-10 md:p-15">
      <div className="w-full max-w-none rounded-lg flex flex-col space-y-8">
        <div className="container mx-auto px-4 py-8">
          <OrderList 
            title="Pedidos en Curso" 
            orders={ongoingOrders} 
            emptyMessage="No hay pedidos en curso en este momento."
            onCancelOrder={handleCancelOrder}
          />
          <HistoricalList 
            title="Historial de Pedidos" 
            orders={completedOrders} 
            emptyMessage="No hay pedidos completados en el historial."
          />
        </div>
      </div>
    </div>
  );
};

export default PedidosView;