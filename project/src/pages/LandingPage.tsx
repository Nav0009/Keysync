import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Keyboard, Monitor, Smartphone, ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center pt-8 md:pt-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
          Use Your Phone as a <span className="text-indigo-600 dark:text-indigo-400">PC Keyboard</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          KeySync lets you use your phone's keyboard to type on your laptop or PC wirelessly. Perfect for presentations, smart TVs, or when you need a replacement keyboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl mb-16">
        <button
          onClick={() => navigate('/phone')}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center group border border-slate-200 dark:border-slate-700"
        >
          <div className="bg-indigo-100 dark:bg-indigo-900/50 p-4 rounded-full mb-4">
            <Smartphone size={32} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Phone Mode
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Turn your phone into a keyboard and type on your computer
          </p>
          <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium group-hover:translate-x-1 transition-transform">
            Get Started <ArrowRight size={16} className="ml-1" />
          </div>
        </button>

        <button
          onClick={() => navigate('/computer')}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center group border border-slate-200 dark:border-slate-700"
        >
          <div className="bg-indigo-100 dark:bg-indigo-900/50 p-4 rounded-full mb-4">
            <Monitor size={32} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Computer Mode
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Set up your computer to receive keyboard input from your phone
          </p>
          <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium group-hover:translate-x-1 transition-transform">
            Connect Device <ArrowRight size={16} className="ml-1" />
          </div>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
          How It Works
        </h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-full mr-4 flex-shrink-0">
              <span className="font-medium text-indigo-600 dark:text-indigo-400">1</span>
            </div>
            <div>
              <h3 className="font-medium text-slate-900 dark:text-white">Set up your computer</h3>
              <p className="text-slate-600 dark:text-slate-300">Open KeySync on your computer and get a connection code</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-full mr-4 flex-shrink-0">
              <span className="font-medium text-indigo-600 dark:text-indigo-400">2</span>
            </div>
            <div>
              <h3 className="font-medium text-slate-900 dark:text-white">Connect your phone</h3>
              <p className="text-slate-600 dark:text-slate-300">Open KeySync on your phone and enter the connection code</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-full mr-4 flex-shrink-0">
              <span className="font-medium text-indigo-600 dark:text-indigo-400">3</span>
            </div>
            <div>
              <h3 className="font-medium text-slate-900 dark:text-white">Start typing</h3>
              <p className="text-slate-600 dark:text-slate-300">Use your phone as a keyboard for your computer instantly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;