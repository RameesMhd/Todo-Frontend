import './App.scss';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Register from './components/Register';
import Todo from './components/Todo';
import Home from './components/Home';  // Import Home component

function App() {
  return (
    <Router>
      <div className="overlay"></div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />  {/* Home component on the main page */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/todos" element={<Todo />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
