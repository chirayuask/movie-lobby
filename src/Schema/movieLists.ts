import mongoose from "mongoose";

const movieListsSchema = new mongoose.Schema({
    title: String,
    genre: String,
    rating: String,
    streamingLink: String,
})


export default mongoose.model('movieLists', movieListsSchema, 'MovieLists');