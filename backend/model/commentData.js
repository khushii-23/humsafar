import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const commentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: {
        type: String
    },
    dateTime: {
        type: String
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }
});

export default model('Comment', commentSchema);
