import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function TvDetails() {
  const { id } = useParams();
  const [dataDetails, setDataDetails] = useState({});
  const [genres , setGenres] = useState([])
  const[isLoading, setIsLoading] = useState(false)

  async function getApiDetails(movieId) {
    setIsLoading(true)
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/tv/${movieId}?api_key=9e5c26ddbd024153e0cbee75447bc205`
);
      setDataDetails(data);
      setGenres(data.genres)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  }

  useEffect(() => {
  getApiDetails(id);

  }, [id]);


  return (

    <>
    {isLoading === false ?<>
      <div style={{
  backgroundImage: `url(https://image.tmdb.org/t/p/w300/t/p/w1920_and_h800_multi_faces/${dataDetails.backdrop_path})`, backgroundSize: 'cover'}} className="image-container">
       
        <div className="rgbaBg">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-12">
                <img
                  className="w-100 mt-4 mb-3"
                  src={`https://image.tmdb.org/t/p/w300${dataDetails.poster_path} `}
                  alt="Atul Prajapati"
                ></img>
              </div>
              <div className="col-lg-9 col-md-6 col-sm-12 p-4">
                <h3>{dataDetails.tagline}</h3>
                <h3 className="h4">{dataDetails.original_title}</h3>

                <div className="d-flex">
                  {genres.map((item, i) => (
                    <p className="rounded-2 p-1 me-2 text-bg-info" key={i}>

                      {item.name}
                    </p>
                  ))}
                </div>
                
                <p className="pt-2">
                  <span className="pe-2">Vote :</span>
                  {dataDetails.vote_average}
                </p>
                <p className="pt-2">
                  <span className="pe-2">Vote Count :</span>
                  {dataDetails.vote_count}
                </p>
                <p className="pt-2">
                  {" "}
                  <span className="pe-2">Popularity :</span>
                  {dataDetails.popularity}
                </p>
                <p className="pt-2">
                  <span className="pe-2">Release Date :</span>{" "}
                  {dataDetails.release_date}
                </p>
                <h6 className="mt-5 h4">{dataDetails.overview}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    
    </>:<div className="vh-100 d-flex align-items-center justify-content-center">
      <i className="fas fa-spinner fa-spin"></i>
         </div>

    }
     
    </>
  );
}
