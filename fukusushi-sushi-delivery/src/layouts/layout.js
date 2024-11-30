import { Outlet } from 'react-router-dom';
import Header from '../components/AppNavbar';
import Footer from '../components/Footer';

export default function Layout() {
  return (
    <>
        <Header />

        <main className="">
            <Outlet />
        </main>

        <Footer />
    </>
  )
}