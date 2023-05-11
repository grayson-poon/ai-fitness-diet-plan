import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DietPlanController } from "src/controllers/diet-plan.controller";
import { DietPlan, DietPlanSchema } from "src/models/diet-plan.schema";
import { DietPlanService } from "src/services/diet-plan.service";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: DietPlan.name, schema: DietPlanSchema },
		]),
	],
	controllers: [DietPlanController],
	providers: [DietPlanService],
})
export class DietPlanModule {}
