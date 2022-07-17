import { userSchema } from '../models/User';
import autoincrement from './autoincrement';

userSchema.pre('save', function (next) {
    if (!this.isNew) {
        next();
        return;
    }

    autoincrement(this, 'uid', next);
});