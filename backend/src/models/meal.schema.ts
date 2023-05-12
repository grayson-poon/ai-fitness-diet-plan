import mongoose, { Model, Schema } from "mongoose";
import { MealInterface } from "src/utils/interfaces";

export type MealModel = Model<MealInterface>;

export const MealSchema = new Schema<MealInterface, MealModel>(
	{
		mealNumber: { type: Number, required: true },
		components: { type: [String], required: true, default: [] },
		macros: {
			protein: { type: Number, default: null },
			carbohydrates: { type: Number, default: null },
			fat: { type: Number, default: null },
			calories: { type: Number, default: null },
		},
		recipeLink: { type: String, default: null },
		dietPlan: {
			type: mongoose.Types.ObjectId,
			ref: "DietPlan",
			required: true,
		},
	},
	{
		timestamps: true,
		id: true,
	},
);

export const Meal = mongoose.model<MealInterface, MealModel>(
	"Meal",
	MealSchema,
);
