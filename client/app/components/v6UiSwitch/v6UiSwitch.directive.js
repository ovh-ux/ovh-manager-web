angular.module('directives').directive('v6UiSwitch', () => {
  const V6UiSwitchState = function (options) {
    this._data = {};

    if (options) {
      if (typeof options === 'object') {
        this.checked = !!options.checked;
        this.disabled = !!options.disabled;
        this.pending = !!options.pending;
        this.partial = !!options.partial;
      } else {
        this.checked = true;
        this.disabled = false;
        this.pending = false;
        this.partial = false;
      }
    } else {
      this.checked = false;
      this.disabled = false;
      this.pending = false;
      this.partial = false;
    }

    if (Object.seal) {
      Object.seal(this);
    }
  };
  Object.defineProperties(V6UiSwitchState.prototype, {
    _data: {
      enumerable: false,
      configurable: false,
      writable: true,
      value: null,
    },
    checked: {
      enumerable: true,
      configurable: false,
      get() {
        return this._data.checked;
      },
      set(val) {
        this._data.checked = !!val;
        this._data.partial = false;
      },
    },
    disabled: {
      enumerable: true,
      configurable: false,
      get() {
        return this._data.disabled;
      },
      set(val) {
        this._data.disabled = !!val;
      },
    },
    pending: {
      enumerable: true,
      configurable: false,
      get() {
        return this._data.pending;
      },
      set(val) {
        this._data.pending = !!val;
      },
    },
    partial: {
      enumerable: true,
      configurable: false,
      get() {
        return this._data.partial;
      },
      set(val) {
        this._data.partial = !!val;
        if (this._data.partial) {
          this._data.checked = false;
        }
      },
    },
    switch: {
      enumerable: false,
      configurable: false,
      writable: false,
      value() {
        if (this.disabled) {
          return false;
        }

        this.checked = !this.checked;
        return true;
      },
    },
  });

  function link($scope, $element, attrs) {
    let Switch = _.get($scope, attrs.ngModel);

    if (!Switch) {
      Switch = new V6UiSwitchState();
      _.set($scope, attrs.ngModel, Switch);
      return;
    }

    if (typeof Switch === 'object' && Object.getPrototypeOf(Switch) === V6UiSwitchState.prototype) {
      return;
    }

    Switch = new V6UiSwitchState(Switch);
    _.set($scope, attrs.ngModel, Switch);
  }

  return {
    restrict: 'AE',
    replace: true, // DEPRECATED
    require: '?ngModel',
    scope: false,
    link,
    template(element, attrs) {
      let html = `<button type="button" class="v6us-switch${attrs.class ? ` ${attrs.class}` : ''}"`;

      if (attrs.ngModel) {
        html += ` data-ng-click="${attrs.ngModel}.switch()`;
        if (attrs.ngChange) {
          html += ` && ${attrs.ngChange}`;
        }
        html += '"';
      }

      if (attrs.tooltip) {
        html += ` data-tooltip="${attrs.tooltip}"`;
        element.removeAttr(attrs.$attr.tooltip);

        if (attrs.tooltipAppendToBody) {
          html += ` data-tooltip-append-to-body="${attrs.tooltipAppendToBody}"`;
          element.removeAttr(attrs.$attr.tooltipAppendToBody);
        }
      }

      html += ` data-ng-class="{ checked:${attrs.ngModel}.checked, disabled:${attrs.ngModel}.disabled, pending:${attrs.ngModel}.pending, partial:${attrs.ngModel}.partial}"`;
      html += '>';
      html += '<small></small>';

      html += '<span class="v6us-switch-text">';
      html += '<span class="v6us-on"><span class="oui-icon oui-icon-success"></span></span>';
      html += '<span class="v6us-off"><span class="oui-icon oui-icon-error"></span></span>';
      html += '<span class="v6us-partial"><span class="oui-icon oui-icon-remove"></span></span>';
      html += '<span class="v6us-pending"><span class="fa fa-circle-o-notch fa-spin"></span></span>';
      html += '</button>';

      return html;
    },
  };
});
