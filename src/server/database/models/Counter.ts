import mongoose, { Schema, model } from 'mongoose';
import { Counter } from '../types/Counter';

const counterSchema = new Schema({
	_id: {
		type: String,
		required: true
	},

	seq: {
		type: Number,
		default: 0
	}
});

counterSchema.index(
	{
		_id: 1,
		seq: 1
	},
	{ unique: true }
);

export const counterModel = model<Counter & mongoose.Document>('counter', counterSchema);
