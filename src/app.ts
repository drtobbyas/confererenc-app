import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";
import path from "path";
import mongoose from 'mongoose';
import { talkRouter } from './api/talks/talk.route';
import { attendeeRouter } from './api/attendees/attendee.route';
// @ts-ignore
import { MONGODB_URL } from '../config/index';

// Create Express server
const app = express();


// initializ mongoDB
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const connectMongo = mongoose.connection;
connectMongo.on('error', (error) => {
  console.log(`MongoDB database connection error: ${error}`);
});
connectMongo.once('open', function() {
  console.log('MongoDB database connection opened successfully.');
});



// Express configuration
app.set("port", process.env.PORT || 3000);

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

app.get('/', (req, res) => {
    res.json({message: 'conference app'});
})

app.use('/api/talks', talkRouter);
app.use('/api/attendees', attendeeRouter);

export default app;
