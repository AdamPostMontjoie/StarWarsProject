import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About";
import Starships from "./pages/Starships/Starships";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";
import Account from "./pages/Account/Account";
import Battle from "./pages/Battle/Battle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/starships' element={<Starships/>} />
         <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/account' element={<Account/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;