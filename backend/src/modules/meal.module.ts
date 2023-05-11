import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Meal, MealSchema } from "src/models/meal.schema";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Meal.name, schema: MealSchema }]),
	],
	controllers: [],
	providers: [],
})
export class MealModule {}
