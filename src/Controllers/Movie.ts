import movieLists from '../Schema/movieLists';
import { ExtendedExpressRequest } from '../Typings/movieModals';
import { Response, Request } from 'express';


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

export const searchMovie = async (req: Request, res: Response) => {
    try {
        let { q } = req.query;

        let data = await movieLists.find({
            $or: [
                { title: { $regex: q, $options: 'i' } },
                { genre: { $regex: q, $options: 'i' } }
            ]
        })

        return res.status(200).send({ status: 200, message: data });

    } catch (error) {
        console.log('error, error', error)
        return res.status(500).send({
            error: error,
            code: 500,
            message: 'Internal Server Error'
        });
    }
}

export const updateMovie = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let { title, genre, rating, streamingLink } = req.body;
        let updateBody: any = {};

        if (title) updateBody['title'] = title;
        if (genre) updateBody['genre'] = genre;
        if (rating) updateBody['rating'] = rating;
        if (streamingLink) updateBody['streamingLink'] = streamingLink;

        let check = await movieLists.findById(id);
        console.log('check', check)
        if (!check) return res.status(202).send({ status: 202, message: `No result found with ${id}`, data: check });

        let update = await movieLists.findOneAndUpdate({ _id: id }, updateBody, { new: true });

        return res.status(200).send({ status: 200, message: update });



    } catch (error) {
        console.log('error, error', error)
        return res.status(500).send({
            error: error,
            code: 500,
            message: 'Internal Server Error'
        });
    }
}

export const deleteMovie = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let deleteRecord = await movieLists.deleteOne({ _id: id })
        return res.status(200).send({ status: 200, message: deleteRecord });


    } catch (error) {
        console.log('error, error', error)
        return res.status(500).send({
            error: error,
            code: 500,
            message: 'Internal Server Error'
        });
    }
}

export const findAll = async (_req: Request, res: Response) => {
    try {
        let data = await movieLists.find();
        return res.status(200).send({ status: 200, message: data });

    } catch (error) {
        console.log('error, error', error)
        return res.status(500).send({
            error: error,
            code: 500,
            message: 'Internal Server Error'
        });
    };
};