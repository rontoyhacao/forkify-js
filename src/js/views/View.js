import icons from 'url:../../img/icons.svg';

export class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // * convert newMarkup string to document fragment
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    // * convert current and new nodeList markup elements to array
    const currElements = Array.from(this._parentElement.querySelectorAll('*'));
    const newElements = Array.from(newDOM.querySelectorAll('*'));

    // * loop over the newMarkup elements array for comparison to current markup elements array: look for dissimilar elements
    newElements.forEach((newEl, i) => {
      const curEl = currElements[i];

      // * update element textContent
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // * update changed element attributes
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attribute => {
          curEl.setAttribute(attribute.name, attribute.value);
        });
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(errorMessage = this._errorMessage) {
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${errorMessage}</p>
  </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
