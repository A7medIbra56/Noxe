import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function PersonDetails() {
  const { id } = useParams();
  const [dataDetails, setDataDetails] = useState({});
  const [also_known_as , setGenres] = useState([])
  const[isLoading, setIsLoading] = useState(false)

  async function getApiDetails(movieId) {
    setIsLoading(true)
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/person/${movieId}?api_key=9e5c26ddbd024153e0cbee75447bc205`
);
      setDataDetails(data);
      setGenres(data.also_known_as)
      setIsLoading(false)
    } catch (error) {
    }
  }

  useEffect(() => {
  getApiDetails(id);

  }, [id]);


  return (

    <>
    {
      isLoading === false ? <>
      <div className='container mt-5'>
  <div className='row'>
    <div className='col-lg-4 col-md-4 col-sm-12'>
      <img className="w-100" src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${dataDetails.profile_path}`}alt="Atul Prajapati"></img>
    </div>
    <div className='col-lg-6 col-md-6 col-sm-12 p-4'>
     
    <h3>{dataDetails.place_of_birth}</h3>
    <h3 className='opacity-50 h4 pb-2'>{dataDetails.name}</h3>
    
    <div className='container p-0'>
    <div className='row'>
    {also_known_as.map((item , i)=>(
              <p className='rounded-2 me-2 text-bg-info text-center col-md-2' key={i}> {item}</p>
             ))}
      </div>
    </div>
   
      <p className='pt-2'><span className='pe-2'>Vote  :</span>{dataDetails.vote_average}</p>
      <p className='pt-2'><span className='pe-2'>Vote Count  :</span>{dataDetails.vote_count}</p>
      <p className='pt-2'> <span className='pe-2'>Popularity  :</span>{dataDetails.popularity}</p>
      <p className='pt-2'><span className='pe-2'>birthday :</span> {dataDetails.birthday}</p>
      <h6 className='mt-5 opacity-50 h4'>{dataDetails.overview}</h6>
    </div>
  </div>
</div>
      </> :<div className="vh-100 d-flex align-items-center justify-content-center">
      <i className="fas fa-spinner fa-spin"></i>
         </div>
    }

  </>
  );
}
