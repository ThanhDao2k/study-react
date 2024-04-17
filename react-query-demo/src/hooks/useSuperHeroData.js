import axios from "axios"
import { useQuery, useQueryClient } from "react-query"


const fetchSuperHeroData = ({queryKey}) => {
    const heroId = queryKey[1];
    return axios.get(`http://localhost:4000/superheroes/${heroId}`);
}

export const useSuperHeroData = (heroId) => {
    const queryClient = useQueryClient();

    return useQuery(['hero-data', heroId],fetchSuperHeroData, {
        initialData: () => {
            const hero = queryClient.getQueryData('super-heroes')?.data?.find(hero => hero.id === parseInt(heroId));

            if(hero) {
                return {
                    data: hero
                }
            }

            return undefined;
        }
    })
}