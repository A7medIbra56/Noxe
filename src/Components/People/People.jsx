import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import person from "../image/person.jpg";

export default function People() {
  const [trendingPerson, setTrendingPerson] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let numPage = new Array(9).fill(1).map((item, i) => i + 1);
  const [colPageNum, setColPageNum] = useState(10);

  async function getMovies(pageNumber) {
    setIsLoading(true);
    setColPageNum(pageNumber);
    const res = await axios.get(
      ` https://api.themoviedb.org/3/trending/person/day?api_key=9e5c26ddbd024153e0cbee75447bc205&page=${pageNumber}`
    );
    setTrendingPerson(res.data.results);
    setIsLoading(false);
  }

  useEffect(() => {
    getMovies(1);
  }, []);

  return (
    <>
      {isLoading === false ? (
        <>
          <div className="container">
            <div className="row">
              {trendingPerson.map((item, i) => (
                <div key={i} className=" col-lg-2 col-md-4 gy-4">
                  <Link to={`/personDetails/${item.id}`}>
                    {item.profile_path === null ? (
                      <img
                        className="w-100 rounded-3"
                        src={person}
                        alt="Atul Prajapati"
                      ></img>
                    ) : (
                      <img
                        className="w-100 rounded-3"
                        src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.profile_path}`}
                        alt=".."
                      />
                      
                    )}
                    
                    <h3 className="h6 pt-1">{item.title || item.name}</h3>
                  </Link>
                </div>
              ))}
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center pt-3">
                  {numPage.map((item) => (
                    <li
                      key={item}
                      onClick={() => getMovies(item)}
                      className={`${
                        colPageNum === item
                          ? `page-link text-bg-danger`
                          : `page-link text-bg-info`
                      }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </nav>
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
