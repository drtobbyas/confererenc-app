import express from 'express';
import compression from 'compression'; // compresses requests
import bodyParser from 'body-parser';
import lusca from 'lusca';
import path from 'path';
import cors from 'cors';
import { talkRouter } from './api/talks/talk.route';
import { attendeeRouter } from './api/attendees/attendee.route';
// @ts-ignore
import { PORT } from '../config/index';
import { connectMongo } from './database/database.mongo';

// Create Express server
const app = express();

//initialize MongoDB
connectMongo();

// Express configuration
app.set('port', PORT || 4000);

app.use(cors())

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

app.use(express.static('public', { maxAge: 31557600000 }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use('/api/talks', talkRouter);
app.use('/api/attendees', attendeeRouter);

export default app;
