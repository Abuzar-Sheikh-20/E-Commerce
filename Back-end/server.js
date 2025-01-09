  import express from 'express'     // to create a web server.
  import cors from 'cors'     // for front-end-backend communication.
  import 'dotenv/config'    // keep your API keys, MongoDB URI, and other sensitive data separate from the code.
  import connectDB from './config/mongodb.js';
  import connectCloudinary from './config/cloudinary.js';
  import userRouter from './routes/userRoute.js';

  // App config
  const app = express();
  const port = process.env.PORT || 4000      // If port is available in process.env.PORT then otherwise run on 4000
  connectDB();
  connectCloudinary();


  // middleware
  app.use(express.json());
  app.use(cors());

  // API endpoints
  app.use('/api/user', userRouter);

  app.get('/', (req, res)=> (
    res.send('API Working!')
  ))

  app.listen(port, () => console.log('Server started on PORT: ' + port))