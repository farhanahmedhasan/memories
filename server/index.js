import express from 'express';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();

// app.use(express.urlencoded({ limit: '30mb' })); //Deprecated
app.use(express.json({ limit: '30mb' }));

app.use(cors());

//Mountung Routes
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.use('/', (req, res) => {
  res.send(`All about your Memory`);
});

export default app;
