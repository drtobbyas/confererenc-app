import express from 'express';
import * as attendeeController from './attendee.controller';

export const attendeeRouter = express.Router();

attendeeRouter.get('/', (req, res) => {
  res.status(200).json({message: 'attendee router'});
})

attendeeRouter.post('/addAttendee', attendeeController.addAttendee)

attendeeRouter.post('/getAttendee', attendeeController.getAttendee)

attendeeRouter.post('/addTalkToAttendee', attendeeController.addTalkToAttendee)

attendeeRouter.get('/getAttendees', attendeeController.getAttendees)

attendeeRouter.post('/removeAttendee', attendeeController.removeAttendee)


