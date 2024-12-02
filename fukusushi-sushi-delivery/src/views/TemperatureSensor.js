import React, { useState, useEffect } from 'react';

const WebSocketView = () => {
  const [message, setMessage] = useState("No se detecta info del WebSocket");
  const [temperatureData, setTemperatureData] = useState([]); // Almacenamos los últimos 10 valores
  const [average, setAverage] = useState(null);
  const [variance, setVariance] = useState(null);

  // Función para calcular el promedio
  const calculateAverage = (data) => {
    if (data.length === 0) return 0;
    const sum = data.reduce((acc, curr) => acc + parseFloat(curr.randomValue), 0);
    return sum / data.length;
  };

  // Función para calcular la varianza
  const calculateVariance = (data, average) => {
    if (data.length === 0) return 0;
    const squaredDifferences = data.map((item) => Math.pow(parseFloat(item.randomValue) - average, 2));
    const sumOfSquaredDifferences = squaredDifferences.reduce((acc, curr) => acc + curr, 0);
    return sumOfSquaredDifferences / data.length;
  };

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:4000'); // Cambia por la URL de tu WebSocket

    socket.onopen = () => {
      console.log('Conexión al WebSocket establecida');
    };

    socket.onmessage = (event) => {
      try {
        // Parseamos el mensaje JSON recibido
        const data = JSON.parse(event.data);

        // Almacenamos los últimos 10 valores
        setTemperatureData((prevData) => {
          const newData = [...prevData, data];
          // Mantener solo los últimos 10 valores
          if (newData.length > 10) newData.shift();
          return newData;
        });

        // Actualizamos el mensaje con el valor recibido
        setMessage(`Valor: ${data.randomValue} °C, Ventilador: ${data.ventiladorStatus}`);
      } catch (error) {
        console.error('Error al parsear el mensaje del WebSocket:', error);
        setMessage("No se detecta info del WebSocket");
      }
    };

    socket.onclose = () => {
      console.log('Conexión al WebSocket cerrada');

      // Calcular el promedio y la varianza de los últimos 10 valores
      if (temperatureData.length > 0) {
        const avg = calculateAverage(temperatureData);
        const varian = calculateVariance(temperatureData, avg);
        setAverage(avg.toFixed(2));
        setVariance(varian.toFixed(2));
      } else {
        setAverage(0);
        setVariance(0);
      }
    };

    socket.onerror = (error) => {
      console.error('Error en el WebSocket:', error);
      setMessage("No se detecta info del WebSocket");
    };

    // Cleanup al desmontar el componente
    return () => {
      socket.close();
    };
  }, [temperatureData]); // La dependencia es 'temperatureData' para recalcular si cambia

  return (
    <div className="bg-primary-color min-h-screen flex items-center justify-center">
      <div className="flex w-full max-w-4xl justify-between">
        <div className="text-white text-center text-xl font-bold">
          <p>Promedio: {average ? `${average} °C` : 'Cargando...'}</p>
          <p>Varianza: {variance ? `${variance} °C²` : 'Cargando...'}</p>
        </div>

        <div className="text-white text-center text-2xl font-bold">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default WebSocketView;
