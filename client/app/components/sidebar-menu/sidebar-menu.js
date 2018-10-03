angular.module('App').run(($translate, asyncLoader) => {
  asyncLoader.addTranslations(import(`ovh-angular-sidebar-menu/src/ovh-angular-sidebar-menu/translations/Messages_${$translate.use()}.xml`).then(x => x.default));
  $translate.refresh();
});
