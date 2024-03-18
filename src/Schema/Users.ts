import mongoose from 'mongoose';

const UsersSchema = new mongoose.Schema({
    userName: String,
    password: String,
    role: String
})

export default mongoose.model('users', UsersSchema, 'Users')