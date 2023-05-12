import { MealModel } from "src/models/meal.schema";
import { MealInterface } from "./interfaces";
import { logger } from "src/main";

const logContext = "open-ai.util.ts";

export const sampleResponse1 =
	"Here is a sample daily fitness diet plan that includes salmon, chicken, and strawberries, with five meals per day:\n\nMeal 1:\n- Omelet with 2 eggs, 1/2 cup diced grilled chicken, and veggies like spinach, bell peppers, and onions\n- 1 slice of whole grain toast\n- 1 cup of strawberries\n\nMeal 2:\n- Smoothie made with 1/2 cup of Greek yogurt, 1/2 cup of frozen strawberries, 1/2 banana, and 1/4 cup of almond milk\n\nMeal 3:\n- Grilled salmon fillet (4-6 oz) with roasted asparagus and sweet potato wedges\n- Side salad of mixed greens, cherry tomatoes, cucumbers, and a balsamic dressing\n\nMeal 4:\n- Grilled chicken breast (4-6 oz) with mixed veggies like zucchini, squash, bell peppers, and onions\n- 1/2 cup of brown rice or quinoa\n\nMeal 5:\n- Snack plate with hummus, carrots, celery, cucumber slices, and whole grain crackers\n- 1 cup of strawberries\n\nThis meal plan is rich in lean protein from chicken and salmon, which helps to build and repair muscle tissue, along with fiber-rich fruits and veggies to support digestion and overall health. Including a variety of colors and textures in each meal helps to ensure that you're getting a wide range of beneficial vitamins, minerals, and antioxidants.";

export const sampleResponse2 =
	"Here's a sample daily fitness diet plan:\n\nBreakfast:\n- 2 eggs, scrambled or fried in 1 teaspoon of olive oil\n- 1 slice whole grain toast\n- 1 small apple\n- 1 cup of skim or low-fat milk\n\nSnack:\n- 1 small handful of almonds\n- 1 medium-sized banana\n\nLunch:\n- Grilled chicken breast, 4-6 oz.\n- 1 cup of mixed vegetables (broccoli, carrots, bell peppers, onions, etc.) sautéed in 1 tablespoon of olive oil\n- 1 small sweet potato, baked or roasted\n- 1 cup of water\n\nSnack:\n- Greek yogurt, 1 small container (6-8 oz.)\n- 1 small peach, diced\n\nDinner:\n- Baked salmon fillet, 4-6 oz.\n- Quinoa or brown rice, 1 cup cooked\n- Steamed asparagus, 1 cup\n- 1 small orange\n\nNote: This is just a sample and can be modified based on your personal preferences and dietary needs. It's important to eat a balanced diet that includes protein, healthy fats, complex carbs, and plenty of fruits and vegetables to support your fitness goals. Also, make sure to hydrate properly throughout the day by drinking enough water.";

// OpenAI API spits out meal components in a dashed list
// If the isolated string starts with "- ", it's a meal component
const isMealComponent = (str: string): boolean => {
	return str.indexOf("- ") === 0;
};

// Format the API response by removing newline characters and colons to isolate
// relevant parts
const formatApiResponse = (response: string): string[] => {
	const results: string[] = [];
	const parts = response.split("\n");

	for (const part of parts) {
		const details = part.split(":");
		results.push(details.join(""));
	}

	logger?.log(`FORMAT_API_RESPONSE => ${JSON.stringify(results)}`, logContext);
	return results;
};

// Create an interface to represent the details of a meal that's been extracted
// from the API response
interface MealDetails {
	name: string;
	components: string[];
}

// extract the meal details from the formatted strings generated from the API
// response
const findMealDetails = (parts: string[]): MealDetails[] => {
	const mealDetails = [];

	for (let i = 0; i < parts.length - 1; i++) {
		const nameIdx = i;
		let componentIdx = i + 1;

		if (
			!isMealComponent(parts[nameIdx]) &&
			isMealComponent(parts[componentIdx])
		) {
			const detail = {
				name: parts[nameIdx],
				components: [],
			};

			while (componentIdx < parts.length) {
				const component = parts[componentIdx];

				if (isMealComponent(component)) {
					detail.components.push(component.slice(2));
				} else {
					break;
				}
				componentIdx++;
			}

			mealDetails.push(detail);
			i = componentIdx;
		}
	}

	logger?.log(
		`FIND_MEAL_DETAILS => ${JSON.stringify(mealDetails)}`,
		logContext,
	);
	return mealDetails;
};

// generate a list of MealDetails to quickly create MealDocuments and add to
// a DietPlan
export const extractMealsFromApiResponse = (
	mealModel: MealModel,
	response: string,
): MealInterface[] => {
	const listOfMeals: MealInterface[] = [];
	const formattedStrings: string[] = formatApiResponse(response);
	const allMealDetails = findMealDetails(formattedStrings);

	for (const { name, components } of allMealDetails) {
		const newMeal = new mealModel({
			name,
			components,
		});
		listOfMeals.push(newMeal);
	}

	logger?.log(
		`EXTRACT_MEALS_FROM_API_RESPONSE => ${JSON.stringify(listOfMeals)}`,
		logContext,
	);
	return listOfMeals;
};
