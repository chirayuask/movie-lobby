import movieLists from '../Schema/movieLists';
import { ExtendedExpressRequest } from '../Typings/movieModals';
import { Response } from 'express';


export const createMovie = async (req: ExtendedExpressRequest, res: Response) => {
    try {
        let { title, genre, rating, streamingLink } = req.body;

        let save = await movieLists.create({ title, genre, rating, streamingLink })

        return res.status(200).send({ status: 200, message: save });

    } catch (error) {
        console.log('error, error', error)
        return res.status(500).send({
            error: error,
            code: 500,
            message: 'Internal Server Error'
        });
    }
}