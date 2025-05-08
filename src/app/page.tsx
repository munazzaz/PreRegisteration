// src/app/page.tsx
import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center px-4">
      {/* Header */}
      <header className="w-full max-w-4xl py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">BEIZ</h1>
        <nav>
          <Link href="/signup" className="px-4 py-2 text-gray-700 hover:text-gray-900">
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-16 space-y-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Join the Future of Commerce
        </h2>
        <p className="text-lg text-gray-600 max-w-xl">
          BEIZ is building a marketplace where vendors and supporters connect seamlessly.
          Pre-register now to get early access and special benefits.
        </p>
        <Link
          href="/signup"
          className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Pre-Register Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-4xl py-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} BEIZ. All rights reserved.
      </footer>
    </main>
  );
};

export default HomePage;
