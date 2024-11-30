import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/layout';
import Carta from './views/Carta';
import PedidosView from './views/PedidosView';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Carta />} index />
          <Route path="/pedidos" element={<PedidosView />} index />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}