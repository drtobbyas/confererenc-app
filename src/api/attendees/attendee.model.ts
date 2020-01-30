import { Schema, model } from 'mongoose';

const attendeeSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  phone: String,
  dob: Date,
  address: String,
  attended: [String],
  attending: [String],
});

export const Attendee = model('Attendee', attendeeSchema);
