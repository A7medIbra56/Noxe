import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  const [trendingMove, setTrendingMovie] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  const [trendingPerson, setTrendingPerson] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getMovies(Movies, callback) {
    setIsLoading(true);
    const res = await axios.get(
      ` https://api.themoviedb.org/3/trending/${Movies}/day?api_key=9e5c26ddbd024153e0cbee75447bc205`
    );
    callback(res.data.results.slice(0, 10));
    setIsLoading(false);
  }

  useEffect(() => {
    getMovies("movie", setTrendingMovie);
    getMovies("tv", setTrendingTv);
    getMovies("person", setTrendingPerson);
  }, []);

  return (
    <>
      {isLoading === false ? (
        <>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="imgHad">
                  <div className="Hide">
                    <div
                      id="carouselExampleIndicators"
                      className="carousel slide"
                    >
                      <div className="carousel-inner">
                        <div className="carousel-item active">
                          <div className="container">
                            <h2 className="h1">
                              <strong>OUR LATEST MOVIES</strong>{" "}
                            </h2>
                          </div>
                          <div className="container">
                            <div className="row">
                              {trendingMove.slice(0, 6).map((item, i) => (
                                <div key={i} className="col-md-2 ">
                                  <img
                                    className="w-100 rounded-3"
                                    src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`}
                                    alt="Atul Prajapati"
                                  ></img>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="carousel-item">
                          <div className="container">
                            <h2 className="h1">
                              <strong>OUR LATEST TV</strong>{" "}
                            </h2>
                          </div>
                          <div className="container">
                            <div className="row">
                              {trendingTv.slice(0, 6).map((item, i) => (
                                <div key={i} className="col-md-2 ">
                                  <img
                                    className="w-100 rounded-3"
                                    src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`}
                                    alt="Atul Prajapati"
                                  ></img>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-indicators position-relative mt-4">
                        <button
                          type="button"
                          data-bs-target="#carouselExampleIndicators"
                          data-bs-slide-to="0"
                          className="active p-1"
                          aria-current="true"
                          aria-label="Slide 1"
                        ></button>
                        <button
                          type="button"
                          className="p-1"
                          data-bs-target="#carouselExampleIndicators"
                          data-bs-slide-to="1"
                          aria-label="Slide 2"
                        ></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6 mt-4">
                <div className="after"></div>
                <div className="most mt-4 pt-3">
                  <h4>trending</h4>
                  <h4>Movies</h4>
                  <h4>To watch Now</h4>
                  <p>Most watched Movies by days</p>
                </div>

                <div className="before"></div>
              </div>
              {trendingMove.map((item, i) => (
                <div key={i} className=" col-lg-2 col-md-4 g-4 ">
                  <Link to={`/moviesDetails/${item.id}`}>
                    <img
                      className="w-100 rounded-3"
                      src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`}
                      alt="Atul Prajapati"
                    ></img>
                    <div
                      className="progress dai-progress  rounded-0"
                      role="progressbar"
                    >
                      {Math.floor(item.vote_average * 10) <= 70 ? (
                        <div
                          className="dai-bar bar1 progress-bar "
                          style={{ width: `${item.vote_average * 10}%` }}
                        >
                          <div className="progressDetails pt-3 d-flex">
                            <p>
                              {Math.floor(item.vote_average * 10)}{" "}
                              <span className="fe100">%</span>
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="dai-bar bar2 progress-bar "
                          style={{ width: `${item.vote_average * 10}%` }}
                        >
                          <div className="progressDetails pt-3 d-flex">
                            <p>
                              {Math.floor(item.vote_average * 10)}{" "}
                              <span className="fe100">%</span>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    <h3 className="h6 ">{item.title || item.name}</h3>
                    <h3 className="h6 opacity-50">{item.release_date}</h3>
                  </Link>
                </div>
              ))}
              <div className="col-lg-4 col-md-6 mt-4">
                <div className="after"></div>
                <div className="most mt-4 pt-3">
                  <h4>trending</h4>
                  <h4>Tv</h4>
                  <h4>To watch Now</h4>
                  <p>Most watched Tv by days</p>
                </div>

                <div className="before"></div>
              </div>
              {trendingTv.map((item, i) => (
                <div key={i} className=" col-lg-2 col-md-4 g-4">
                  <Link to={`/tvDetails/${item.id}`}>
                    <img
                      className="w-100 rounded-3"
                      src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path} `}
                      alt="Atul Prajapati"
                    ></img>
                    <div
                      className="progress dai-progress  rounded-0"
                      role="progressbar"
                    >
                      {Math.floor(item.vote_average * 10) <= 70 ? (
                        <div
                          className="dai-bar bar1 progress-bar "
                          style={{ width: `${item.vote_average * 10}%` }}
                        >
                          <div className="progressDetails pt-3 d-flex">
                            <p>
                              {Math.floor(item.vote_average * 10)}{" "}
                              <span className="fe100">%</span>
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="dai-bar bar2 progress-bar "
                          style={{ width: `${item.vote_average * 10}%` }}
                        >
                          <div className="progressDetails pt-3 d-flex">
                            <p>
                              {Math.floor(item.vote_average * 10)}{" "}
                              <span className="fe100">%</span>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    <h3 className="h6 pt-1">{item.title || item.name}</h3>
                  </Link>
                </div>
              ))}
              <div className="col-lg-4 col-md-6 mt-4">
                <div className="after"></div>
                <div className="most mt-4 pt-3">
                  <h4>trending</h4>
                  <h4>People</h4>
                  <h4>To watch Now</h4>
                  <p>Most watched People by days</p>
                </div>

                <div className="before"></div>
              </div>
              {trendingPerson.map((item, i) => (
                <div key={i} className=" col-lg-2 col-md-4 g-4">
                  <Link to={`/personDetails/${item.id}`}>
                    <img
                      className="w-100 rounded-3"
                      src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.profile_path} `}
                      alt="Atul Prajapati"
                    ></img>
                    <h3 className="h6 pt-1">{item.title || item.name}</h3>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
      )}
    </>
  );
}
