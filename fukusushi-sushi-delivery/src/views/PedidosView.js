import React, { useState, useEffect } from 'react';
import OrderList from '../components/OrderList';
import HistoricalList from '../components/HistoricalList';

// Ordenes para testear mientras
const OrdenesFalsas = [
    { id: 1, status: 'en curso', items: [
      { id: 1, name: 'Gyosas Premium Pollo Teriyaki', quantity: 2, price: 2990, imageUrl: '/gyosas.jpg' },
      { id: 2, name: 'Gyosas Premium Pollo Teriyaki', quantity: 1, price: 3990, imageUrl: '/gyosas.jpg' },
    ]},
    { id: 2, status: 'completado', items: [
      { id: 3, name: 'Gyosas Premium Pollo Teriyaki', quantity: 3, price: 2990, imageUrl: '/gyosas.jpg' },
      { id: 4, name: 'Gyosas Premium Pollo Teriyaki', quantity: 1, price: 3990, imageUrl: '/gyosas.jpg' },
    ]},
    { id: 3, status: 'completado', items: [
      { id: 5, name: 'Gyosas Premium Pollo Teriyaki', quantity: 1, price: 8990, imageUrl: '/gyosas.jpg' },
    ]},
  ];

  const PedidosView = () => {
    const [ongoingOrders, setOngoingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
  
    useEffect(() => {
      const ongoing = OrdenesFalsas.filter(order => order.status === 'en curso');
      const completed = OrdenesFalsas.filter(order => order.status === 'completado');
      setOngoingOrders(ongoing);
      setCompletedOrders(completed);
    }, []);
  
    const handleCancelOrder = (orderId) => {
      setOngoingOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    };
  
    return (
      <div className="bg-[#151515] min-h-screen flex justify-center p-10 md:p-15">
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