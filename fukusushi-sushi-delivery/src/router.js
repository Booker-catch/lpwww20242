import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/layout';
import Carta from './views/Carta';
import PedidosView from './views/PedidosView';
import AdminPanel from './views/AdminPanel';
import TemperatureSensor from './views/TemperatureSensor';
import ReportsPanelView from './views/ReportsPanel';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Carta />} index />
          <Route path="/pedidos" element={<PedidosView />} index />
          <Route path="/sensor" element={<TemperatureSensor />} index />
          <Route path='/admin' element={<AdminPanel />} index/>
          <Route path='/reportes' element={<ReportsPanelView />} index/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}