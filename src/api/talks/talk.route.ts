import express from 'express';
import * as talkController from './talk.controller';

export const talkRouter = express.Router();


talkRouter.get('/', (req, res) => {
  res.json({message: 'talk router'});
})

talkRouter.post('/addtalk', talkController.addTalk);

talkRouter.post('/getTalk', talkController.getTalk)

talkRouter.get('/getTalks', talkController.getTalks)

talkRouter.post('/deletetalk', talkController.deleteTalk)

// talkRouter.post('/updatetalk', talkController.updateTalk)

talkRouter.post('/addAttendeeToTalk', talkController.addAttendeeToTalk)



