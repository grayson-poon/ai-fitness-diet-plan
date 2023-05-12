import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DietPlanController } from "src/controllers/diet-plan.controller";
import { DietPlan, DietPlanSchema } from "src/models/diet-plan.schema";
import { Meal, MealSchema } from "src/models/meal.schema";
import { DietPlanService } from "src/services/diet-plan.service";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: DietPlan.collection.name, schema: DietPlanSchema },
			{ name: Meal.collection.name, schema: MealSchema },
		]),
	],
	controllers: [DietPlanController],
	providers: [DietPlanService],
})
export class DietPlanModule {}
