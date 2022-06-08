import { kStringMaxLength } from "buffer";
import * as mongoose from "mongoose";
import autoIncrementId from "../autoInc";

const { Schema } = mongoose;

type User = {
    uid: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    socialClub: string;
    serialHWID: string;
    ip: string;
    registerAt: any;
    loginAt: any;
} & mongoose.Document;

const UserSchema = new Schema({
    uid: {
        type: Number,
        unique: true
    },
    
    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        unique: false,
    },

    firstName: {
        type: String,
        unique: false,
        required: true
    },

    lastName: {
        type: String,
        unique: false,
        required: true
    },

    socialClub: {
        type: String,
        unique: true,
        required: true
    },

    position: {
        type: Object,
        required: true
    },

    adminLvl: {
        type: Number,
        default: 0
    },

    registerAt: {
        type: Date,
		default: Date.now
    },
    loginAt: {
        type: Date,
        default: Date.now
    },

    characterOptions: {
        gender: {
			type: Number,
			default: 0
		},
		skindata: [],
		facedata: [],
		headOverlayData: [],
		tattoos: [],
		hair: {},
		brow: {},
		beard: {}
    },

    serialHWID: String,
    ip: String,
})