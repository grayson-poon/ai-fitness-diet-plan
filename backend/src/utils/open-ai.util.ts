import { MealModel } from "src/models/meal.schema";
import { MealInterface } from "./interfaces";

export const sampleResponse =
	"Here is a sample daily fitness diet plan that includes salmon, chicken, and strawberries, with five meals per day:\n\nMeal 1:\n- Omelet with 2 eggs, 1/2 cup diced grilled chicken, and veggies like spinach, bell peppers, and onions\n- 1 slice of whole grain toast\n- 1 cup of strawberries\n\nMeal 2:\n- Smoothie made with 1/2 cup of Greek yogurt, 1/2 cup of frozen strawberries, 1/2 banana, and 1/4 cup of almond milk\n\nMeal 3:\n- Grilled salmon fillet (4-6 oz) with roasted asparagus and sweet potato wedges\n- Side salad of mixed greens, cherry tomatoes, cucumbers, and a balsamic dressing\n\nMeal 4:\n- Grilled chicken breast (4-6 oz) with mixed veggies like zucchini, squash, bell peppers, and onions\n- 1/2 cup of brown rice or quinoa\n\nMeal 5:\n- Snack plate with hummus, carrots, celery, cucumber slices, and whole grain crackers\n- 1 cup of strawberries\n\nThis meal plan is rich in lean protein from chicken and salmon, which helps to build and repair muscle tissue, along with fiber-rich fruits and veggies to support digestion and overall health. Including a variety of colors and textures in each meal helps to ensure that you're getting a wide range of beneficial vitamins, minerals, and antioxidants.";

export const findMealNumber = (str: string): number | null => {
	let num = "";

	for (let i = 0; i < str.length; i++) {
		if (parseInt(str[i])) {
			num += str[i];
		} else {
			break;
		}
	}

	return parseInt(num) || null;
};

export const filterDetails = (details: string[]): string[] => {
	return details.filter((pc) => findMealNumber(pc) || pc.indexOf("- ") === 0);
};

interface MealDetails {
	mealNumber: number;
	components: string[];
}

export const transformDetails = (details: string[]): MealDetails => {
	const res = {
		mealNumber: null,
		components: [],
	};

	for (const detail of details) {
		if (findMealNumber(detail)) res.mealNumber = findMealNumber(detail);
		if (detail.indexOf("- ") === 0) res.components.push(detail.slice(2));
	}

	return res;
};

export const extractMealsFromApiResponse = (
	mealModel: MealModel,
	response: string,
) => {
	const listOfMeals: MealInterface[] = [];
	const meals = response.split("Meal ");

	for (const meal of meals) {
		const potentialComponents = meal.split("\n");

		const filteredComponents = filterDetails(potentialComponents);
		const mealDetails = transformDetails(filteredComponents);
		const { mealNumber, components } = mealDetails;

		console.log(mealDetails, "DETAILS");

		if (mealNumber) {
			const newMeal = new mealModel({
				mealNumber,
				components,
			});
			listOfMeals.push(newMeal);
		}
	}

	return listOfMeals;
};
