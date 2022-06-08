import * as mongoose from 'mongoose';

const { Schema } = mongoose;

type Counter = {
	_id: string;
	seq: number;
};

const counterSchema = new Schema({
	_id: { type: String, required: true },
	seq: { type: Number, default: 0 }
});
counterSchema.index({ _id: 1, seq: 1 }, { unique: true });

const CounterModel = mongoose.model<Counter & mongoose.Document>(
	'Counter',
	counterSchema
);

const autoIncrementId = (doc: mongoose.Document | any, field: string, next: any) => {
	CounterModel.findByIdAndUpdate((doc.constructor as any).modelName,
		{ $inc: { seq: 1 } }, { new: true, upsert: true },
		(error, counter: Counter) => {
			if (error) return next(error);

			doc[field] = counter.seq;
			next();
		}
	);
};

export default autoIncrementId;
