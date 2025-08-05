import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About";
import Starships from "./pages/Starships/Starships";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";
import NotFoundPage from "./components/NotFoundPage";
import { StarBackground } from "./components/StarBackground";
import { CSSProperties } from "react";

function App() {
  const appStyles:CSSProperties = {
    minHeight: '100vh',
    backgroundColor: '#0A0E17',
    color: '#E5E7EB',
    fontFamily: "'Roboto', sans-serif",
    position: 'relative',
    overflow: 'hidden',
  };

  const contentStyles:CSSProperties = {
    position: 'relative',
    zIndex: 10,
  };

  return (
    <BrowserRouter>
      <div style={appStyles}>
        <StarBackground />
        <div style={contentStyles}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path='/starships' element={<Starships/>} />
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;