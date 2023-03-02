import icons from 'url:../../img/icons.svg';
import { View } from './View.js';
import previewView from './previewView.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found. Please try again.';

  _generateMarkup() {
    return this._data.map(recipe => previewView.render(recipe, false)).join('');
  }
}

export default new ResultsView();
