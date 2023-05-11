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

export interface MealSchemaInterface {
	mealNumber: number;
	components: string[];
	macros: MacrosInterface;
	recipeLink: string | null;
	dietPlan: DietPlanInterface;
}

export interface DietPlanInterface {
	name: string;
	frequency: "daily" | "weekly";
	meals: MealSchemaInterface[];
	days: DaysInterface;
	dietPlan: null | DietPlanInterface;
}
