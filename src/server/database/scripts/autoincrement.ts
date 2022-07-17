import { counterModel } from "../models/Counter";
import { Counter } from "../types/Counter";

const autoincrement = (document: any, field: string, next: any) => {
	counterModel.findByIdAndUpdate(
		(document.constructor as any).modelName,
		{ $inc: { seq: 1 } },
		{ new: true, upsert: true },
		(error, counter: Counter) => {
			if (error) return next(error);

			document[field] = counter.seq;
			next();
		}
	);
};

export default autoincrement
