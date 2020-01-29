import joi from '@hapi/joi';
// import { attendeeSchema } from '../attendees/attendee.schema';

const Speaker = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  dob: joi.date(),
  merits: [joi.string()]
})

const Sponsor = joi.object({
  company: joi.string(),
  category: joi.string(),
  name: joi.string()
})

// const Attendee = joi.object({
//   firstName: joi.string().required(),
//   lastName: joi.string().required(),
//   email: joi.string().email().required(),
//   phone: joi.string(),
//   dob: joi.date(),
//   address: joi.string(),
// })

export const talkSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().empty(),
  host: joi.string(),
  speakers: joi.array().items(Speaker),
  address: joi.string().required(),
  startsAt: joi.date().iso().required(),
  endsAt: joi.date().iso().required(),
  createdAt: joi.date().empty(),
  modifiedAt: joi.date().empty(),
  sponsors: joi.array().items(Sponsor),
  genre: joi.string().empty(),
  rating: joi.number().empty(),
});

export const idSchema = joi.object({
  _id: joi.string().required()
});

export const talkAttendeeSchema = joi.object({
  _id: joi.string().required(),
  attendees: joi.array().items(joi.string().required())
})
