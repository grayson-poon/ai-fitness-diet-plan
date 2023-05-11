import mongoose, { Model, Schema } from "mongoose";
import { MealSchemaInterface } from "src/utils/interfaces";

type MealSchemaModel = Model<MealSchemaInterface>;

export const MealSchema = new Schema<MealSchemaInterface, MealSchemaModel>(
	{
		mealNumber: { type: Number, required: true },
		components: { type: [String], required: true, default: [] },
		macros: {
			protein: { type: Number, default: null },
			carbohydrates: { type: Number, default: null },
			fat: { type: Number, default: null },
			calories: { type: Number, default: null },
		},
		recipeLink: { type: String, required: true, default: null },
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

export const Meal = mongoose.model<MealSchemaInterface, MealSchemaModel>(
	"Meal",
	MealSchema,
);
