import { Schema, model } from "mongoose";
import { IUser } from "../types/User";
import autoIncrementId from "./Counter";

const userSchema = new Schema(
  {
    accountUid: {
      type: Number,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    login: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    character: {
      type: Schema.Types.ObjectId,
      ref: "Character",
    },

    loggedIn: {
      type: Boolean,
      required: true,
    },

    rgsc: {
      type: String,
      required: true,
      unique: true,
    },

    socialClub: {
      type: String,
      required: true,
      unique: true,
    },

    ip: {
      type: String,
    },

    serial: {
      type: String,
      required: true,
      unique: true,
    },

    avatarSocialClub: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementId(this, "accountUid", next);
});

const UserModel = model<IUser>("accounts", userSchema);

export default UserModel;
