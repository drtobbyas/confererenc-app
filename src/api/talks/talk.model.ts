import { Schema, model } from 'mongoose';

const speaker = new Schema({
  firstName: String,
  lastName: String,
  dob: Date,
  merits: [String],
});
// TODO: change this to document
const sponsor = new Schema({
  company: String,
  category: String,
  name: String,
});

const talkSchema = new Schema({
  title: String,
  description: String,
  host: String,
  speakers: [speaker],
  address: String,
  attendees: [String],
  startsAt: {
    type: Date,
  },
  endsAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
  sponsors: [sponsor],
  genre: String,
  rating: Number,
});

export const Talk = model('Talk', talkSchema);
