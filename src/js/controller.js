import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime';
import { async } from 'regenerator-runtime';

if (module.hot) {
  module.hot.accept();
}

const controlRecipe = async function () {
  try {
    const recipeId = window.location.hash.slice(1);
    if (!recipeId) return;

    recipeView.renderSpinner();

    // * update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // * loading a recipe from API
    await model.loadRecipe(recipeId);

    // * rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    // * fetching recipe search results from API
    await model.loadSearchResults(query);

    // * rendering recipe search results
    resultsView.render(model.getSearchResultsPage());

    // * rendering initial pagination
    paginationView.render(model.state.search);
  } catch (error) {
    resultsView.renderError();
  }
};

const controlPagination = function (selectedPage) {
  resultsView.render(model.getSearchResultsPage(selectedPage));
  paginationView.render(model.state.search);
};

const controlServings = function (numberOfServings) {
  model.updateServings(numberOfServings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
};
init();
