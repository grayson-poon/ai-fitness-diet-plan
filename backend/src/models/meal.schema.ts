import mongoose, { Model, Schema } from "mongoose";
import { MealInterface } from "src/utils/interfaces";

// type of Model based on the MealInterface
export type MealModel = Model<MealInterface>;

// mongoose Schema formatted by the MealInterface with a type of MealModel
export const MealSchema = new Schema<MealInterface, MealModel>(
	{
		name: { type: String, required: true },
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

// mongoose Model used to create Meal Documents
export const Meal = mongoose.model<MealInterface, MealModel>(
	"Meal",
	MealSchema,
);
