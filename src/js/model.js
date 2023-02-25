import { API_URL } from './config.js';
import { getJSON } from './helper.js';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (recipeId) {
  try {
    const data = await getJSON(`${API_URL}/${recipeId}`);

    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (error) {
    console.error(error);
  }
};
