import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function(e) {
        const btn = e.target.closest('.btn--inline');

        if(!btn) return;

        const goto = +btn.dataset.goto;
        handler(goto);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

    //Page 1, there are other pages
    if(currentPage === 1 && numPages > 1) {
      return `
      <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
        <span>Page ${currentPage + 1}</span>
      </button>
      `;
    }

    //Last page
    if(currentPage === numPages && numPages > 1) {
        return `
        <button data-goto="${currentPage - 1}" data class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>
        `;
    }

    //Ohter page 
    if(currentPage < numPages) {
      return `
      <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
        <span>Page ${currentPage + 1}</span>
      </button>
      <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>
      `;
    }

    return '';
  }
}

export default new PaginationView();