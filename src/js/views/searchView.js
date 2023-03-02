class SearchView {
  _parentElement = document.querySelector('.search');
  _searchFieldElement = this._parentElement.querySelector('.search__field');

  getQuery() {
    const query = this._searchFieldElement.value;
    this._blurSearchInput();
    return query;
  }

  _blurSearchInput() {
    this._searchFieldElement.blur();
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });

    this._searchFieldElement.addEventListener('click', function (e) {
      e.target.select();
    });
  }
}

export default new SearchView();
