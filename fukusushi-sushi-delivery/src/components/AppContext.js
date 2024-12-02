import React, { createContext, useState, useContext } from 'react';

// Crear un contexto para el carrito
const CartContext = createContext();
console.log(CartContext);

// Crear el proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + change } : item
        )
        .filter((item) => item.quantity > 0) // Eliminar items con cantidad <= 0
    );
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

    // Función para agregar productos al carrito
    const addToCart = (product) => {
        setCartItems((prevItems) => {
          const existingProduct = prevItems.find(item => item.id === product.id);
          if (existingProduct) {
            // Si el producto ya está en el carrito, solo aumentamos la cantidad
            return prevItems.map(item =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
          } else {
            // Si el producto no está en el carrito, lo agregamos
            return [...prevItems, { ...product, quantity: 1 }];
          }
        });
    };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

// Crear un hook para consumir el contexto del carrito
export const useCart = () => {
  return useContext(CartContext);
};
