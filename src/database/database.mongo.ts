import mongoose from 'mongoose';
// @ts-ignore
import { MONGODB_URL } from '../../config';

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


