import icons from 'url:../../img/icons.svg';
import { View } from './View.js';
import previewView from './previewView.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'You have no bookmarks yet.';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmarkedRecipe => previewView.render(bookmarkedRecipe, false))
      .join('');
  }
}

export default new BookmarksView();
