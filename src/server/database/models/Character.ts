import { Schema, model } from "mongoose";
import { Character } from "../types/Character";
import autoIncrementId from "./Counter";

const characterSchema = new Schema<Character>({
  uid: {
    type: Number,
    unique: true,
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  age: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
    default: "male",
  },

  fullName: {
    type: String,
    required: true,
  },

  health: {
    type: Number,
    default: 100,
  },

  armour: {
    type: Number,
    default: 0,
  },

  position: {
    type: Object,
    required: true,
  },

  dimension: {
    type: Number,
    required: true,
    default: 0,
  },

  admin: {
    type: Boolean,
    required: true,
    default: false
  },

  adminLvl: {
    type: Number,
    required: false
  },

  money: {
    cash: {
      type: Number,
      default: 0,
    },

    bank: {
      type: Number,
      default: 0,
    },
  },

  isWorkOnJob: {
    type: Boolean,
    default: false,
  },

  isJob: {
    type: String,
    default: 'none',
    required: false,
  }
});

characterSchema.pre("save", function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementId(this, "uid", next);
});

const CharacterModel = model<Character>("Character", characterSchema);

export default CharacterModel;
