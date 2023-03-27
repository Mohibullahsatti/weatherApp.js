import React, {useState, useEffect} from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWater, faWind, faSearch, faLocationDot, faBars, faSun } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`;
        axios.get(url).then((response) => {
          const address = response.data.results[0].formatted_address;
          setLocation(address);
        });
      });
    }
  }, []);

  const searchLocation = () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=8d29cd5746ca850b0258d86d3ee349cf&units=metric`;
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchLocation();
    }
  };


  return (
    <div className="app">
      <header className="headerTop">
        <FontAwesomeIcon icon={faBars} className="fa-sharp" />
        Forecast Mate Weather App</header>

        <p className="headline">
        <FontAwesomeIcon icon={faSun} className="fa-thin" /> "Plan your day with confidence using our accurate and reliable weather data." 
         <span className="location-line">(Just Enter Your Location)</span>
         <FontAwesomeIcon icon={faSun} className="fa-thin" />
        </p>

     

      <div className="main">
       <div className="search-input-container">
        <FontAwesomeIcon className="map-icon" icon={faLocationDot} />
            <input 
              className="input"
              value={location}
              onChange={event => setLocation(event.target.value)}
              onKeyUp={handleKeyPress}
              placeholder='Enter Your Location'
              type="text"
            />
          
            <button className="search-button" onClick={searchLocation}>
            <FontAwesomeIcon className="search-icon" icon={faSearch} />
              </button>
          </div>

          <div className="image-container">
          <div className="center">
            <div className="cloud"></div>
              <ul className="sun">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
        


       <div className="below-image">
          <div className="location">
            <p>{data.name}</p>
          </div>

            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}<span className = "centiSign"> °C</span></h1> : null}
            </div>

         <div className="description">
            {data.weather ? <p>{data.weather[0].main }</p>: null}
          </div>
      </div>
        
     
      <div className="humidity">
       <div className="humidity-icon">
       <FontAwesomeIcon icon={faWater}/>
       </div>
      
      <div className="humidity-data">
      {data.main ? <p className="bold" >{data.main.humidity}%</p> : null}
        <p>Humidity</p>
      </div>

      </div>


      <div className="wind">
      <div className="wind-icon">
      <FontAwesomeIcon icon={faWind} />
      </div>

      <div className="wind-data">
      {data.wind ? <p className="bold" >{data.wind.speed.toFixed()} Km/h</p> : null}
        <p> WindSpeed</p>
      </div>
      </div>
    </div> 
            
  </div>    
   
  );
}

export default App;
