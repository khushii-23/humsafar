import User from '../model/userData.js';
import Blog from '../model/blogData.js';

export const userLogin = (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        console.log(user, req.body);
        if (!user || !user.authenticate(req.body.password)) {
            return res.status(400).json({
                success: false,
                error: "Invalid email or password"
            });
        } else {
            res.status(200).json({
                success: true,
                user
            });
        }
    }).catch(err => {
        console.error('Error finding user:', err);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    });
};

export const userRegistration = (req, res) => {
    console.log(req.body);
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        } else {
            let newRegistration = new User(req.body);
            newRegistration.save().then(user => {
                res.status(201).json({
                    success: true,
                    user
                });
            }).catch(err => {
                console.error('Error saving new user:', err);
                res.status(500).json({
                    success: false,
                    error: 'Failed to register user'
                });
            });
        }
    }).catch(err => {
        console.error('Error finding user during registration:', err);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    });
};

export const updateInterests = (req, res) => {
    const userId = req.params.id;
    const { interests } = req.body;
    console.log(userId, interests);

    if (!Array.isArray(interests)) {
        return res.status(400).json({ error: 'Interests should be an array' });
    }

    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            user.interests = interests; // Corrected the property name from 'interest' to 'interests'
            return user.save();
        })
        .then(updatedUser => {
            res.status(200).json({
                success: true,
                message: 'Interests updated successfully',
                user: updatedUser
            });
        })
        .catch(error => {
            console.error('Error updating interests:', error);
            res.status(500).json({
                success: false,
                error: 'Server error',
                details: error.message
            });
        });
};

export const getUserBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ userId: req.params.userId });
        res.status(200).json({ success: true, blogs });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch blogs' });
    }
};
