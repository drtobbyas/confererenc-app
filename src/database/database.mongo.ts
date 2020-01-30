import mongoose from 'mongoose';
// @ts-ignore
import { MONGODB_URL } from '../../config';

export const connectMongo = () => {

  mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
}

const connection = mongoose.connection;
connection.on('error', (error) => {
  console.log(`MongoDB database connection error: ${error}`);
});
connection.once('open', function() {
  console.log('MongoDB database connection opened successfully.');
});
