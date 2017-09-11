angular.module("App").controller(
    "PrivateDatabaseAddUserCtrl",
    class PrivateDatabaseAddUserCtrl {
        constructor (Alerter, PrivateDatabase, $scope, $stateParams) {
            this.alerter = Alerter;
            this.privateDatabaseService = PrivateDatabase;
            this.$scope = $scope;
            this.$stateParams = $stateParams;
        }

        $onInit () {
            this.users = this.$scope.currentActionData.user;
            this.productId = this.$stateParams.productId;

            this.model = {
                password: {
                    value: "",
                    confirm: "",
                    condition: {
                        pattern: /^(?=[a-z0-9A-Z]*[A-Z])(?=[a-z0-9A-Z]*[a-z])(?=[a-z0-9A-Z]*[0-9])[a-z0-9A-Z]*$/,
                        length: {
                            min: 8,
                            max: 31
                        }
                    }
                },
                user: {
                    value: "",
                    condition: {
                        pattern: /^[\w\d\-_\.]*$/,
                        length: {
                            min: 1,
                            max: 16
                        }
                    }
                }
            };

            this.$scope.hasError = (label) => label.$invalid && label.$dirty;

            this.$scope.addUser = () => {
                this.$scope.resetAction();
                this.privateDatabaseService
                    .addUser(this.productId, this.model.password.value, this.model.user.value)
                    .then(() => {
                        this.alerter.success(this.$scope.tr("privateDatabase_add_user_success"), "privateDataBase.alerts.users");
                    })
                    .catch(() => {
                        this.alerter.error(this.$scope.tr("privateDatabase_add_user_fail"), "privateDataBase.alerts.users");
                    });
            };
        }

        isPasswordValid () {
            return this.model.password.value && this.model.password.value.length && this.model.password.condition.pattern.test(this.model.password.value);
        }

        isPasswordConfirmed () {
            return this.model.password.value === this.model.password.confirm;
        }

        isNameValid () {
            return this.model.user.value && this.model.user.value.length && this.model.user.condition.pattern.test(this.model.user.value) && !this.nameAlreadyExist();
        }

        nameAlreadyExist () {
            return _.indexOf(this.users, this.model.user.value) !== -1;
        }

        getClassLabel (label, errorValue) {
            if (label && label.$dirty) {
                return label.$invalid || errorValue || this.nameAlreadyExist() ? "has-error" : "has-success";
            }
            return "";
        }
    }
);
