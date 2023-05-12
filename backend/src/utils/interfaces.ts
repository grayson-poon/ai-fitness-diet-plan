import { Document } from "mongoose";

interface MacrosInterface {
	protein: number;
	carbohydrates: number;
	fat: number;
	calories: number;
}

interface DaysInterface {
	monday: DietPlanInterface;
	tuesday: DietPlanInterface;
	wednesday: DietPlanInterface;
	thursday: DietPlanInterface;
	friday: DietPlanInterface;
	saturday: DietPlanInterface;
	sunday: DietPlanInterface;
}

export interface MealInterface extends Document {
	mealNumber: number;
	components: string[];
	macros: MacrosInterface;
	recipeLink: string | null;
	dietPlan: DietPlanInterface;
}

export interface DietPlanInterface extends Document {
	name: string;
	frequency: "daily" | "weekly";
	meals: MealInterface[];
	days: DaysInterface;
	weeklyDietPlan: null | DietPlanInterface;
}

export interface UserInterface extends Document {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	dietPlans: DietPlanInterface[];
}
