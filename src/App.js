import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import ETL from './pages/ETL';
import News from './pages/News';
import HeroSection from "./components/HeroSection";
import EsportsFooter from './components/EsportsFooter';
import ESL from './pages/ESL';
<<<<<<< Updated upstream
// import SendData from "./utils/SendData";
=======
import API from "./pages/API";
>>>>>>> Stashed changes

function App() {
  return (
    <BrowserRouter>
      <Navbar />
        <HeroSection />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/esl" element={<ESL />} />
          <Route path="/etl" element={<ETL />} />
          <Route path="/news" element={<News />} />
<<<<<<< Updated upstream
            {/* <Route path="/senddata" element={<SendData />} /> */}
=======
          <Route path="/senddata" element={<API />} />
>>>>>>> Stashed changes
        </Routes>
      </div>
      <EsportsFooter />
    </BrowserRouter>
  );
}

export default App;
