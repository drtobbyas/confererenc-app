import { Request, Response } from 'express';
import { Talk } from './talk.model';
import { talkSchema, idSchema, talkAttendeeSchema } from './talk.schema';
import { Attendee } from '../attendees/attendee.model';

export const addTalk = async (req: Request, res: Response) => {
  const { error, value } = talkSchema.validate(req.body);

  if (error) {
    return res.status(422).json({
      statusCode: 422,
      data: 'invalid payload',
    });
  }
  const talk = new Talk(value);

  try {
    await talk.save();
    return res.status(200).json({
      statusCode: 200,
      data: talk._id,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      data: 'server error',
    });
  }
};

export const getTalk = async (req: Request, res: Response) => {
  const { error, value } = idSchema.validate(req.body);
  if (error) {
    return res.status(422).json({
      statusCode: 422,
      data: 'invalid payload',
    });
  }
  try {
    const talk = await Talk.findOne({ _id: value._id });
    if (!talk) {
      return res.status(404).json({
        statusCode: 404,
        data: 'talk not found',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      data: talk,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      data: 'internal error',
    });
  }
};

export const getTalks = async (req: Request, res: Response) => {
  try {
    const talks = await Talk.find({});

    return res.status(200).json({
      statusCode: 200,
      data: talks,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      data: 'internal error',
    });
  }
};

export const deleteTalk = async (req: Request, res: Response) => {
  const { error, value } = idSchema.validate(req.body);
  if (error) {
    return res.status(422).json({
      statusCode: 422,
      data: 'invalid payload',
    });
  }

  try {
    const talk: any = await Talk.findOneAndDelete({ _id: value._id });
    if (!talk) {
      return res.status(404).json({
        statusCode: 404,
        data: 'talk not found',
      });
    }
    return res.status(200).json({
      statusCode: 200,
      data: talk._id,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      data: 'internal error',
    });
  }
};

export const addAttendeeToTalk = async (req: Request, res: Response) => {
  const { error, value } = talkAttendeeSchema.validate(req.body);
  if (error) {
    return res.status(422).json({
      statusCode: 422,
      data: 'invalid payload',
    });
  }
  try {
    let talk: any = await Talk.findOne({ _id: value._id });

    talk.attendees.push(...value.attendees);
    talk = await talk.save();

    return res.status(200).json({
      statusCode: 200,
      data: talk,
    });
  } catch (error) {
    if (error) {
      return res.status(500).json({
        statusCode: 500,
        data: 'internal error',
      });
    }
  }
};

export const getAttendees = async (req: Request, res: Response) => {
  const { error, value } = idSchema.validate(req.body);
  if (error) {
    return res.status(422).json({
      statusCode: 422,
      data: 'invalid payload',
    });
  }

  try {
    const talk: any = await Talk.findOne({ _id: value._id });
    if (!talk) {
      return res.status(404).json({
        statusCode: 404,
        data: 'talk not found',
      });
    }
    // const query = {$or: [{attending: {...talk.attendees}}, {attended: {...talk.attendees}}]}
    // const query = [{attended: talk.attendees[0]}, {attended: talk.attendees[1] }]
    // const query = {$and: [
      const query = { $or: [{attended: talk.attendees[0]}, {attending: talk.attendees[1]}] }
      // { $or: [{attended: talk.attendees[1]}] }
//   ]
// }
   const attendees = await Attendee.find(query)
    if (attendees.length < 1) {
      return res.status(404).json({
        statusCode: 404,
        data: 'attendee not found for talk',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      data: attendees,
    });
  } catch(error) {
    return res.status(500).json({
      statusCode: 500,
      data: 'internal error',
    });
  }

};
