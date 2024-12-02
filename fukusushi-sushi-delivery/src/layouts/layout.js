import { Outlet } from 'react-router-dom';
import Header from '../components/AppNavbar';
import Footer from '../components/Footer';

export default function Layout() {
  return (
    <>
      <div className='flex flex-col min-h-screen bg-primary-color'>
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}