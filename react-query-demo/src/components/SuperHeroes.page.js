import axios from 'axios';
import React, { useEffect, useState } from 'react'

const SuperHeroes = () => {
  const [isLoading, setIsloading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    axios.get('http://localhost:4000/superheroes').then(res =>{
      setData(res.data);
      setIsloading(false);
    }).catch(err=> {
      setIsloading(false);
      setError(err.message);
    })
  }, []);
  if(isLoading) {
    return <h2>Loading...</h2>
  }

  if(error) {
    return <div style={{color: 'red'}}>{error}</div>
  }

  return (
    <>
      <h2> list SuperHeroes</h2>
      {data.map(item => {
        return <div key={item.name}>{item.name} - {item.alterego}</div>
      })}
    </>
  )
}

export default SuperHeroes