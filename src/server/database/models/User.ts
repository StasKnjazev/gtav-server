import { Schema, model, trusted } from 'mongoose';
import { IUser } from '../interface/User-Interface';

export const userSchema = new Schema<IUser>(
	{
		uid: {
			type: Number,
			unique: true
		},

		email: {
			type: String,
			required: true,
			unique: true
		},

		login: {
			type: String,
			required: true,
			unique: true
		},

		firstName: {
			type: String,
			required: true
		},

		lastName: {
			type: String,
			required: true
		},

		fullName: {
			type: String,
			required: true,
			unique: true
		},

		password: {
			type: String,
			required: true
		},

		loggedIn: {
			type: Boolean,
			required: true
		},

		rgsc: {
			type: String,
			required: true,
			unique: true
		},

		socialClub: {
			type: String,
			required: true,
			unique: true
		},

		ip: {
			type: String
		},

		serial: {
			type: String,
			required: true,
			unique: true
		},

		position: {
			type: Object,
			required: true
		},
	},
	{
		timestamps: true,
		versionKey: false
	}
);

export const UserModel = model<IUser>('accounts', userSchema);
