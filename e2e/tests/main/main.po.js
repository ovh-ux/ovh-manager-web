/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

"use strict";

var MainPage = function () {

    // LOGIN
    this.formEl = element(by.css("form[method='POST']"));
    this.loginEl = this.formEl.element(by.css("input[type='text']"));
    this.passwordEl = this.formEl.element(by.css("input[type='password']"));
    this.loginSubmitBtnEl = this.formEl.element(by.css("button[type='submit']"));

    // Because by binding it doesnt work, dont know why...
    // this.nicEl = element(by.binding("'('+user.nichandle+')'"));
    this.nicEl = element(by.css(".dropdown-menu-button span[data-ng-bind*='nichandle']"));

};

module.exports = new MainPage();
