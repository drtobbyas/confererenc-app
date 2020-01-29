import { Document, Schema, model, SchemaDefinition } from 'mongoose';

const speaker = new Schema({
  firstName: String,
  lastName: String,
  dob: Date,
  merits: [String]
})
// TODO: change this to document
const sponsor = new Schema({
  company: String,
  category: String,
  name: String
})


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
    default: Date.now
  },
  modifiedAt: {
    type: Date,
    default: Date.now
  },
  sponsors: [sponsor],
  genre: String,
  rating: Number
})


interface ISpeaker {
  firstName: string
  lastName: string
  dob: Date
  merits?: string[]

}

interface ISponsor {
company?: string
category?: string
name?: string
}


export interface ITalk {
title: string,
description?: string,
host: String,
speakers: ISpeaker[],
address: string,
startsAt: string,
endsAt: string,
createdAt?: string,
modifiedAt?: string,
sponsors: ISponsor[],
genre?: string,
rating?: string,
}

export const Talk = model('Talk', talkSchema);