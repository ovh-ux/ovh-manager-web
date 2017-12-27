var glob = require("glob");
var _ = require("lodash");
module.exports = {
    src: {
        js: [
            "client/app/components/**/*.module.js",
            "client/app/components/**/**.js",
            "client/app/*.module.js",
            "client/app/website/**/**.js",
            "client/app/domains/**/**.js",
            "client/app/domain/**/**.js",
            "client/app/domain-operation/**/**.js",
            "client/app/double-authentication/**/**.js",
            "client/app/email-domain/**/*.js",
            "client/app/hosting/**/**.js",
            "client/app/incident/**/*.js",
            "client/app/private-database/**/**.js",
            "client/app/dns-zone/**/**.js",
            "client/app/double-authentication/**/**.js",
            "client/app/feedback/**/**.js",
            "client/app/configuration/**/**.js",
            "client/app/labs/**/*.module.js",
            "client/app/labs/**/**.js",
            "client/app/app.js",
            "client/app/app.controller.js",
            "client/app/app.routes.js"
        ].concat(
            _.flatten(glob.sync("./client/bower_components/ovh-module-*-front/Assets.js").map(function (src) {
                "use strict";
                return require(src).src.js;
            }))
        ),
        jsES6: [
            "dist/app/components/**/*.module.js",
            "dist/app/components/**/**.js",
            "dist/app/*.module.js",
            "dist/app/website/**/**.js",
            "dist/app/domains/**/**.js",
            "dist/app/domain/**/**.js",
            "dist/app/domain-operation/**/**.js",
            "dist/app/double-authentication/**/**.js",
            "dist/app/email-domain/**/*.js",
            "dist/app/hosting/**/**.js",
            "dist/app/incident/**/**.js",
            "dist/app/private-database/**/**.js",
            "dist/app/dns-zone/**/**.js",
            "dist/app/double-authentication/**/**.js",
            "dist/app/feedback/**/**.js",
            "dist/app/configuration/**/**.js",
            "dist/app/labs/**/*.module.js",
            "dist/app/labs/**/**.js",
            "dist/app/**/*.app.js",
            "dist/app/**/*.module.js",
            "dist/app/**/*.js",
            "dist/app/app.js",
            "dist/app/app.controller.js",
            "dist/app/app.routes.js"
        ].concat(
            _.flatten(glob.sync("./client/bower_components/ovh-module-*-front/Assets.js").map(function (src) {
                "use strict";
                return require(src).src.js.map(function (src) {
                    return "dist/client/" + src;
                });
            }))
        ),
        css: [
            "client/app/**/*.css",
            "!client/app/css/open-sans/*.css",
            "client/app/css/main.css",
            "client/app/css/main-scss.css",
            "client/app/website/**/*.css",
            "client/app/domain/**/*.css",
            "client/app/components/checkboxSwitch/checkboxSwitch.css"
        ].concat(
            _.flatten(glob.sync("./client/bower_components/ovh-module-*-front/Assets.js").map(function (src) {
                "use strict";
                return require(src).src.css;
            }))
        ),
        less: [
            "client/app/css/**/*.less"
        ],
        scss: [
            "client/app/css/**/*.scss"
        ]
    },
    EU: {
        // Note: you need to add to src.css too
        modules: [
            "ovh-module-office",
            "ovh-module-emailpro",
            "ovh-module-exchange",
            "ovh-module-sharepoint"
        ]
    },
    CA: {
        modules: [
            "ovh-module-exchange"
        ]
    },
    common: {
        js: [
            "client/bower_components/moment/min/moment-with-locales.min.js",
            "client/bower_components/jquery/dist/jquery.min.js",

            "client/bower_components/jquery.ui/ui/core.js",
            "client/bower_components/jquery.ui/ui/widget.js",
            "client/bower_components/jquery.ui/ui/mouse.js",
            "client/bower_components/jquery.ui/ui/draggable.js",
            "client/bower_components/jquery.ui/ui/droppable.js",
            "client/bower_components/jquery.ui/ui/resizable.js",

            "client/bower_components/angular/angular.min.js",
            "client/bower_components/angular-aria/angular-aria.min.js",
            "client/bower_components/angular-route/angular-route.min.js",
            "client/bower_components/angular-ui-router/release/angular-ui-router.min.js",
            "client/bower_components/angular-sanitize/angular-sanitize.js",
            "client/bower_components/angular-cookies/angular-cookies.min.js",
            "client/bower_components/angular-messages/angular-messages.min.js",
            "client/bower_components/angular-resource/angular-resource.min.js",
            "client/bower_components/ovh-ui-angular/dist/oui-angular.min.js",
            "client/bower_components/lodash/lodash.min.js",
            "client/bower_components/jquery.scrollTo/jquery.scrollTo.min.js",
            "client/bower_components/angular-dynamic-locale/dist/tmhDynamicLocale.js",
            "client/bower_components/angular-flash-alert/dist/angular-flash.min.js",
            "client/bower_components/chart.js/dist/Chart.min.js",
            "client/bower_components/chartjs-plugin-zoom/chartjs-plugin-zoom.min.js",
            "client/bower_components/jquery.cookie/jquery.cookie.js",
            "client/bower_components/bootstrap/dist/js/bootstrap.min.js",
            "client/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
            "client/bower_components/moment-picker/dist/angular-moment-picker.min.js",
            "client/bower_components/raphael/raphael-min.js",
            "client/bower_components/justgage/justgage.js",
            "client/bower_components/ovh-utils-angular/bin/ovh-utils-angular.min.js",
            "client/bower_components/ovh-utils-angular/lib/core.js",
            // "src/js/app/libs/ng-upload.min.js",
            "client/bower_components/punycode/punycode.min.js",
            "client/bower_components/uri.js/src/URI.min.js",
            "client/bower_components/URIjs/src/URI.min.js",
            "client/bower_components/ipaddr.js/ipaddr.min.js",
            "client/bower_components/filesize/lib/filesize.min.js",
            "client/bower_components/ovh-angular-pagination-front/dist/ovh-angular-pagination-front.min.js",

            "client/bower_components/angular-scroll-glue/src/scrollglue.js",
            "client/bower_components/ovh-angular-tail-logs/dist/ovh-angular-tail-logs.min.js",

            "client/bower_components/ovh-angular-proxy-request/dist/ovh-angular-proxy-request.min.js",
            "client/bower_components/ovh-auth-service/dist/ovh-auth.min.js",
            "client/bower_components/ovh-angular-doubleauth-backupcode/dist/ovh-angular-doubleauth-backupcode.min.js",
            "client/bower_components/ovh-angular-q-allsettled/dist/ovh-angular-q-allsettled.min.js",
            "client/bower_components/ovh-angular-http/dist/ovh-angular-http.js",
            "client/bower_components/df-tab-menu/build/df-tab-menu.min.js",
            "client/bower_components/ovh-angular-swimming-poll/dist/ovh-angular-swimming-poll.min.js",
            "client/bower_components/validator-js/validator.min.js",
            "client/bower_components/aapiV6-auth/dist/aapiV6Auth.min.js",
            "client/bower_components/ovh-angular-export-csv/dist/ovh-angular-export-csv.js",
            "client/bower_components/angular-vs-repeat/src/angular-vs-repeat.min.js",
            "client/bower_components/at-internet-smarttag-manager/dist/smarttag.js",
            "client/bower_components/ng-at-internet/dist/ng-at-internet.min.js",
            "client/bower_components/at-internet-ui-router-plugin/dist/at-internet-ui-router-plugin.min.js",
            "client/bower_components/randexp/build/randexp.min.js",
            "client/bower_components/ovh-angular-user-pref/dist/ovh-angular-user-pref.min.js",
            "client/bower_components/ng-file-upload/ng-file-upload.min.js",
            "client/bower_components/angular-xeditable/dist/js/xeditable.min.js",
            "client/bower_components/jsurl/lib/jsurl.js",
            "client/bower_components/ovh-angular-sso-auth/dist/ovh-angular-sso-auth.js",
            "client/bower_components/ovh-angular-sso-auth-modal-plugin/dist/ovh-angular-sso-auth-modal-plugin.js",
            "client/bower_components/raven-js/dist/raven.min.js",
            "client/bower_components/raven-js/dist/plugins/angular.min.js",
            "client/bower_components/ovh-angular-sidebar-menu/dist/ovh-angular-sidebar-menu.min.js",
            "client/bower_components/angular-translate/angular-translate.min.js",
            "client/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js",
            "client/bower_components/ng-slide-down/dist/ng-slide-down.min.js",
            "client/bower_components/ovh-angular-actions-menu/dist/ovh-angular-actions-menu.min.js",
            "client/bower_components/ovh-angular-responsive-popover/dist/ovh-angular-responsive-popover.min.js",
            "client/bower_components/matchmedia-ng/matchmedia-ng.js",
            "client/bower_components/angular-translate-loader-partial/angular-translate-loader-partial.min.js",
            "client/bower_components/ovh-angular-responsive-tabs/dist/ovh-angular-responsive-tabs.min.js",
            "client/bower_components/ckeditor/ckeditor.js",
            "client/bower_components/ng-ckeditor/ng-ckeditor.js",
            "client/bower_components/ovh-angular-otrs/dist/ovh-angular-otrs.min.js",
            "client/bower_components/ovh-api-services/dist/ovh-api-services.min.js",
            "client/bower_components/ovh-angular-toaster/dist/ovh-angular-toaster.min.js",
            "client/bower_components/messenger/build/js/messenger.min.js",
            "client/bower_components/ovh-angular-toaster/dist/ovh-angular-toaster.min.js",
            "client/bower_components/ovh-jquery-ui-draggable-ng/dist/ovh-jquery-ui-draggable-ng.min.js",
            "client/bower_components/ovh-common-style/dist/ovh-common-style.min.js",
            "client/bower_components/clipboard/dist/clipboard.min.js"
        ],
        css : [
            "client/bower_components/moment-picker/dist/angular-moment-picker.min.css",
            "client/bower_components/ovh-utils-angular/bin/template/contracts/contracts.css",
            "client/bower_components/ovh-utils-angular/bin/template/tooltipBox/*.css",
            "client/bower_components/ovh-utils-angular/bin/template/contracts/*.css",
            "client/bower_components/ovh-utils-angular/bin/template/inputNumber/*.css",
            "client/bower_components/ovh-utils-angular/bin/template/wizard/wizardStep/*.css",
            "client/app/js/app/libs/tinymce/skins/lightgray/content.min.css",
            "client/app/js/app/libs/tinymce/skins/lightgray/skin.min.css",
            "client/bower_components/pagination-front/dist/pagination-front.min.css",
            "client/bower_components/font-awesome/css/font-awesome.min.css",
            "client/bower_components/animate.css/animate.min.css",
            "client/app/components/expiration/service-expiration-date.component.css",
            "client/bower_components/angular-xeditable/dist/css/xeditable.min.css",
            "client/app/components/fileEditor/file-editor.css",
            "client/app/js/app/directives/incrementNumber/incrementNumber.css",
            "client/bower_components/sso-auth-modal-plugin/dist/sso-auth-modal-plugin.css",
            "client/bower_components/ovh-angular-responsive-popover/dist/ovh-angular-responsive-popover.min.css",
            "client/bower_components/ovh-angular-tail-logs/dist/ovh-angular-tail-logs.css",
            "client/bower_components/messenger/build/css/messenger.css",
            "client/bower_components/ng-ckeditor/ng-ckeditor.css"
        ]
    },
    resources: {
        i18n: [
            "client/app/**/translations/**/*.xml",
            "client/app/resources/i18n/**/*.xml"
        ]
    }
};
