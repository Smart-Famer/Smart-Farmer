import './App.css';
import 'react-router-dom';
import HomePage from './Pages/HomePage';
import Dashboard from './Pages/Dashboard';
import SharedLayout from './Pages/SharedLayout'
import LoginPage from './Pages/LoginPage'
import Error from './Pages/Error'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage setuser={setUser}/>}/>
        <Route path='/' element={<SharedLayout />} >
          <Route index element={<Dashboard user={user}/>}/>
          <Route path='home' element={<HomePage/>}/>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
