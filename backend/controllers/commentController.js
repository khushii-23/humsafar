import Comment from '../model/commentData.js';

// Controller to post a comment
export const postComment = async (req, res) => {
    const { userId, comment, dateTime, blogId } = req.body;
    try {
        const newComment = new Comment({ userId, comment, dateTime, blogId });
        await newComment.save();
        res.status(201).json({ success: true });
    } catch (error) {
        console.error('Error posting comment:', error);
        res.status(500).json({ success: false, message: 'Failed to post comment' });
    }
};

// Controller to get comments for a specific blog
export const getComments = async (req, res) => {
    const { blogId } = req.params;
    try {
        const comments = await Comment.find({ blogId }).populate('userId', 'firstName lastName').exec();
        res.status(200).json({ success: true, comments });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch comments' });
    }
};
