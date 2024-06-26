import axios from "axios"
import { useQueries } from "react-query";

const fetchSuperHero = (heroId) => {
    return axios.get('http://localhost:4000/superheroes');
}
const DynamicParallel = ({heroIds}) => {
    const queryResult = useQueries( heroIds.map((id)=> {
        return {
            queryKey: ['super-hero', id],
            queryFn: () => fetchSuperHero(id),
        }
    }))

    console.log(queryResult);
  return (
    <div>DynamicParallel</div>
  )
}

export default DynamicParallel