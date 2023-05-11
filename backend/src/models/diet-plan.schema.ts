import mongoose, { Model, Schema } from "mongoose";
import { DietPlanInterface } from "src/utils/interfaces";

export type DietPlanModel = Model<DietPlanInterface>;

export const DietPlanSchema = new Schema<DietPlanInterface, DietPlanModel>(
	{
		name: { type: String },
		frequency: { type: String, enum: ["daily", "weekly"], required: true },
		meals: { type: [mongoose.Types.ObjectId], ref: "Meal" },
		days: {
			monday: { type: mongoose.Types.ObjectId, ref: "DietPlan" },
			tuesday: { type: mongoose.Types.ObjectId, ref: "DietPlan" },
			wednesday: { type: mongoose.Types.ObjectId, ref: "DietPlan" },
			thursday: { type: mongoose.Types.ObjectId, ref: "DietPlan" },
			friday: { type: mongoose.Types.ObjectId, ref: "DietPlan" },
			saturday: { type: mongoose.Types.ObjectId, ref: "DietPlan" },
			sunday: { type: mongoose.Types.ObjectId, ref: "DietPlan" },
		},
		dietPlan: { type: mongoose.Types.ObjectId, ref: "DietPlan" },
	},
	{
		timestamps: true,
		id: true,
	},
);

export const DietPlan = mongoose.model<DietPlanInterface, DietPlanModel>(
	"DietPlan",
	DietPlanSchema,
);
