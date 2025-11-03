import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import VerifyPage from './pages/Verify'; // we'll add this small shim below
import TicTacToe from './pages/TicTacToe';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/game" element={<ProtectedRoute><TicTacToe /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}
