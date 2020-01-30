import { Request, Response } from 'express';
import { Attendee } from './attendee.model';
import { attendeeSchema, idSchema } from './attendee.schema';
import { Talk } from '../talks/talk.model';

export const addAttendee = async (req: Request, res: Response) => {
  const { error, value } = attendeeSchema.validate(req.body);
  if (error) {
    return res.status(422).json({
      statusCode: 422,
      data: 'invalid payload',
    });
  }
  const attendee: any = new Attendee(value);

  try {
    await attendee.save();
    return res.status(200).json({
      statusCode: 200,
      data: attendee.email,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      data: 'server error',
    });
  }
};

export const getAttendee = (req: Request, res: Response) => {
  const { error, value } = idSchema.validate(req.body);
  if (error) {
    return res.status(422).json({
      statusCode: 422,
      data: 'invalid payload',
    });
  }
  Attendee.findOne({ email: value.email }, (error, attendee) => {
    if (error) {
      return res.status(500).json({
        statusCode: 500,
        data: 'internal error',
      });
    }

    if (!attendee) {
      return res.status(404).json({
        statusCode: 404,
        data: 'attendee not found',
      });
    }
    return res.status(200).json({
      statusCode: 200,
      data: attendee,
    });
  });
};

export const getAttendees = async (req: Request, res: Response) => {
  try {
    const attendees = await Attendee.find({});
    return res.status(200).json({
      statusCode: 200,
      data: attendees,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      data: 'internal error',
    });
  }
};

export const addTalkToAttendee = async (req: Request, res: Response) => {
  const { error, value } = attendeeSchema.validate(req.body);
  if (error) {
    return res.status(422).json({
      statusCode: 422,
      data: 'invalid payload',
    });
  }

  try {
    const attendee: any = await Attendee.findOne({ email: value.email });
    if (!attendee) {
      return res.status(404).json({
        statusCode: 404,
        data: 'attendee not found',
      });
    }
    attendee.attending.push(...value.attending);
    return res.status(200).json({
      statusCode: 200,
      data: attendee.email,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      data: 'server error',
    });
  }
};

export const removeAttendee = async (req: Request, res: Response) => {
  const { error, value } = idSchema.validate(req.body);
  if (error) {
    return res.status(422).json({
      statusCode: 422,
      data: 'invalid payload',
    });
  }
  try {
    const attendee: any = await Attendee.findOneAndDelete({ _id: value._id });
    return res.status(200).json({
      statusCode: 200,
      data: attendee.email,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      data: 'internal error',
    });
  }
};
