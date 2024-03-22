import { RedisFacadeClient } from '.';
import { secretKeys } from '../Config/env';
import movieLists from '../Schema/movieLists';
import { movieSchema } from '../Typings/movieModals';



export const getAllMovies = async () => {
    try {
        const key = `${secretKeys.REDIS_PREFIX}-get-all-movies`;
        const data = await RedisFacadeClient.getData(key);
        if (data) return data
        else {
            let moviesData: movieSchema | {} = await movieLists.find();
            await RedisFacadeClient.setData(key, moviesData);
            return moviesData;
        }
    } catch (error) {
        console.log('error', error)
        throw error
    }
}

export const getSearchMovies = async (q: any) => {
    try {
        const key = `${secretKeys.REDIS_PREFIX}-get-search-movies-${q}`;
        const data = await RedisFacadeClient.getData(key);
        if (data) return data
        else {
            let searchData: movieSchema | {} = await movieLists.find({
                $or: [
                    { title: { $regex: q, $options: 'i' } },
                    { genre: { $regex: q, $options: 'i' } }
                ]
            });
            await RedisFacadeClient.setData(key, searchData);
            return searchData;
        }
    } catch (error) {
        throw error
    }
}