angular
  .module('services')
  .service('APITranslator', class APITranslator {
    constructor($translate) {
      this.$translate = $translate;
    }

    translate(APIResponse) {
      const { message } = APIResponse;
      const match = message && /^#([a-zA-Z0-9-_]+)\s/.exec(message);
      const id = match && match[1];
      const translationId = id && `common_api_${id}`;
      const translation = translationId && this.$translate.instant(translationId);
      return (translation && translation !== translationId)
        ? { message: translation }
        : APIResponse;
    }
  });
