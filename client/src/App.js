import {  Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage/Landingpage.jsx';
import Home from './components/Home/Home.jsx';
import Details from './components/Details/Details.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Form from './components/Form/CreateVideogame.jsx';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<LandingPage />} />
        <Route exact path={'/home'} element={<Home />} />
        <Route path={'/details/:id'} element={<Details />} />
        <Route path={'/videogames'} element= {<Form />} />
      </Routes>
    </div>
  );
}


export default App;