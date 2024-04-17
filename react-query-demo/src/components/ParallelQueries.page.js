import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

const fetchSuperHeroes = () => {
    return axios.get('http://localhost:4000/superheroes')
  }

  const fetchFriends = () => {
    return axios.get('http://localhost:4000/friends')
  }

const ParallelQueries = () => {
const {data: heroes} = useQuery('super-heroes', fetchSuperHeroes)
const {data: friends} = useQuery('friends', fetchFriends)

console.log(heroes, friends);
  return (
    <div>ParallelQueries</div>

  )
}

export default ParallelQueries