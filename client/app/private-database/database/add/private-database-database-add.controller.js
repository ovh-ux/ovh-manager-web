angular.module("App").controller(
    "PrivateDatabaseAddBddCtrl",
    class PrivateDatabaseAddBddCtrl {
        constructor ($scope, $q, $stateParams, Alerter, PrivateDatabase, Hosting) {
            this.$scope = $scope;
            this.$q = $q;
            this.$stateParams = $stateParams;
            this.Alerter = Alerter;
            this.PrivateDatabase = PrivateDatabase;
            this.Hosting = Hosting;

            this.bdd = {
                value: null,
                addUser: false,
                addUserLogin: "",
                addUserGrant: "",
                addUserPassword: "",
                addUserPasswordConfirm: ""
            };
        }

        $onInit () {
            this.productId = this.$stateParams.productId;

            this.model = {
                addUser: false,
                database: {
                    value: "",
                    condition: {
                        length: {
                            min: 3,
                            max: 50
                        },
                        reg: /^([\d\w\_\-]){3,50}$/
                    }
                },
                user: {
                    login: {
                        value: "",
                        condition: {
                            length: {
                                min: 1,
                                max: 16
                            },
                            reg: /^([\d\w\_\.\-]){1,16}$/
                        }
                    },
                    grant: {
                        value: ""
                    },
                    password: {
                        value: "",
                        confirm: "",
                        condition: {
                            length: {
                                min: 8,
                                max: 31
                            }
                        }
                    }
                }
            };

            this.PrivateDatabase.getModels().then((models) => {
                this.grantEnum = models["hosting.PrivateDatabase.grant.GrantEnum"].enum;
            });

            this.$scope.addBdd = () => this.addBdd();

            this.$scope.isBddValid = () => this.isBddValid();
        }

        addBdd () {
            this.$scope.resetAction();

            this.$q
                .when(this.model.addUser)
                .then((addUser) => {
                    if (addUser) {
                        return this.PrivateDatabase.addBddWizard(this.productId, {
                            databaseName: this.model.database.value,
                            grant: this.model.user.grant.value,
                            password: this.model.user.password.value,
                            userName: this.model.user.login.value
                        });
                    }
                    return this.PrivateDatabase.addBdd(this.productId, this.model.database.value);
                })
                .then(() => this.Alerter.success(this.$scope.tr("privateDatabase_add_bdd_success"), this.$scope.alerts.main),
                      () => this.Alerter.error(this.$scope.tr("privateDatabase_add_bdd_fail"), this.$scope.alerts.main));
        }

        isBddValid () {
            if (!this.model.addUser) {
                return this.isBddNameValid();
            }
            return this.isBddNameValid() && this.isLoginValid() && this.isPasswordValid() && !!this.model.user.grant.value;
        }

        isBddNameValid () {
            return this.model.database.value && this.model.database.condition.reg.test(this.model.database.value);
        }

        isLoginValid () {
            return this.model.user.login.value && this.model.user.login.condition.reg.test(this.model.user.login.value);
        }

        isPasswordValid () {
            return this.checkPassword() && this.checkPasswordConfirm();
        }

        checkPassword () {
            return this.model.user.password.value && this.Hosting.constructor.isPasswordValid(this.model.user.password.value);
        }

        checkPasswordConfirm () {
            return this.model.user.password.confirm && this.Hosting.constructor.isPasswordValid(this.model.user.password.confirm) && this.model.user.password.confirm === this.model.user.password.value;
        }

        getGrantLabel (grant) {
            return grant ? this.$scope.tr(`privateDatabase_add_bdd_new_user_grant_${grant}`) : "";
        }
    }
);
