import React, { useState } from 'react'
import useFetch from '../hooks/useFetch'
import Spinner from './Spinner'
import "./TripList.css"

const TripList = () => {
    const [url, setUrl] = useState(['http://localhost:3000/trips'])
    const { data:trips, loading, error} = useFetch(url,'elio')
  return (
    <div className='trip-list'>
        <h2>trip list</h2>
        {loading && <Spinner/>}
        {error && <div>{error}</div>}
        <ul>
          {
           trips && trips.map(trip=> (
              <li key={trip.id}>
                <h3>{trip.title}</h3>
                <p>{trip.price}</p>
              </li>
            ))
          }
        </ul>
         
        <div className='filters'>
          <button onClick={() => setUrl("http://localhost:3000/trips?loc=europe")}>
            european trips
          </button>
          <button onClick={() => setUrl("http://localhost:3000/trips")}>
            All trips
          </button>
          <button onClick={() => setUrl("http://localhost:3000/trips?phone=1")}> American Numbers</button>
        </div>
    </div>
  )
}

export default TripList
