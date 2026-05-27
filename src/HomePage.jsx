import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <span className="beta-badge">Бета-версия • Бесплатно</span>
        <h1>Найди идеальную <span className="gradient-text">нейросеть</span> за секунды</h1>
        <p className="hero-sub">Умный каталог AI-инструментов для работы, творчества и учёбы. Без регистрации и SMS.</p>
        <Link to="/search" className="cta-button">
          Начать поиск <span className="arrow">→</span>
        </Link>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Мгновенный поиск</h3>
          <p>Фильтрация по категориям, задачам и названиям в реальном времени.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💾</div>
          <h3>Умная история</h3>
          <p>Ваши запросы сохраняются локально. Возвращайтесь к ним в один клик.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎨</div>
          <h3>Только лучшее</h3>
          <p>Мы собираем только проверенные и актуальные AI-сервисы со всего мира.</p>
        </div>
      </section>
    </div>
  );
}
