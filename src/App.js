import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'


function App() {
  const [loading,setLoadig] = useState(true);
  const [tours,setTours] = useState([]);

  const removeTour = (id) =>{
    const newTours = tours.filter((tour) => tour.id !==id);
    setTours(newTours);
  }

  const fetchTours = async () => {
    setLoadig(true);
    try {
      const response = await fetch (url);
      const tours = await response.json();
      setLoadig(false);
      setTours(tours);
    } catch (error) {
      setLoadig(false);
      console.log(error);
    }
  };
  useState (()=> {
    fetchTours();
  },[] )
  if (loading) {
    return ( 
    <main>
      <Loading/> 
    </main>
    );
 }
 if(tours.length === 0) {
   return (
     <main>
       <div className="title">
         <h2>no tours left</h2>
         <button className="btn" onClick= {fetchTours}>refresh</button>
       </div>
     </main>
   )
 }
  return (
     <main>
       <Tours tours={tours} removeTour={removeTour}/>
     </main>
  );
}

export default App
