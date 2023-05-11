import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";
import { openai } from "src/config/open-ai.config";
import { DietPlan, DietPlanModel } from "src/models/diet-plan.schema";

@Injectable()
export class DietPlanService {
	constructor(
		@InjectModel(DietPlan.name)
		private dietPlanModel: DietPlanModel,
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

			console.log("-----------");
			const result = query.data.choices[0].message.content;
			console.log(result);

			const body = {
				name: "Test",
				frequency: "daily",
				meals: [],
				days: {
					monday: null,
					tuesday: null,
					wednesday: null,
					thursday: null,
					friday: null,
					saturday: null,
					sunday: null,
				},
				dietPlan: null,
			};

			this.dietPlanModel.create();

			const dietPlan = new DietPlan();
			dietPlan.name = "test";
			return dietPlan.save();
		} catch (error) {
			throw new HttpException(
				"Couldn't create diet plan",
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	// async deleteDietPlan(): Promise<DietPlan> {}
}
