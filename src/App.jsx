import React from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import './App.css';

function Navigation() {
  const location = useLocation();
  return (
    <header className="main-header">
      <Link to="/" className="logo">🧠 NeuroHub</Link>
      <nav className="nav-links">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Главная</Link>
        <Link to="/search" className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`}>Поиск</Link>
      </nav>
    </header>
  );
}

function App() {
  return (
    <HashRouter>
      <div className="app-wrapper">
        <div className="bg-blob bg-blob-1"></div>
        <div className="bg-blob bg-blob-2"></div>
        
        <Navigation />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </main>
        
        <footer className="main-footer">
          <p>© 2024 NeuroHub. Бета-версия. Все инструменты бесплатны.</p>
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;
