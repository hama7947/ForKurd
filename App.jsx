import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AppDetail from './pages/AppDetail';
import Upload from './pages/Upload';

export default function App(){
  return (
    <BrowserRouter>
      <header className="site-header">
        <div className="container">
          <h1>iKurd Clone</h1>
          <nav>
            <Link to="/">ماڵەوە</Link>
            <Link to="/upload">پێشکەشکردن</Link>
          </nav>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/app/:id" element={<AppDetail/>} />
          <Route path="/upload" element={<Upload/>} />
        </Routes>
      </main>

      <footer className="site-footer">
        © 2025 iKurd Clone
      </footer>
    </BrowserRouter>
  );
}
