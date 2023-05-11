import {
	Body,
	Controller,
	Get,
	Post,
	HttpStatus,
	Res,
	Param,
} from "@nestjs/common";
// import { DietPlan } from 'src/models/diet-plan.schema';
import { DietPlanService } from "src/services/diet-plan.service";
import { Response } from "express";
import { ObjectId } from "mongoose";

@Controller("/diet-plan")
export class DietPlanController {
	constructor(private readonly dietPlanService: DietPlanService) {}

	@Get("/:id")
	async findDietPlan(
		@Res() response: Response,
		@Param("id") id: ObjectId,
	): Promise<Response> {
		const dietPlan = await this.dietPlanService.findDietPlan(id);
		return response.status(HttpStatus.FOUND).json({ dietPlan });
	}

	@Post("")
	async createDietPlan(
		@Res() response: Response,
		// @Body() dietPlan: DietPlan,
		@Body("request") request: string,
	): Promise<Response> {
		console.log(request, "HERE");
		const newDietPlan = await this.dietPlanService.createDietPlan(request);
		return response.status(HttpStatus.CREATED).json({ newDietPlan });
	}

	// @Delete('/:id')
	// async deleteDietPlan(@Res() response: Response, @Body() dietPlan: DietPlan) {}
}
