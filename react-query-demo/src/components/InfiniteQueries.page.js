import axios from 'axios';
import React, { Fragment, useState } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query';

const fetchColors = ({pageParam = 1}) => {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page${pageParam}`);
}

const InfiniteQueries = () => {
    const {isLoading, isError, error, data, hasNextPage, fetchNextPage} = useInfiniteQuery(['colors'], fetchColors, {
        getNextPageParam: (_lastPage, pages) => {
            if(pages.length <4) {
                return pages.length +1;
            }else {
                return undefined;
            }
        }
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
            data?.pages.map((group, i) => {
                return (
                    <Fragment key={i}>
                        {
                            group.data.map(color => {
                                return <div key={color.id}>{color.id} - {color.label}</div>
                            })
                        }
                    </Fragment>
                )
            })
        }
        <div>
            <button disabled={!hasNextPage} onClick={fetchNextPage}>load more</button>
        </div>
    </>
  )
}

export default InfiniteQueries