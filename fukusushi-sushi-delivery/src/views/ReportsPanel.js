import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ReportsPanelView = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-31");
  const chartRef = useRef(null); // Referencia al contenedor del gráfico

  const ENDPOINT = "http://localhost:4000";

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersRequestBody = {
        query: `
          query Orders {
            Orders {
              id
              createdAt
            }
          }
        `,
      };

      try {
        const response = await fetch(ENDPOINT, {
          method: "POST",
          body: JSON.stringify(ordersRequestBody),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.errors) {
          throw new Error(data.errors[0].message);
        }

        if (data && data.data && data.data.Orders) {
          const orders = data.data.Orders;

          const startTimestamp = new Date(startDate).getTime();
          const endTimestamp = new Date(endDate).getTime();

          const filteredOrders = orders.filter((order) => {
            const createdAt = new Date(parseInt(order.createdAt));
            return createdAt.getTime() >= startTimestamp && createdAt.getTime() <= endTimestamp;
          });

          const ordersByDate = filteredOrders.reduce((acc, order) => {
            const date = new Date(parseInt(order.createdAt)).toISOString().split("T")[0];
            acc[date] = (acc[date] || 0) + 1;
            return acc;
          }, {});

          const labels = Object.keys(ordersByDate).sort();
          const values = labels.map((date) => ordersByDate[date]);

          setChartData({
            labels,
            datasets: [
              {
                label: "Cantidad de Órdenes",
                data: values,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          });

          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [startDate, endDate]);

  const downloadPDF = async () => {
    const input = chartRef.current; // Referencia al contenedor del gráfico
    const canvas = await html2canvas(input, { backgroundColor: "#222222" }); // Captura el elemento como imagen
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape"); // Crea un PDF en orientación horizontal
  
    // Configurar estilos y contenido adicional
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.text("Reporte de Órdenes por Fecha", 15, 20); // Título
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.setFillColor("#000")
    pdf.text(
      "Este reporte muestra el número de órdenes registradas por día en el rango de fechas seleccionado.", 
      15, 
      30
    ); // Descripción
  
    // Agregar el gráfico al PDF
    pdf.addImage(imgData, "PNG", 10, 40, 280, 120);
  
    // Agregar leyendas
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(10);
    pdf.text("Leyenda:", 15, 170);
    pdf.text("- Cada barra representa el número de órdenes realizadas en un día.", 15, 180);
    pdf.text("- Los datos se basan en las fechas ingresadas.", 15, 190);
  
    // Marca de agua
    pdf.setTextColor(150);
    pdf.setFontSize(50);
    pdf.text("FUKUSUKE SUSHI ©", pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() - 30, {
      align: "center",
      angle: 45,
    });
  
    // Descargar el PDF
    pdf.save("Reporte_Ordenes.pdf");
  };
  

  if (loading) return <div className="text-white text-center">Cargando datos...</div>;
  if (error) return <div className="text-white text-center">Error: {error}</div>;

  return (
    
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      {/* Div superior con el botón Volver */}
      <div className="top-0 left-0 p-3">
        <Button 
            variant="link" 
            className="text-white"
            as={Link}
            to="/admin"
        >
            Volver
        </Button>
    </div>

      {/* Contenido principal centrado */}
      <div className="bg-dark text-white p-4 rounded border border-white" style={{ maxWidth: "600px", width: "100%" }}>
        <h2 className="text-center">Órdenes por Fecha</h2>
        <div className="mb-3">
          <label className="form-label d-block">
            Fecha de inicio:{" "}
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="form-control"
            />
          </label>
          <label className="form-label d-block">
            Fecha de fin:{" "}
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="form-control"
            />
          </label>
        </div>
        <div ref={chartRef}>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    color: "white",
                  },
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Fechas",
                    color: "white",
                  },
                  ticks: {
                    color: "white",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Cantidad de Órdenes",
                    color: "white",
                  },
                  ticks: {
                    color: "white",
                  },
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
        <button className="btn btn-primary mt-3 w-100" onClick={downloadPDF}>
          Descargar PDF
        </button>
      </div>
    </div>
  );
};

export default ReportsPanelView;
