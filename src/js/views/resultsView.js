import icons from 'url:../../img/icons.svg';
import { View } from './View.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found. Please try again.';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(recipe) {
    return `<li class="preview">
              <a class="preview__link" href="#${recipe.id}">
                <figure class="preview__fig">
                  <img src="${recipe.image}" alt="${recipe.title}" />
                </figure>
                <div class="preview__data">
                  <h4 class="preview__title">${recipe.title}</h4>
                  <p class="preview__publisher">${recipe.publisher}</p>
                  <div class="preview__user-generated">
                    
                  </div>
                </div>
              </a>
            </li>`;
  }
}

export default new ResultsView();
