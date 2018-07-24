angular.module('App').controller('DocumentUploadCtrl', [
  '$scope',
  'User',

  function documentUploadCtrl($scope, User) {
    const self = this;
    $scope.isValid = true;
    $scope.uploadFileName = '';
    $scope.uploadFileFile = '';
    $scope.atLeastOneFileHasBeenSend = false;

    this.uploadFileNameCheck = (input) => {
      const value = input.$viewValue;
      input.$setValidity('required', !!value);
    };

    // TODO: Refactor to have validation on parent for better reusable component
    this.uploadFileFileCheck = (input, file, documentType) => {
      input.$setValidity('required', !!file);
      input.$setValidity('format', false);

      if (
        !documentType
        || (Array.isArray(documentType)
          && !!file
          && file.type
          && documentType.indexOf(file.type) !== -1)
      ) {
        input.$setValidity('format', true);
      }
    };

    this.isValid = (file, documentType) => {
      self.uploadFileNameCheck($scope.formFileUpload.uploadFileName);
      self.uploadFileFileCheck($scope.formFileUpload.file, file, documentType);

      return (
        $scope.formFileUpload.$valid
        && $scope.formFileUpload.file.$valid
        && $scope.formFileUpload.file
      );
    };

    $scope.submit = () => {
      $scope.uploadFile(
        $scope.uploadFileFile,
        [{ key: 'WEB_HOSTING_DATABASE_IMPORT_SCRIPT', value: 'true' }],
        ['application/gzip', 'application/x-gzip'],
      );
    };

    /**
     * @param file: meta of the file
     * @param tags: Array of object that contains key and value
     * ([{key: "DOMAIN_PARAMETER_NAME", value: "X"},...]
     * @param format: Array of allowed file format ex: ['application/gzip',...]
     */
    $scope.uploadFile = (file, tags, documentType) => {
      if (!self.isValid(file, documentType)) {
        return;
      }

      const filename = $scope.formFileUpload.uploadFileName.$viewValue;

      $scope.isSendingFile = true;
      User.uploadFile(filename, file, tags)
        .then(
          (id) => {
            if (!$scope.model.document) {
              $scope.model.document = {};
            }
            $scope.model.document.id = id;
            $scope.model.newFileUploaded = true;
            $scope.$emit('DocumentUploadCtrl.onFileUploadSendCompleted', {
              file,
              id,
            });
            $scope.atLeastOneFileHasBeenSend = true;
          },
          (err) => {
            $scope.$emit('DocumentUploadCtrl.onFileUploadSendFailed', {
              file,
              error: err,
            });
          },
        )
        .finally(() => {
          $scope.isSendingFile = false;
        });
    };
  },
]);
