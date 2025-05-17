import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Keyboard, Monitor, Moon, Sun, ChevronLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isHomePage = location.pathname === '/';

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 z-10 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {!isHomePage ? (
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ChevronLeft size={20} />
            <span className="ml-1">Back</span>
          </button>
        ) : (
          <div className="flex items-center">
            <Keyboard className="text-indigo-600 dark:text-indigo-400 mr-2" size={24} />
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white">KeySync</h1>
          </div>
        )}

        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <Moon size={20} className="text-slate-600 dark:text-slate-300" />
            ) : (
              <Sun size={20} className="text-slate-600 dark:text-slate-300" />
            )}
          </button>
          
          {isHomePage && (
            <>
              <button 
                onClick={() => navigate('/phone')}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                aria-label="Phone keyboard"
              >
                <Keyboard size={20} className="text-slate-600 dark:text-slate-300" />
              </button>
              <button 
                onClick={() => navigate('/computer')}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                aria-label="Computer receiver"
              >
                <Monitor size={20} className="text-slate-600 dark:text-slate-300" />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;