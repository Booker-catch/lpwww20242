import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../styles/FanAnimation.css'; // Archivo CSS para la animación del ventilador

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WebSocketView = () => {
  const [currentTemp, setCurrentTemp] = useState(null); // Estado para la temperatura actual
  const [fanStatus, setFanStatus] = useState("Desconocido"); // Estado para el estado del ventilador
  const [temperatureData, setTemperatureData] = useState([]); // Datos de temperatura para el gráfico
  const [timestamps, setTimestamps] = useState([]); // Tiempos correspondientes a los datos de temperatura
  const [isConnected, setIsConnected] = useState(false); // Estado de conexión del WebSocket
  const [isSimulating, setIsSimulating] = useState(true); // Estado para controlar si estamos simulando datos
  const [reconnectDots, setReconnectDots] = useState(""); // Estado para controlar los puntos de reconexión
  const socketRef = useRef(null); // Referencia al WebSocket
  const retryTimeout = useRef(null); // Referencia al temporizador de reintento
  const simulationInterval = useRef(null); // Para almacenar el intervalo de simulación
  const reconnectInterval = useRef(null); // Para almacenar el intervalo de animación de puntos de reconexión

  // Animación de reconexión independiente de la conexión real
  const startReconnectAnimation = () => {
    reconnectInterval.current = setInterval(() => {
      setReconnectDots((prev) => (prev.length < 3 ? prev + "." : ".")); // Añadir un punto cada vez
    }, 500); // Añadir un punto cada 0.5 segundos
  };

  // Detener la animación de reconexión
  const stopReconnectAnimation = () => {
    if (reconnectInterval.current) {
      clearInterval(reconnectInterval.current); // Detener la animación de puntos
      reconnectInterval.current = null;
    }
    setReconnectDots(""); // Resetear los puntos de reconexión
  };

  // Reconectar indefinidamente, siempre que sea necesario
  const scheduleReconnect = () => {
    console.log("Reintentando conexión al WebSocket...");
    stopReconnectAnimation(); // Detener la animación de reconexión cuando intentemos una reconexión real
    setTimeout(() => {
      initializeWebSocket();
    }, 2000); // Intentar reconectar cada 2 segundos
  };

  // Inicializar la conexión WebSocket
  const initializeWebSocket = () => {
    if (
      socketRef.current &&
      (socketRef.current.readyState === WebSocket.OPEN ||
        socketRef.current.readyState === WebSocket.CONNECTING)
    ) {
      console.log("WebSocket ya está conectado o en proceso de conexión");
      return;
    }

    const socket = new WebSocket('ws://localhost:4001');
    socketRef.current = socket;

    // Cuando se abre la conexión WebSocket
    socket.onopen = () => {
      console.log('Conexión al WebSocket establecida');
      setIsConnected(true);
      setIsSimulating(false); // Detener la simulación cuando el WebSocket está conectado
      stopReconnectAnimation(); // Detener la animación cuando la conexión esté establecida
    };

    // Cuando se reciben mensajes del WebSocket
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const { randomValue, ventiladorStatus } = data;

        // Actualizar los datos de temperatura y tiempo
        setTemperatureData((prevData) => {
          const newData = [...prevData, parseFloat(randomValue)];
          if (newData.length > 70) newData.shift();
          return newData;
        });

        setTimestamps((prevTimestamps) => {
          const newTimestamps = [...prevTimestamps, new Date().toLocaleTimeString()];
          if (newTimestamps.length > 70) newTimestamps.shift();
          return newTimestamps;
        });

        // Actualizar la temperatura actual y el estado del ventilador
        setCurrentTemp(parseFloat(randomValue));
        setFanStatus(ventiladorStatus);
      } catch (error) {
        console.error('Error al procesar los datos del WebSocket:', error);
      }
    };

    // Cuando se cierra la conexión WebSocket
    socket.onclose = () => {
      console.log('Conexión al WebSocket cerrada');
      setIsConnected(false);
      setIsSimulating(true); // Volver a la simulación si se pierde la conexión
      scheduleReconnect(); // Intentar reconectar después de un tiempo
      startReconnectAnimation(); // Iniciar animación de reconexión
    };

    // Manejar errores en el WebSocket
    socket.onerror = (error) => {
      console.error('Error en el WebSocket:', error);
      setIsConnected(false);
      setIsSimulating(true); // Volver a la simulación si hay un error
      scheduleReconnect(); // Intentar reconectar después de un tiempo
      startReconnectAnimation(); // Iniciar animación de reconexión
    };
  };

  // Detener la simulación y limpiar el intervalo
  const clearSimulation = () => {
    if (retryTimeout.current) {
      clearTimeout(retryTimeout.current);
      retryTimeout.current = null;
    }
    if (simulationInterval.current) {
      clearInterval(simulationInterval.current); // Detener la simulación si ya está corriendo
      simulationInterval.current = null;
    }
  };

  // Calcular la pendiente general de toda la serie de datos
  const calculateOverallSlope = () => {
    if (temperatureData.length < 2) return 0;
    const firstPoint = temperatureData[0];
    const lastPoint = temperatureData[temperatureData.length - 1];
    return (lastPoint - firstPoint) / (temperatureData.length - 1); // Pendiente de toda la serie de datos
  };

  // Generar un punto de temperatura basado en la pendiente general y un factor aleatorio
  const generateTemperaturePoint = () => {
    if (temperatureData.length < 2) {
      // Si hay menos de 2 puntos, generar temperatura aleatoria entre 20 y 30 grados
      const randomTemp = (Math.random() * 10 + 20).toFixed(2);
      return parseFloat(randomTemp);
    }

    // Calcular la pendiente general de la serie de datos
    const overallSlope = calculateOverallSlope();

    // Introducir un pequeño factor aleatorio para variabilidad
    const randomFactor = Math.random() * 1 - 0.5; // Rango entre -0.5 y 0.5

    // Ajustar el próximo valor de temperatura según la pendiente y el factor aleatorio
    const lastPoint = temperatureData[temperatureData.length - 1];
    const nextTemp = lastPoint + overallSlope * 0.3 + randomFactor;

    return parseFloat(nextTemp.toFixed(2)); // Redondear el valor
  };

  // Simulación de temperatura aleatoria o basada en pendiente
  const addRandomOrPredictedPoint = () => {
    const newTemp = generateTemperaturePoint();

    setTemperatureData((prevData) => {
      const newData = [...prevData, newTemp];
      if (newData.length > 70) newData.shift();
      return newData;
    });

    setTimestamps((prevTimestamps) => {
      const newTimestamps = [...prevTimestamps, new Date().toLocaleTimeString()];
      if (newTimestamps.length > 70) newTimestamps.shift();
      return newTimestamps;
    });

    setCurrentTemp(newTemp); // Actualiza la temperatura actual
    setFanStatus('simulado'); // O cualquier otro estado que quieras asignar
  };

  // Iniciar simulación de temperatura aleatoria cada 1 segundo
  useEffect(() => {
    if (isSimulating) {
      simulationInterval.current = setInterval(() => {
        addRandomOrPredictedPoint();
      }, 1000); // Cada 1 segundo
    } else {
      clearSimulation(); // Detener la simulación cuando se conecta el WebSocket
    }

    return () => {
      clearSimulation(); // Limpiar intervalo y tiempo de espera cuando el componente se desmonte
    };
  }, [isSimulating]);

  // Intentar conexión desde el inicio y reintentar siempre
  useEffect(() => {
    initializeWebSocket(); // Intentar conexión desde el inicio
    return () => {
      if (socketRef.current) socketRef.current.close();
      if (retryTimeout.current) clearTimeout(retryTimeout.current);
      clearSimulation();
    };
  }, []);

  // Mantener el WebSocket en reconexión constante si se pierde la conexión
  useEffect(() => {
    if (!isConnected) {
      console.log("Esperando reconexión...");
      scheduleReconnect();
      startReconnectAnimation(); // Iniciar la animación al perder la conexión
    }
  }, [isConnected]);

  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: temperatureData,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Tiempo',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Temperatura (°C)',
        },
        suggestedMin: 0,
        suggestedMax: 50,
      },
    },
  };

  return (
    <div className="container bg-primary-color text-white min-vh-100 d-flex flex-column align-items-center">
      <div className='flex w-full'>
        <Button 
          variant="link" 
          className=' text-white align-self-end'
          as={Link}
          to="/admin"
          >
            Volver
          </Button>
        <h1 className="text-center w-full mt-4">
          {isConnected
            ? "Conectado a sensor de temperatura"
            : "Sensor no disponible, los datos están siendo simulados"}
        </h1>
      </div>
      {!isConnected && (
        <div className="text-center mt-2" style={{ color: '#4c4c4c', display: 'flex', alignItems: 'center' }}>
          <h3 className="mb-0" style={{ marginRight: '10px' }}>{"Esperando reconexión"}</h3>
          <div className="loading-icon"></div> {/* Ícono de carga giratorio */}
        </div>
      )}
      <div className="d-flex flex-row align-items-center my-4">
        <div
          className="p-4 mb-3"
          style={{
            border: '2px solid white',
            backgroundColor: 'black',
            color: 'white',
            textAlign: 'center',
            minWidth: '250px',
            borderRadius: '8px',
          }}
        >
          <h5 style={{ color: 'white' }}>Temperatura Actual</h5>
          <p style={{ color: 'white', fontSize: '2rem' }}>
            {currentTemp !== null && !isNaN(currentTemp) ? `${currentTemp.toFixed(2)} °C` : "Cargando..."}
          </p>
          <h6 style={{ color: 'gray' }}>Ventilador: {fanStatus}</h6>
        </div>
        <div className="fan-container ms-4">
          <svg
            className={`fan ${fanStatus === 'encendido' ? 'fan-rotating' : ''}`}
            viewBox="0 0 100 100"
            width="70"
            height="70"
          >
            <circle cx="50" cy="50" r="45" fill="black" stroke="white" strokeWidth="2" />
            <rect x="45" y="5" width="10" height="40" fill="white" />
            <rect x="45" y="55" width="10" height="40" fill="white" />
            <rect x="5" y="45" width="40" height="10" fill="white" />
            <rect x="55" y="45" width="40" height="10" fill="white" />
          </svg>
        </div>
      </div>
      <div className="w-100" style={{ maxWidth: '800px' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default WebSocketView;
