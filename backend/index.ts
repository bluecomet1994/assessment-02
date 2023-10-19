import * as dotenv from 'dotenv';
import * as express from "express";
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as cors from 'cors';

import connectDB from './config/connectDB';
import api from './routes';

// config
dotenv.config();
connectDB();

const app = express();

// middleware
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// routes
app.use('/api', api);

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));