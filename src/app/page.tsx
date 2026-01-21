'use client';

import { EventsContainer } from '@/components/EventsContainer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🏆</div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Eventos Deportivos
                </h1>
                <p className="text-xs sm:text-sm text-gray-400">
                  Hoy y próximos 7 días
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Colombia (UTC-5)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <EventsContainer />
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-500">
          <p>
            APIs: Football (Premier, La Liga, Liga Argentina) · Tennis · Formula 1
          </p>
          <p className="mt-2">
            Powered by{' '}
            <a
              href="https://www.api-sports.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              api-sports.io
            </a>
            {' '}· Cache actualizado cada 24h
          </p>
        </div>
      </footer>
    </main>
  );
}
