import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCountryInfo, setSelectedCountryInfo] = useState(null);



  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v2/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);



  useEffect(() => {
    const selectedCountryData = countries.find(country => country.name === selectedCountry);
    setSelectedCountryInfo(selectedCountryData);
  }, [selectedCountry, countries]);

  const handleSelectChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const getFullCountryName = (countryCode) => {
    const country = countries.find(country => country.alpha3Code === countryCode);
    return country ? country.name : countryCode;
  };



  return (
    <div className="App">
      <select className='CountrySelect' value={selectedCountry} onChange={handleSelectChange}>
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country.alpha3Code} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>


      {selectedCountryInfo && (
        <section>
          <article className='CountryInfo'>

            <div className='countryNameFlag'>
              <h1>
                {selectedCountryInfo.name}
              </h1>
              <div>
                <img src={selectedCountryInfo.flag} alt={selectedCountryInfo.name} />
              </div>
            </div>

            <div className='infoDetails'>

              <div className='leftInfo'>
                <h4>
                  Capital: {selectedCountryInfo.capital}
                </h4>
                <h4>
                  Currency: {selectedCountryInfo.currencies.map(currency => currency.name).join(', ')}
                </h4>
                <h4>
                  Continent: {selectedCountryInfo.region}
                </h4>
              </div>

              <div className='rightInfo'>
                <h4>
                  Population: {selectedCountryInfo.population.toLocaleString()}
                </h4>
                <h4>
                  Borders: {selectedCountryInfo.borders.map(getFullCountryName).join(', ')}
                </h4>
              </div>
            </div>
          </article>
        </section>
      )}


    </div>
  );
}

export default App;
