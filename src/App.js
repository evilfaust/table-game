import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import Navbar from './components/base/Navbar';
import HeroSection from './components/base/HeroSection';
import SecondaryMenu from './components/SecondaryMenu';
import EsportsFooter from './components/base/EsportsFooter';

// Страницы
import Home from './pages/Home';
import About from './pages/About';
import ETL from './pages/ETL';
import News from './pages/News';
import ESL from './pages/ESL';
import Login from './pages/Login';
import API from './pages/API';

// Компоненты для авторизованных пользователей
import PrivateRoute from './components/PrivateRoute';
import TelegramAuth from './components/TelegramAuth';
import ApplicationStatus from './components/ApplicationStatus';
import ModeratorDashboard from './components/ModeratorDashboard';
import AplicationList from "./components/AplicationList";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <HeroSection />
        <SecondaryMenu /> {/* Дополнительное меню, которое видно только авторизованным пользователям */}
        <div className="container">
          <Routes>
            {/* Открытые страницы */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/esl" element={<ESL />} />
            <Route path="/etl" element={<ETL />} />
            <Route path="/news" element={<News />} />
            <Route path="/senddata" element={<API />} />

            {/* Страница входа через Telegram */}
            <Route path="/login" element={<TelegramAuth />} />

            {/* Страницы для авторизованных пользователей */}
            <Route
              path="/team-application"
              element={
                <PrivateRoute>
                  <Login />
                </PrivateRoute>
              }
            />
            <Route
              path="/application-status"
              element={
                <PrivateRoute>
                  <AplicationList />
                </PrivateRoute>
              }
            />

            {/* Страницы, доступные только модераторам */}
            <Route
              path="/moderator"
              element={
                <PrivateRoute moderatorOnly={true}>
                  <ModeratorDashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
        <EsportsFooter />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;



// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Navbar from './components/base/Navbar';
// import Home from './pages/Home';
// import About from './pages/About';
// import ETL from './pages/ETL';
// import News from './pages/News';
// import HeroSection from "./components/base/HeroSection";
// import EsportsFooter from './components/base/EsportsFooter';
// import ESL from './pages/ESL';
// import Login from './pages/Login';
// import PrivateRoute from './components/PrivateRoute';
// import TelegramAuth from "./components/TelegramAuth";
// import ApplicationStatus from "./components/ApplicationStatus";
// import ModeratorDashboard from "./components/ModeratorDashboard";
// import API from "./pages/API"; // импортируем обёртку
//
// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <HeroSection />
//       <div className="container">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/esl" element={<ESL />} />
//           <Route path="/etl" element={<ETL />} />
//           <Route path="/news" element={<News />} />
//           <Route path="/senddata" element={<API />} />
//           {/* Защищённый маршрут для регистрации команды */}
//           <Route
//             path="/team-application"
//             element={
//               <PrivateRoute>
//                 <Login />
//               </PrivateRoute>
//             }
//           />
//             {/* Добавьте маршрут для страницы входа, если потребуется */}
//             <Route path="/login" element={<TelegramAuth />} />
//             <Route path="/application-status" element={<ApplicationStatus />} />
//             <Route path="/moderator" element={<ModeratorDashboard />} />
//         </Routes>
//       </div>
//       <EsportsFooter />
//     </BrowserRouter>
//   );
// }
//
// export default App;
