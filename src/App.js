


import React, { useState, useEffect } from 'react';
import {FormControl,Select,MenuItem, Card, CardContent, Box} from "@material-ui/core"
import "./App.css"

import InfoBox from './InfoBox';
import  MapBox from './Map';
import Table from './Table';
import LineGraph from './LineGraph'
import {sortDate} from './util';
import 'leaflet/dist/leaflet.css'


// baseURL https://disease.sh/v3/covid-19/countries

function App() {

  const baseURL = 'https://disease.sh/v3/covid-19/';

  const [countries, setContries] = useState([]);
  const [country, setContry] = useState('worldwide');
  const [countryInfo, setContryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([19.076090, 72.877426]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases');
  
  useEffect(async ()=>{
    const url = baseURL+'all';
        await fetch(url)
        .then(response =>response.json())
        .then(data =>{
            setContryInfo(data)
        }) 
  },[])

  useEffect(() => {
      const  getContries = async () => {
        let countriesUrl = baseURL+'countries';
        console.log(countriesUrl)
        await fetch(countriesUrl).then( (response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
          {
            name: country.country,
            value : country.countryInfo.iso2
          }));
          setContries(countries);
          const sortedData = sortDate(data);
          setTableData(sortedData);
          setMapCountries(data);

        })
      };
      getContries();
  },[])

  const onCountryChange = async event => {
    const countryCode = event.target.value ;
    setContry(countryCode);
    const url  = countryCode === 'worldwide' 
               ?  baseURL+'all'
               : baseURL+`countries/${countryCode}`;
    await fetch(url)
          .then(response =>response.json())
          .then(data =>{
                setContryInfo(data);
                setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
                setMapZoom(4)
          })            
  }


  return (
    <div>
      <div className="app">
        <div className='app__left'>
            <div className="app__header">
                <h1 className='app_headline'>Covid-19 <span className="app_subheadline">TRACKER</span> </h1>
                <FormControl className="app__dropdown">
                  <Select variant='outlined' 
                    onChange = {onCountryChange}
                    value={country} >
                    <MenuItem value='worldwide'>WorldWide</MenuItem>
                    {countries.map(country =>(
                      <MenuItem value={country.value}>{country.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
            </div>
            <div className="app__stats">
              <InfoBox 
              isRed
              active = {casesType === 'cases'}
              onClick = {e => setCasesType('cases')}
              title="Cases" 
              cases={countryInfo.todayCases} 
              total={countryInfo.cases} 
              ></InfoBox>
              <InfoBox 
              active = {casesType === 'recovered'}
              onClick = {e => setCasesType('recovered')}
              title="Recovered"
              cases={countryInfo.todayRecovered} 
              total={countryInfo.recovered}
              ></InfoBox>
              <InfoBox 
              isRed
              active = {casesType === 'deaths'}
              onClick = {e => setCasesType('deaths')}
              title="Deaths"
              cases={countryInfo.todayDeaths} 
              total={countryInfo.deaths} 
              ></InfoBox>

            </div>
            {/* map */}
            <MapBox casesType={casesType} countries ={mapCountries} center={mapCenter} zoom={mapZoom}  ></MapBox>

      </div>
        <div className="app__right">
          <Card className="app__right__card">
            <CardContent className="app__right__card__content">
              <h3 className='text__center'>Live cases by Country</h3>
              <Table countires = {tableData}></Table>
              <h3 className='text__center'>Worldwide new {casesType}</h3>
              <LineGraph
              casesType={casesType}
              ></LineGraph>
            </CardContent>
          </Card>
        </div>  
    </div>
      
      <Box className='footer'>
      </Box>
    </div>
  );
}

export default App;
