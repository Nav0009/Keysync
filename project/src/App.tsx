import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PhoneKeyboard from './pages/PhoneKeyboard';
import ComputerReceiver from './pages/ComputerReceiver';
import Header from './components/Header';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
          <Header />
          <main className="container mx-auto px-4 pt-16 pb-8">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/phone" element={<PhoneKeyboard />} />
              <Route path="/computer/:sessionId?" element={<ComputerReceiver />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;