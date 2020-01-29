import joi from '@hapi/joi';
import { talkSchema } from '../talks/talk.schema';

export const attendeeSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  phone: joi.string(),
  dob: joi.date(),
  address: joi.string(),
  attended: joi.array().items(joi.string()),
  attending: joi.array().items(joi.string()),
});


export const idSchema = joi.object({
  email: joi.string().email()
});
