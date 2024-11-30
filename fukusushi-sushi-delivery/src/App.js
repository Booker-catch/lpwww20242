import logo from './logo.svg';
import './App.css';
import AppNavbar from './components/AppNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <AppNavbar></AppNavbar>
      <div class="container text-center">
        <div class="row">
          <div class="col">
            Column
          </div>
          <div class="col">
            Column
          </div>
          <div class="col">
            Column
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
