import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Request from './pages/Request/Request';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import PublicOffer from './pages/PublicOffer/PublicOffer';
import LanguageManager from './components/common/LanguageManager/LanguageManager';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

function App() {
  useEffect(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        loadingScreen.remove(); // Удаляем экран загрузки сразу после скрытия
      }, 0); // Задержка перед скрытием и удалением экрана загрузки (1 секунда)
    }
  }, []);

  return (
    <Router basename="/logistic">
      <div className="app-wrapper">
        <LanguageManager />
        <Header />
        <main className="app-content">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/request" element={<Request />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/public-offer" element={<PublicOffer />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;