import React from 'react';
import {Image} from "react-bootstrap";

const OrderList = ({ title, orders, emptyMessage, onCancelOrder }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500 italic">{emptyMessage}</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="mb-4 border-black border-b pb-4 last:border-b-0">
            <h3 className="text-lg font-semibold mb-2">Orden #{order.id}</h3>
            <ul className="space-y-4">
              {order.items.map((item) => (
                <li key={item.id} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={item.imageUrl || "/placeholder.svg?height=80&width=80"}
                      alt={item.name}
                      width="80"
                      height="80"
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">5 bocados</p>
                    <p className="text-sm text-gray-700">Cantidad: {item.quantity}</p>
                  </div>
                  <div className="flex-shrink-0 font-medium">
                    ${(item.price * item.quantity)}
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-right font-bold">
              Total: ${order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)}
            </p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              onClick={() => onCancelOrder(order.id)}
            >
              Anular Pedido
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderList;