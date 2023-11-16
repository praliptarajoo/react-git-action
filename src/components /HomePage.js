import React, { useState, useEffect } from "react";
import "../styles/HomePage.css";

export const HomePage = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryList = data.map((country) => ({
          name: country.name.common,
          code: country.cca2,
        }));
        setCountries(countryList);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetch(
        `http://api.geonames.org/countryInfoJSON?country=${selectedCountry}&username=praliptadev`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.geonames && data.geonames.length > 0) {
            const geonameId = data.geonames[0].geonameId;
            if (geonameId) {
                fetch(
                    `http://api.geonames.org/childrenJSON?geonameId=${geonameId}&username=praliptadev`
                  ) 
                  .then((response) => response.json())
                  .then((dataVal) => {
                    if (dataVal && dataVal.geonames) {
                      const stateList = dataVal.geonames.map((state) => state.name);
                      setStates(stateList);
                      setSelectedState("");
                    } else {
                      setStates([]);
                      setSelectedState("");
                    }
                  })
                  .catch((error) => {
                    console.error("Error fetching states:", error);
                  });
            }
          } else {
            setStates([]);
            setSelectedState("");
          }
        })
        .catch((error) => {
          console.error("Error fetching states:", error);
        });
    } else {
      setStates([]);
      setSelectedState("");
    }
  }, [selectedCountry]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  return (
    <div className="home-page">
      <header className="header">
        <h1 className="title">Welcome to Trip Planner</h1>
        <p className="subtitle">Plan your dream vacation with ease</p>
      </header>

      <div className="content">
        <h2 className="heading">Find Your Destination</h2>
        <p className="description">
          Enter a location below to start planning your trip:
        </p>

        <form className="search-form">
          <div className="dropdowns-container">
            <select
              className="dropdown"
              value={selectedCountry}
              onChange={handleCountryChange}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>

            <select
              className="dropdown"
              value={selectedState}
              onChange={handleStateChange}
            >
              <option value="">Select State</option>
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>

            <select className="dropdown">
              <option value="">Select Place</option>
              <option value="place1">Place 1</option>
              <option value="place2">Place 2</option>
              <option value="place3">Place 3</option>
            </select>
          </div>

          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};
