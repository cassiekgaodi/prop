import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

function ProposalWebsite() {
  const [yesSize, setYesSize] = useState(1);
  const [celebrate, setCelebrate] = useState(false);
  const [showFinalPage, setShowFinalPage] = useState(false);

  const growYes = () => {
    setYesSize((prev) => Math.min(prev + 0.25, 3));
  };

  const sayYes = () => {
    setCelebrate(true);
  };

  useEffect(() => {
    if (celebrate) {
      const timer = setTimeout(() => {
        setShowFinalPage(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [celebrate]);

  if (celebrate && !showFinalPage) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-600 via-pink-500 to-red-700 flex items-center justify-center">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${1.5 + (i % 3)}s`,
            }}
          >
            ❤️
          </div>
        ))}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-2xl animate-pulse text-center px-4">
          She Said Yes! ❤️
        </h1>
      </div>
    );
  }

  if (showFinalPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-fuchsia-600 via-rose-500 to-red-600 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/20 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/30 p-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-wider drop-shadow-xl">
            I LOVE YOU MAATLA
          </h1>

          <div className="overflow-hidden rounded-3xl shadow-2xl border-4 border-white/40">
            <img
              src="https://via.placeholder.com/400x300/ff69b4/ffffff?text=Love+You+❤️"
              alt="A special memory"
              className="w-full h-auto object-cover"
            />
          </div>

          <p className="mt-6 text-white text-lg font-medium leading-relaxed">
            Forever starts with this beautiful yes. ❤️
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-red-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center">
        <div className="text-6xl mb-4">🌹</div>
        <h1 className="text-4xl font-bold text-rose-600 mb-4">
          A Special Question
        </h1>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          From the moment you came into my life, every day has felt brighter,
          warmer, and more meaningful.
        </p>
        <p className="text-xl text-gray-800 mb-8 font-medium">
          Will you be my girlfriend? ❤️
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={sayYes}
            style={{ transform: `scale(${yesSize})` }}
            className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-2xl text-lg font-bold shadow-lg transition-all duration-300"
          >
            Yes! 💕
          </button>

          <button
            onClick={growYes}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-300 transition-all duration-300"
          >
            No
          </button>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Made with love, just for you.
        </p>
      </div>
    </div>
  );
}

// Render the app
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<ProposalWebsite />);
}

