{
  class Navbar {
    static buildMenuHeader(text) {
      return `
      <span class="navbar__header-content">
        <span class="d-flex">
          ${text}
          <span
              class="oui-icon navbar__arrow"
              aria-hidden="true"></span>
        </span>
      </span>`;
    }
  }

  angular
    .module('services')
    .service('navbar', Navbar);
}
