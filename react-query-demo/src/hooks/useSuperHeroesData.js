import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { request } from "../utils/axios-utils"

const fetchSuperHeroes = () => {
    // return axios.get('http://localhost:4000/superheroes')

    return request({url: '/superheroes'})
  }

  const addSuperHero = (hero) => {
    // return axios.post('http://localhost:4000/superheroes')

    return request({url: '/superheroes', method: 'POST', data: hero})
  }

export const useSuperHeroesData = (onSuccess, onError) => {
    return useQuery('super-heroes',fetchSuperHeroes, {
        onSuccess, onError,
        // select: (data) => {
        //     return data.data?.map(hero => hero.name) ?? []
        // }
    })
}

export const useAddSuperHeroData = () => {
    const queryClient = useQueryClient();
    return useMutation(addSuperHero, {
        // onSuccess: (data) => {
        //     // queryClient.invalidateQueries('super-heroes')
        //     queryClient.setQueryData('super-heroes', (oldQueryData) => {

        //         return {
        //             ...oldQueryData,
        //             data: [...oldQueryData.data, data]
        //         }
        //     });
        // }

        onMutate: async (newHero) => {
            await queryClient.cancelQueries('super-heroes');
            const previousHeroData = queryClient.getQueriesData('super-heroes');

            queryClient.setQueryData('super-heroes', (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [...oldQueryData.data, {id: oldQueryData?.data.length + 1, ...newHero}]
                }
            });

            return {
                previousHeroData,
            }
        },
        onError: (_error, _hero, context ) => {
            queryClient.setQueryData('super-heroes', context.previousHeroData)
        },
        onSettled: () => {
            queryClient.invalidateQueries('super-heroes')
        },
    })
}