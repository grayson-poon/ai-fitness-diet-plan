import {
	HttpException,
	HttpStatus,
	Inject,
	Injectable,
	Logger,
	LoggerService,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";
import { openai } from "src/config/open-ai.config";
import { DietPlan, DietPlanModel } from "src/models/diet-plan.schema";
import { Meal, MealModel } from "src/models/meal.schema";
import { extractMealsFromApiResponse } from "src/utils/open-ai.util";

@Injectable()
export class DietPlanService {
	logContext: string = DietPlanService.name;

	constructor(
		@InjectModel(DietPlan.collection.name) private dietPlanModel: DietPlanModel,
		@InjectModel(Meal.collection.name) private mealModel: MealModel,
		@Inject(Logger) private readonly logger: LoggerService,
	) {}

	async findDietPlan(id: ObjectId) {
		const dietPlan = await this.dietPlanModel.findById(id);

		if (dietPlan) return dietPlan;
		throw new HttpException("Diet plan does not exist", HttpStatus.NOT_FOUND);
	}

	async createDietPlan(request: string) {
		try {
			this.logger.log(request, this.logContext);
			const query = await openai.createChatCompletion({
				model: "gpt-3.5-turbo",
				messages: [
					{
						role: "user",
						content: request,
					},
				],
			});
			const response = query.data.choices[0].message.content;
			this.logger.log(response, this.logContext);

			// TO-DO: enable input of frequency into the query: default "daily"
			const newDietPlan = new this.dietPlanModel({
				frequency: "daily",
				meals: [],
				weeklyDietPlan: null,
			});

			const dietPlan = await newDietPlan.save();

			this.logger.log(
				`New dietPlan Document created - ${dietPlan}`,
				this.logContext,
			);

			const listOfMeals = extractMealsFromApiResponse(this.mealModel, response);

			const listOfMealDocuments = await Promise.all(
				listOfMeals.map(async (meal) => {
					meal.dietPlan = dietPlan;
					return await meal.save();
				}),
			);
			this.logger.log(
				`listOfMealDocuments - ${listOfMealDocuments}`,
				this.logContext,
			);

			newDietPlan.meals = listOfMealDocuments;
			console.log(listOfMealDocuments, "HERE");
			return newDietPlan.save();
		} catch (error) {
			this.logger.error(error, this.logContext);
			throw new HttpException(
				"Couldn't create diet plan",
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	// async deleteDietPlan(): Promise<DietPlan> {}
}
