import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-primary-color">
      <AppNavbar></AppNavbar>
      <Footer></Footer>
    </div>
  );
}

export default App;
