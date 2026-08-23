import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Cursor from './components/Cursor.jsx';
import PageTransition from './components/PageTransition.jsx';

import Home from './pages/Home.jsx';
import Customize from './pages/Customize.jsx';
import Portfolio from './pages/Portfolio.jsx';
import Process from './pages/Process.jsx';
import Contact from './pages/Contact.jsx';

export default function App(){
  const location = useLocation();
  const [isTouch] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches
  );

  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  return (
    <>
      {!isTouch && <Cursor />}
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/customize" element={<PageTransition><Customize /></PageTransition>} />
          <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
          <Route path="/process" element={<PageTransition><Process /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}
