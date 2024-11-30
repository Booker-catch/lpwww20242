import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/layout';
import IndexView from './views/IndexView';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<IndexView />} index />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}