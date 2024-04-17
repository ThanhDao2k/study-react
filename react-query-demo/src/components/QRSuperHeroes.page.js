import React, { useState } from 'react'
import { useAddSuperHeroData, useSuperHeroesData } from '../hooks/useSuperHeroesData'
import { Link } from 'react-router-dom';


const QRSuperHeroes = () => {
  const onSuccess = (data) => {
    console.log('onSuccess', data);
  }

  const onError = (error) => {
    console.log('onError', error);
  }

  const {isLoading, data, isError, error, isFetching, refetch} = useSuperHeroesData(onSuccess, onError);

  const {mutate: addHero} = useAddSuperHeroData();

  const [name, setName] = useState('');
  const [alterEgo, setAlterEgo] = useState('');

  const handleAddHeroClick = () => {
    const hero = {name, alterEgo};
    addHero(hero);
  }


  if(isLoading || isFetching) {
    return <h2>Loading...</h2>
  }

  if(isError) {
    return <div style={{color: 'red'}}>{error.message}</div>
  }

  return (
    <>
    <div>
      <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
      <input type='text' value={alterEgo} onChange={(e) => setAlterEgo(e.target.value)} />
      <button onClick={handleAddHeroClick}>add Hero</button>
    </div>
    <button onClick={refetch}>fetch Hero</button>
      <h2> list QRSuperHeroes</h2>
      {data?.data.map(item => {
        return <div key={item.id}><Link to ={`/rq-super-heroes/${item.id}`}>{item.name} - {item.alterego}</Link></div>
      })}
    </>
  )
}

export default QRSuperHeroes