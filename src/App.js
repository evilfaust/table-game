import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import ETL4 from './pages/ETL4';
import News from './pages/News';
import HeroSection from "./components/HeroSection";
import EsportsFooter from './components/EsportsFooter';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
        <HeroSection />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/etl4" element={<ETL4 />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </div>
      <EsportsFooter />
    </BrowserRouter>
  );
}

export default App;
