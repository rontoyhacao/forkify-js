import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

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
    bookmarksView.update(model.state.bookmarks);

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

  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
