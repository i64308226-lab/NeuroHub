import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import './SearchPage.css';

// 🗃️ База данных (в реальности это придет с бэкенда)
const AI_TOOLS = [
  { id: 1, name: 'ChatGPT', category: 'Текст', desc: 'Универсальный чат-бот для любых задач.', url: '#', icon: '💬' },
  { id: 2, name: 'Midjourney', category: 'Изображения', desc: 'Генерация фотореалистичных артов.', url: '#', icon: '🎨' },
  { id: 3, name: 'Runway Gen-2', category: 'Видео', desc: 'Превращение текста и картинок в видео.', url: '#', icon: '🎥' },
  { id: 4, name: 'ElevenLabs', category: 'Аудио', desc: 'Лучший синтез речи на рынке.', url: '#', icon: '🎙️' },
  { id: 5, name: 'Claude 3', category: 'Текст', desc: 'Интеллектуальный помощник с большим контекстом.', url: '#', icon: '🧠' },
  { id: 6, name: 'Suno AI', category: 'Музыка', desc: 'Создание полноценных песен за секунды.', url: '#', icon: '🎵' },
  { id: 7, name: 'Perplexity', category: 'Поиск', desc: 'Поисковик нового поколения с ответами.', url: '#', icon: '🔍' },
  { id: 8, name: 'Gamma', category: 'Презентации', desc: 'Генерация слайдов и документов.', url: '#', icon: '📊' },
];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  
  const [inputValue, setInputValue] = useState(queryParam);
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  // Загрузка истории при старте
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('neurohub_history') || '[]');
    setHistory(saved);
  }, []);

  // Поиск при изменении URL или ввода
  useEffect(() => {
    if (!queryParam) {
      setResults([]);
      return;
    }
    
    const q = queryParam.toLowerCase();
    const filtered = AI_TOOLS.filter(item => 
      item.name.toLowerCase().includes(q) || 
      item.category.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q)
    );
    setResults(filtered);
  }, [queryParam]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Обновляем URL
    setSearchParams({ q: inputValue });

    // Сохраняем в историю
    const newHistory = [inputValue, ...history.filter(h => h !== inputValue)].slice(0, 10);
    localStorage.setItem('neurohub_history', JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  const clearHistory = () => {
    localStorage.removeItem('neurohub_history');
    setHistory([]);
  };

  const removeHistoryItem = (itemToRemove) => {
    const newHistory = history.filter(h => h !== itemToRemove);
    localStorage.setItem('neurohub_history', JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  return (
    <div className="search-container">
      {/* Фоновые градиенты */}
      <div className="bg-gradient-1"></div>
      <div className="bg-gradient-2"></div>

      <div className="search-layout">
        {/* Левая колонка: История */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <Link to="/" className="logo-link">NeuroHub</Link>
          </div>
          
          <div className="history-section">
            <div className="history-header">
              <h3>История поиска</h3>
              {history.length > 0 && (
                <button onClick={clearHistory} className="clear-btn">Очистить</button>
              )}
            </div>
            
            <div className="history-list">
              {history.length === 0 ? (
                <p className="empty-history">Нет недавних запросов</p>
              ) : (
                history.map((item, idx) => (
                  <div key={idx} className="history-item">
                    <span 
                      className="history-text"
                      onClick={() => {
                        setInputValue(item);
                        setSearchParams({ q: item });
                      }}
                    >
                      {item}
                    </span>
                    <button 
                      className="remove-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeHistoryItem(item);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>

        {/* Правая колонка: Поиск и Результаты */}
        <main className="main-content">
          <div className="search-bar-wrapper">
            <form onSubmit={handleSearch} className={`search-form ${isFocused ? 'focused' : ''}`}>
              <span className="search-icon">🔍</span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Какую нейросеть ищем сегодня?"
                className="search-input"
              />
              {inputValue && (
                <button 
                  type="button" 
                  className="clear-input"
                  onClick={() => setInputValue('')}
                >
                  ×
                </button>
              )}
              <button type="submit" className="search-submit">Найти</button>
            </form>
          </div>

          <div className="results-area">
            {!queryParam ? (
              <div className="welcome-screen">
                <h2>Добро пожаловать в NeuroHub</h2>
                <p>Введите запрос выше, чтобы найти лучшие AI-инструменты.</p>
                <div className="popular-tags">
                  <span>Популярное:</span>
                  {['Генерация картинок', 'Чат-боты', 'Видео', 'Код'].map(tag => (
                    <button 
                      key={tag} 
                      onClick={() => {
                        setInputValue(tag);
                        setSearchParams({ q: tag });
                      }}
                      className="tag"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length > 0 ? (
              <>
                <div className="results-count">Найдено: {results.length}</div>
                <div className="results-grid">
                  {results.map(tool => (
                    <a href={tool.url} key={tool.id} className="tool-card" target="_blank" rel="noreferrer">
                      <div className="card-icon">{tool.icon}</div>
                      <div className="card-info">
                        <div className="card-header">
                          <h3>{tool.name}</h3>
                          <span className={`category-badge ${tool.category.toLowerCase()}`}>
                            {tool.category}
                          </span>
                        </div>
                        <p>{tool.desc}</p>
                      </div>
                      <div className="card-arrow">→</div>
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <div className="no-results">
                <div className="no-results-icon">😕</div>
                <h3>Ничего не найдено</h3>
                <p>Попробуйте изменить запрос или посмотрите популярные категории выше.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
