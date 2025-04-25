import Blog from '../model/blogData.js';
import TravelTip from '../model/travelTips.js';

export const createBlog = async (req, res) => {
    console.log(req.body.tags);
    try {
        const {
            userId,
            title,
            body,
            dateTime,
            necessaryItems,
            typeOfWear,
            tags,
            category,
            locationName,
            nativeLanguage,
            locationObj,
            localCuisine,
            cultureInsights,
            nearestCommute,
            travelChallenges,
            solutions
        } = req.body;
        const images = req.files.map(file => file.path);

        const newBlog = new Blog({
            userId,
            title,
            body,
            description: body.substring(0, 100),
            dateTime,
            images,
        });

        await newBlog.save();

        const newTravelTip = new TravelTip({
            userId: userId,
            blogId: newBlog._id,
            necessaryItems,
            typeOfWear,
            tags,
            category,
            locationName,
            nativeLanguage,
            locationObj,
            localCuisine,
            cultureInsights,
            nearestCommute,
            travelChallenges,
            solutions
        });

        await newTravelTip.save();

        res.status(201).json({ success: true, message: 'Blog post created successfully', blog: newBlog });
    } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).json({ success: false, error: 'Failed to create blog post' });
    }
};

export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({ success: true, blogs });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch blogs' });
    }
};

export const getTravelTips = async (req, res) => {
    try {
        const travelTip = await TravelTip.findOne({ blogId: req.params.blogId });
        res.status(200).json({ success: true, travelTip });
    } catch (error) {
        console.error('Error fetching Travel Tip:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch Travel Tip' });
    }
};

export const searchBlogs = async (req, res) => {
    try {
        const { search } = req.query;
        let blogs;

        if (search) {
            const searchRegex = new RegExp(search, 'i'); // 'i' for case-insensitive
            blogs = await Blog.find({ title: searchRegex });
        } else {
            blogs = await Blog.find();
        }

        res.status(200).json({ success: true, blogs });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch blog posts' });
    }
};

export const deleteBlogs = async (req, res) => {
    try {
        const { blogId } = req.params;
        console.log("🟢 Deleting blog with ID:", blogId);

        const blog = await Blog.findByIdAndDelete(blogId);
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        const travelTip = await TravelTip.findOneAndDelete({ blogId });

        res.status(200).json({
            success: true,
            message: 'Blog and associated travel tip deleted successfully',
            deletedBlog: blog,
            deletedTravelTip: travelTip || null
        });
    } catch (error) {
        console.error('❌ Error deleting blog:', error);
        res.status(500).json({ success: false, error: 'Failed to delete blog' });
    }
};

