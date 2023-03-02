import { View } from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numberOfGeneratedPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currentPage = this._data.page;

    if (currentPage === 1 && numberOfGeneratedPages > 1)
      return this._generateNextButtonMarkup(currentPage);

    if (currentPage === numberOfGeneratedPages && numberOfGeneratedPages > 1)
      return this._generatePreviousButtonMarkup(currentPage);

    if (currentPage < numberOfGeneratedPages)
      return (
        this._generateNextButtonMarkup(currentPage) +
        this._generatePreviousButtonMarkup(currentPage)
      );

    return '';
  }

  _generateNextButtonMarkup(currentPage) {
    return `<button class="btn--inline pagination__btn--next" data-page="${
      currentPage + 1
    }">
    <span>Page ${currentPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;
  }

  _generatePreviousButtonMarkup(currentPage) {
    return `<button class="btn--inline pagination__btn--prev" data-page="${
      currentPage - 1
    }">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>`;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const pageButton = e.target.closest('.btn--inline');
      if (!pageButton) return;

      const selectedPage = +pageButton.dataset.page;
      handler(selectedPage);
    });
  }
}

export default new PaginationView();
