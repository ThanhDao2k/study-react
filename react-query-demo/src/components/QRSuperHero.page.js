import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/useSuperHeroData";

const QRSuperHero = () => {
  const {heroId} = useParams();

  const {data, isLoading, isFetching, isError, error} = useSuperHeroData(heroId);

  if(isLoading || isFetching) {
    return <h2>Loading...</h2>
  }

  if(isError) {
    return <h2 style={{color: 'red'}}>{error.message}</h2>
  }
  return (
    <>
      <h2>super hero detail</h2>
      <div>{data?.data.name} - {data?.data.alterego}</div>
    </>
  )
}

export default QRSuperHero