{
  class Navbar {
    static buildMenuTitle(title) {
      const { firstHalf, secondHalf } = Navbar.splitTextInHalf(title);
      return `
      <span class="d-inline-block">
        <span class="oui-color-gothic">
          ${firstHalf}
        </span><br>
        ${secondHalf}
      </span>
      <span
          class="oui-icon oui-icon-chevron-down navbar__down-arrow"
          aria-hidden="true"></span>`;
    }

    static splitTextInHalf(text) {
      return text
        .split(' ')
        .reduce((previousValue, currentValue, currentIndex, array) => {
          if (currentIndex < array.length / 2) {
            return Object.assign({}, previousValue, { firstHalf: `${previousValue.firstHalf} ${currentValue}` });
          }

          return Object.assign({}, previousValue, { secondHalf: `${previousValue.secondHalf} ${currentValue}` });
        }, {
          firstHalf: '',
          secondHalf: '',
        });
    }
  }

  angular
    .module('services')
    .service('navbar', Navbar);
}
