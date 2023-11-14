import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../image/logo-dark.webp"
export default function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="Home">
          <img src={logo} alt="." />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {props.sendDataShowNav === null ? (
              ""
            ) : (
              <>
                <li className="nav-item">
                  <div className="lineNav">

                  </div>
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="home"
                  >
                    Home
                  </Link>
                   <div className="lineNav">

                  </div>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="movies">
                    Movies
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="tvShow">
                    Tv Show
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="people">
                    People
                  </Link>
                </li>
              
              </>
            )}
          </ul>
{
  props.sendDataShowNav === null ?'' :<> <div className="icon p-3">
  <i className="fa-brands fa-youtube p-2"></i>
  <i className="fa-brands fa-facebook p-2"></i>
  <i className="fa-brands fa-spotify p-2"></i>
  <i className="fa-brands fa-instagram p-2"></i>
</div>
<form className="d-flex" role="search">
  <input
    className="form-control me-2"
    type="search"
    placeholder="Search"
    aria-label="Search"
  />
</form></>
}
         
          {
            props.sendDataShowNav === null ? '' : <Link to='login' onClick={()=>{props.exit()}} className="nav-link"> 
            Logout
          </Link>
          }
         
          {props.sendDataShowNav ? (
            ""
          ) : (
           <> <Link className="nav-link" to="login">
           logIn
         </Link>
         <Link className="nav-link" to="register">
         Register
       </Link></>
          )}
          
        </div>
      </div>
      <div className="icon"></div>
    </nav>
  );
}
