import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const blogSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    title: {
        type: String
    },
    body: {
        type: String
    },
    description: {
        type: String
    },
    images: [String],
    location: {
        type: String
    }
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
