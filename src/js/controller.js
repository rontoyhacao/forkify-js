import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe = async () => {
  try {
    const recipeId = window.location.hash.slice(1);
    if (!recipeId) return;

    recipeView.showSpinner();

    // * fetching recipe from API
    await model.loadRecipe(recipeId);

    // * rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.error(error);
  }
};

['hashchange', 'load'].forEach(e => window.addEventListener(e, showRecipe));
