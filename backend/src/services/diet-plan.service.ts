import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";
import { openai } from "src/config/open-ai.config";
import { DietPlan, DietPlanModel } from "src/models/diet-plan.schema";
import { Meal, MealModel } from "src/models/meal.schema";
import { extractMealsFromApiResponse } from "src/utils/open-ai.util";

@Injectable()
export class DietPlanService {
	constructor(
		@InjectModel(DietPlan.collection.name) private dietPlanModel: DietPlanModel,
		@InjectModel(Meal.collection.name) private mealModel: MealModel,
	) {}

	async findDietPlan(id: ObjectId) {
		const dietPlan = await this.dietPlanModel.findById(id);

		if (dietPlan) return dietPlan;
		throw new HttpException("Diet plan does not exist", HttpStatus.NOT_FOUND);
	}

	async createDietPlan(request: string) {
		try {
			const query = await openai.createChatCompletion({
				model: "gpt-3.5-turbo",
				messages: [
					{
						role: "user",
						content: request,
					},
				],
			});

			const newDietPlan = new this.dietPlanModel({
				frequency: "daily",
				meals: [],
				weeklyDietPlan: null,
			});

			const dietPlan = await newDietPlan.save();

			const response = query.data.choices[0].message.content;
			console.log(response, "RESPONSE");
			const listOfMeals = extractMealsFromApiResponse(this.mealModel, response);
			console.log(listOfMeals, "LIST OF MEALS");

			const listOfMealDocuments = await Promise.all(
				listOfMeals.map(async (meal) => {
					meal.dietPlan = dietPlan;
					return await meal.save();
				}),
			);

			newDietPlan.meals = listOfMealDocuments;
			console.log(listOfMealDocuments, "HERE");
			return newDietPlan.save();
		} catch (error) {
			throw new HttpException(
				"Couldn't create diet plan",
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	// async deleteDietPlan(): Promise<DietPlan> {}
}
