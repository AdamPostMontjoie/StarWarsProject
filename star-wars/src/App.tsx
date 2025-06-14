import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About";
import Starships from "./pages/Starships/Starships";
import Characters from "./pages/Characters/Characters";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/starships' element={<Starships/>} />
        <Route path='/characters' element={<Characters/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;