import { Request, Response } from "express";
import { Talk, ITalk } from "./talk.model";
import { talkSchema, idSchema, talkAttendeeSchema } from "./talk.schema";

export const addTalk = async (req: Request, res: Response) => {
  const { error, value } = talkSchema.validate(req.body);
  if (error) {
    return res.status(422).json({
      statusCode: 422,
      data: "invalid payload"
    });
  }
  const talk = new Talk(value);

  try {
    await talk.save();
    return res.status(200).json({
      statusCode: 200,
      data: talk._id
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      data: "server error"
    });
  }
};

export const getTalk = (req: Request, res: Response) => {
  const { error, value } = idSchema.validate(req.body);
  console.log(error, value);
  if (error) {
    return res.status(422).json({
      statusCode: 422,
      data: "invalid payload"
    });
  }
  try {
    const talk = Talk.findOne({ _id: value._id });
    if (!talk) {
      return res.status(404).json({
        statusCode: 404,
        data: "talk not found"
      });
    }

    return res.status(200).json({
      statusCode: 200,
      data: talk
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      data: "internal error"
    });
  }
};

export const getTalks = async (req: Request, res: Response) => {
  try {
    const talks = Talk.find({});

    return res.status(200).json({
      statusCode: 200,
      data: talks
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      data: "internal error"
    });
  }
};

export const deleteTalk = (req: Request, res: Response) => {
  const { error, value } = idSchema.validate(req.body);
  if (error) {
    return res.status(422).json({
      statusCode: 422,
      data: "invalid payload"
    });
  }

  try {
    const talk: any = Talk.findOneAndDelete({ _id: value._id });
    if (!talk) {
      return res.status(404).json({
        statusCode: 404,
        data: "talk not found"
      });
    }
    return res.status(200).json({
      statusCode: 200,
      data: talk._id
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      data: "internal error"
    });
  }
};

export const addAttendeeToTalk = async (req: Request, res: Response) => {
  const { error, value } = talkAttendeeSchema.validate(req.body);
  if (error) {
    return res.status(422).json({
      statusCode: 422,
      data: "invalid payload"
    });
  }
  try {
    let talk: any = await Talk.findOne({ _id: value._id });

    talk.attendees.push(...value.attendees);
    talk = await talk.save();

    return res.status(200).json({
      statusCode: 200,
      data: talk
    });
  } catch (error) {
    if (error) {
      return res.status(500).json({
        statusCode: 500,
        data: "internal error"
      });
    }
  }
};

export const getAttendee = (req: Request, res: Response) => {
  const { error, value } = talkAttendeeSchema.validate(req.body);
  if (error) {
    return res.status(422).json({
      statusCode: 422,
      data: "invalid payload"
    });
  }
  Talk.find({ _id: value._id }, (error, talk: any) => {
    if (error) {
      return res.status(500).json({
        statusCode: 500,
        data: "internal error"
      });
    }
    // if (!talk) {
    //   return res.status (404).json({
    //     statusCode: 404,
    //     data: talk
    //   })
    // }

    return res.status(200).json({
      statusCode: 200,
      data: talk.attendees
    });
  });
};
