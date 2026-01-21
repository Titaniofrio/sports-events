import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sports Events - Live Schedule',
  description: 'Watch football, tennis, and F1 events with live updates and intelligent caching',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
        <div className="min-h-screen">
          <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur">
            <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Sports Events
              </h1>
              <p className="text-slate-400 mt-1">Football • Tennis • Formula 1</p>
            </div>
          </header>

          <main className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            {children}
          </main>

          <footer className="border-t border-slate-800 bg-slate-900/50 backdrop-blur mt-16">
            <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-semibold text-slate-100 mb-2">About</h3>
                  <p className="text-slate-400 text-sm">
                    Real-time sports events aggregator with intelligent caching and 24-hour updates.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100 mb-2">Features</h3>
                  <ul className="text-slate-400 text-sm space-y-1">
                    <li>• Live event tracking</li>
                    <li>• Intelligent caching (24h)</li>
                    <li>• Colombia timezone support</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100 mb-2">Powered By</h3>
                  <ul className="text-slate-400 text-sm space-y-1">
                    <li>• API-Sports</li>
                    <li>• Vercel KV</li>
                    <li>• Next.js 14</li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400 text-sm">
                <p>&copy; 2026 Sports Events. Built with Next.js 14 + Vercel.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
