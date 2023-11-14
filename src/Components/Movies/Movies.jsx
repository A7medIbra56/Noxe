import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Movies() {
  const [trendingMove, setTrendingMovie] = useState([]);
  let numPage = new Array(9).fill(1).map((item, i) => i + 1);
  const[isLoading, setIsLoading] = useState(false)
  const [colPageNum, setColPageNum] = useState(1);
  

  async function getMovies(pageNumber) {
    setIsLoading(true)
    setColPageNum(pageNumber);
    const res = await axios.get(
      ` https://api.themoviedb.org/3/trending/movie/day?api_key=9e5c26ddbd024153e0cbee75447bc205&page=${pageNumber}`
    );
    setTrendingMovie(res.data.results);
    setIsLoading(false)
    window.scrollTo(0, 0);
  }
  useEffect(() => {
    
    getMovies(colPageNum);
  }, [colPageNum]);


  return (
    <>
{ isLoading === false ? <>  <div className="container">
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
            <div key={i} className=" col-lg-2 col-md-4 g-4">
              <Link to={`/moviesDetails/${item.id}`}>
                <img
                  className="w-100"
                  src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path === null ? './img/person.png' : item.poster_path} `}
                  alt="Atul Prajapati"
                ></img>
                <div
                      className="progress dai-progress  rounded-0"
                      role="progressbar"
                    >
                    {
                      Math.floor(item.vote_average*10) <= 70 ? <div
                      className="dai-bar bar1 progress-bar "
                      style={{ width: `${item.vote_average*10}%` }}
                    >
                      <div className="progressDetails pt-3 d-flex">
                        <p>
                        {Math.floor(item.vote_average*10)} <span className="fe100">%</span>
                        </p>
                      </div>
                    </div> :<div
                      className="dai-bar bar2 progress-bar "
                      style={{ width: `${item.vote_average*10}%` }}
                    >
                      <div className="progressDetails pt-3 d-flex">
                        <p>
                        {Math.floor(item.vote_average*10)} <span className="fe100">%</span>
                        </p>
                      </div>
                    </div>
                    }


                      
                    </div>
                <h3 className="h6 pt-1">{item.title || item.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
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
      </> :<div className="vh-100 d-flex align-items-center justify-content-center">
      <i className="fas fa-spinner fa-spin"></i>
         </div>

}

    
    </>
  );
}

