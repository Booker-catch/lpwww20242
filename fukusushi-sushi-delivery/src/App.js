import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App bg-primary-color">
      <AppNavbar></AppNavbar>
      <div class="container text-center">
        <div class="row">
          <div class="col">
            Column2222
          </div>
          <div class="col h-screen">
            aaColumn
          </div>
          <div class="col">
            Column
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
