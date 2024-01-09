import "./App.css";
import Navbar from "./Components/Nav/Navbar";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./Components/Home/Home";
import Signup from "./Components/Signup/Signup";
import Footer from "./Components/Footer/Footer";
import { useEffect, useState } from "react";
import Movies from "./Components/Movies/Movies";
import TvShow from "./Components/TvShow/TvShow";
import People from "./Components/People/People";
import Login from "./Components/Login/Login";
import MoviesDetails from "./Components/MoviesDetails/MoviesDetails";
import TvDetails from "./Components/TvDetails/TvDetails";
import PersonDetails from "./Components/PersonDetails/PersonDetails";
import Active from "./Components/Active/Active";
import Noxe from "./Components/Noxe/Noxe";

function App() {
  const [DataSava, setDataSava] = useState(null);
  let Nav = useNavigate();
  function Bor(props) {
    if (localStorage.getItem("userData") === null) {
      return <Navigate to="/login" />;
    } else {
      return props.children;
    }
  }

  function logOut() {
    localStorage.removeItem("userData");
    Nav("/");
    setDataSava(null);
  }
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      storData();
    }
  }, []);

  function storData() {
    let dataStor = JSON.parse(localStorage.getItem("userData"));
    setDataSava(dataStor);
  }
  return (
    <>
      <header className="App-header">
        <Navbar exit={logOut} sendDataShowNav={DataSava} />
      </header>
      <div className="">
        <Routes>
          <Route path="/" element={<Noxe />} />

          <Route
            path="/login"
            element={
              <>
                <Login userSendData={storData} />
              </>
            }
          />
          <Route path="/home" element={<Home />} />

          <Route path="/active" element={<Active />}>
            <Route path=":emailVerify" element={<Active />} />
          </Route>
          <Route path="/moviesDetails" element={<MoviesDetails />}>
            <Route path=":id" element={<MoviesDetails />} />
          </Route>
          <Route path="/personDetails" element={<PersonDetails />}>
            <Route path=":id" element={<PersonDetails />} />
          </Route>
          <Route path="/tvDetails" element={<TvDetails />}>
            <Route path=":id" element={<TvDetails />} />
          </Route>

          <Route
            path="/register"
            element={
              <>
                <Signup />
              </>
            }
          />

          <Route path="/movies" element={<Movies />} />
          <Route path="/tvShow" element={<TvShow />} />
          <Route path="/people" element={<People />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
