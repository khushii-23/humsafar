
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

// Importing routes as ESM
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import qaRoutes from './routes/qaRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import { initializeModel } from './controllers/qaControllers.js';

const app = express();

mongoose.set('strictQuery', false)
mongoose.connect('mongodb://localhost:27017/travelSage_v1')
    .then(() => {
        console.log('Connected to MongoDB');
        // Initialize your model or other setup here
        initializeModel()
            .then(() => {
                console.log('Model initialized');
            })
            .catch((error) => {
                console.error('Error initializing model:', error);
            });
    }).catch(error => console.log(error))

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the humsafar API!' });
  });

app.use('/uploads', express.static('uploads'));

app.use('/api', authRoutes);
app.use('/api', blogRoutes);
app.use('/api', commentRoutes);
app.use('/api', qaRoutes);

app.use((req, res, next) => {
    res.status(404).json({ error: 'Endpoint not found' });
  });
  
const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});