import mongoose from 'mongoose';

const credential = mongoose.Schema(
    {
        _id: Number,
        password: {
            type: String,
            require: true,
        }
    }, { versionKey: false }
);

var users = mongoose.model('credential', credential);
module.exports = users;
