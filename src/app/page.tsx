import React from 'react';
import PreRegHeader from './components/Pre-Reg-Header';
import HeroSection from './components/HeroSection';

const HomePage: React.FC = () => {
  return (
    <main className="max-w-screen-2xl mx-auto min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center sm:px-4 ">
     <PreRegHeader />
      <HeroSection />

      <footer className="w-full max-w-4xl py-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} BEIZ. All rights reserved.
      </footer>
    </main>
  );
};

export default HomePage;
