import axios from "axios"
import { useState } from "react";
import { useQuery } from "react-query";

const fetchColors = (pageNumber) => {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
}
const PaginatedQueries = () => {
    const [pageNumber, setPageNumber] = useState(1);

    const {isLoading, isError, error, data} = useQuery(['colors', pageNumber], () =>fetchColors(pageNumber), {
        keepPreviousData: true,
    });


    if(isLoading) {
        return <h2>Loading...</h2>
    }

    if(isError) {
        return <h2 style={{color: 'red'}}>{error.message}</h2>
    }

  return (
    <>
        <div>PaginatedQueries</div>
        {
            data?.data.map((color) => {
                return <div key={color.id}>{color.id} - {color.label}</div>
            })
        }

        <div>
        <button onClick={()=> setPageNumber(page => page -1)} disabled={pageNumber === 1}>prev page</button>
        <button onClick={()=> setPageNumber(page => page +1)} disabled={pageNumber === 4}>next page</button>
        </div>
    </>
  )
}

export default PaginatedQueries