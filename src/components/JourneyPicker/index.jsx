import React, { useEffect, useState } from 'react';
import mapImage from './img/map.svg';
import './style.css';


const CityOptions = ({cities}) => {

  return (
    <>
    <option value="">Vyberte</option>
    {cities.map(city=><option key={city.code} value={city.name}>{city.name}</option>)}
    </>
  )
}

const DatesOptions = ({dates}) => {

  return (
    <>
      <option value="">Vyberte</option>
      {
        dates.map(
          date => <option key={date.dateBasic} value={date.dateBasic}>{date.dateExtended}</option>
          )
        }
    </>
  );
}


export const JourneyPicker = ({ onJourneyChange }) => {

  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [date, setDate] = useState("");
  const [cities, setCities] = useState([]);
  const [dates, setDates] = useState ([])

  useEffect(
    () => {
      fetch("https://leviexpress-backend.herokuapp.com/api/cities")
      .then(response => response.json())
      .then(json => setCities(json.data))
    },
    []
  )

  useEffect(
    () => {
      fetch("https://leviexpress-backend.herokuapp.com/api/dates")
      .then(response => response.json())
      .then(json => setDates(json.data))
    },
    []
  )

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(fromCity, toCity, date)
  }

  return (
  <div className="journey-picker container">
    <h2 className="journey-picker__head">Kam chcete jet?</h2>
    <div className="journey-picker__body">
      <form onSubmit={handleSubmit} className="journey-picker__form">
        <label>
          <div className="journey-picker__label">Odkud:</div>
          <select value={fromCity} onChange={(e) => setFromCity(e.target.value)}>
           <CityOptions cities={cities}/>
          </select>
        </label>
        <label>
          <div className="journey-picker__label">Kam:</div>
          <select value={toCity} onChange={(e) => setToCity(e.target.value)}>
          <CityOptions cities={cities}/>
          </select>
        </label>
        <label>
          <div className="journey-picker__label">Datum:</div>
          <select value={date} onChange={(e) => setDate(e.target.value)}>
          <DatesOptions dates={dates}/>
          </select>
        </label>
        <div className="journey-picker__controls">
          <button 
            className="btn" 
            type="submit"
          > Vyhledat spoj
          </button>
        </div>
      </form>
      <img className="journey-picker__map" src={mapImage} />
    </div>
  </div>
  );
}


