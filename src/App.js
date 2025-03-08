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
import TeamApplication from './pages/TeamApplication';
import PrivateRoute from './components/PrivateRoute';
import TelegramAuth from "./components/TelegramAuth";
import ApplicationStatus from "./components/ApplicationStatus";
import ModeratorDashboard from "./components/ModeratorDashboard";
import API from "./pages/API"; // импортируем обёртку

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
            <Route path="/senddata" element={<API />} />
          {/* Защищённый маршрут для регистрации команды */}
          <Route
            path="/team-application"
            element={
              <PrivateRoute>
                <TeamApplication />
              </PrivateRoute>
            }
          />
            {/* Добавьте маршрут для страницы входа, если потребуется */}
            <Route path="/login" element={<TelegramAuth />} />
            <Route path="/application-status" element={<ApplicationStatus />} />
            <Route path="/moderator" element={<ModeratorDashboard />} />
        </Routes>
      </div>
      <EsportsFooter />
    </BrowserRouter>
  );
}

export default App;


// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import About from './pages/About';
// import ETL from './pages/ETL';
// import News from './pages/News';
// import HeroSection from "./components/HeroSection";
// import EsportsFooter from './components/EsportsFooter';
// import ESL from './pages/ESL';
// // import SendData from "./utils/SendData";
//
// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//         <HeroSection />
//       <div className="container">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/esl" element={<ESL />} />
//           <Route path="/etl" element={<ETL />} />
//           <Route path="/news" element={<News />} />
//             {/* <Route path="/senddata" element={<SendData />} /> */}
//         </Routes>
//       </div>
//       <EsportsFooter />
//     </BrowserRouter>
//   );
// }
//
// export default App;
