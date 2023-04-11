import React, { useEffect, useState,useRef } from "react";
import axios from "axios";

const CountriesList = () => {
  const [countries, setCountries] = useState([]);
  const [segment,setSegment] = useState('all')
    const searchInput=useRef('')
  const getCountries = async () => {
    try {
      const result = await axios.get(`https://restcountries.com/v3.1/${segment}`);
      if (result.status === 200) {
             setCountries(result.data);
      }
     
    } catch (error) {
      console.error(error);
    }
  };

  //search

  const searchCountries = async (e) => {
    e.preventDefault()
        let search=searchInput.current.value
    if (search === '')  {
        alert('please write Sthg')
        return
    }
    setSegment(`name/${search}`)
    console.log('here the search ...')
 
    
  };

  useEffect(() => {
   getCountries()
  }, [segment]);

  return (
    <>
          <div className="row my-5">
        <div className="col-md-8">
          <h1 className="col-md-8">List of countries</h1>
        </div>

        <div className="col-md-4 text-right">
        <form className="d-flex" onSubmit={searchCountries}>
        <input className="form-control me-sm-2" type="search" placeholder="Search" ref={searchInput}/>
        <button className="btn btn-info my-2 my-sm-0" type="submit">Search</button>
        <button className="btn btn-danger my-2 my-sm-0" type="button">Reset</button>
      </form>
        </div>

        
      </div>

      <div className="row">
        { countries.map(country => (
            
                <div className="col-md-4">
                    <div className="card my-2">
                        <img className="card-img-top" src={country.flags.png} alt="Title"/>
                        <div className="card-body">
                            <h4 className="card-title">{country.name.official}</h4>
                            <p className="card-text">Region: {country.region}</p>
                            <p className="card-text">Capital : {country.capital}</p>
                        </div>
                    </div>
                </div>

        ))}
      </div>
    </>
  );
};

export default CountriesList;
