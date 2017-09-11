angular.module("App").run(($translate, $translatePartialLoader) => {
    $translatePartialLoader.addPart("common");
    $translatePartialLoader.addPart("components");
    $translate.refresh();
});
