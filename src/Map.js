
import React from 'react';
import {Map as LeafletMap, TileLayer, Circle} from 'react-leaflet';
import './Map.css'
import {showDataOnMap} from './util'


// baseURL https://disease.sh/v3/covid-19/countries

function MapBox({countries,casesType, center,zoom}) {


  return (
    <div className='map'>
        <LeafletMap center={center} zoom={zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {showDataOnMap(countries , casesType)}
    </LeafletMap>
    </div>
  )
}

export default MapBox;
