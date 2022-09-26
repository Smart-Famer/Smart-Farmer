import './App.css';
import 'react-router-dom';
import NavBar from './components/NavBar'
import Home from './Pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div>
      <NavBar />
    </div>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
