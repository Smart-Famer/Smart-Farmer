import './App.css';
import 'react-router-dom';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import SharedLayout from './Pages/SharedLayout'
import Login from './Pages/Login'
import Error from './Pages/Error'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login setuser={setUser}/>}/>
        <Route path='/' element={<SharedLayout />} >
          <Route index element={<Dashboard user={user}/>}/>
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
