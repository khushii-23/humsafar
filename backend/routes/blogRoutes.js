import express from 'express';
import multer from 'multer';
import { createBlog, getBlogs, searchBlogs, getTravelTips, deleteBlogs} from '../controllers/blogController.js';

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

// Routes
router.post('/create-blog', upload.array('images'), createBlog);
router.get('/blogs', getBlogs);
router.get('/travel-tips/:blogId', getTravelTips);
router.get('/search-blogs', searchBlogs);
router.delete('/delete-blogs/:blogId', deleteBlogs);


export default router;
