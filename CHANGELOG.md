<a name="13.3.3"></a>
## [13.3.3](https://github.com/ovh-ux/ovh-manager-web/compare/v13.3.2...v13.3.3) (2018-05-02)


### Bug Fixes

* rename services to v6 and v7 ([165fb24](https://github.com/ovh-ux/ovh-manager-web/commit/165fb24)), closes [ovh-ux/ovh-api-services#68](https://github.com/ovh-ux/ovh-api-services/issues/68)
* **hosting:** Update translation for SSL Comodo validation ([f0d1615](https://github.com/ovh-ux/ovh-manager-web/commit/f0d1615))
* **hosting.ssl:** Resolution ovh-api-services ([031289c](https://github.com/ovh-ux/ovh-manager-web/commit/031289c))
* **i18n:** multiple qtlid ([863f728](https://github.com/ovh-ux/ovh-manager-web/commit/863f728))
* **navbar:** language button position and format ([7eaca86](https://github.com/ovh-ux/ovh-manager-web/commit/7eaca86))


### Features

* submit / retrieve ([23d5dc2](https://github.com/ovh-ux/ovh-manager-web/commit/23d5dc2))
* **chore:** bump ui-router to version ^1.0.0. ([33b7ee8](https://github.com/ovh-ux/ovh-manager-web/commit/33b7ee8))
* **i18n:** submit translations ([c23e235](https://github.com/ovh-ux/ovh-manager-web/commit/c23e235))



<a name="13.3.2"></a>
## [13.3.2](https://github.com/ovh-ux/ovh-manager-web/compare/v13.3.1...v13.3.2) (2018-04-26)



<a name="13.3.1"></a>
## [13.3.1](https://github.com/ovh-ux/ovh-manager-web/compare/v13.3.0...v13.3.1) (2018-04-16)



<a name="13.3.0"></a>
# 13.3.0 (2018-04-10)


### Bug Fixes

* update icons path and bump versions of ovh-ui-* ([077b846](https://github.com/ovh-ux/ovh-manager-web/commit/077b846))
* **analytics:** fix addStateNameFilter and change stateName app.x by web.x ([dffb515](https://github.com/ovh-ux/ovh-manager-web/commit/dffb515))
* **app:** Remove piwik ([5dacf9e](https://github.com/ovh-ux/ovh-manager-web/commit/5dacf9e))
* **auth:** apply the same fix as in dedicated to fix dev authentication ([dd6c6e0](https://github.com/ovh-ux/ovh-manager-web/commit/dd6c6e0))
* **deps:** fix security problems ([1e53279](https://github.com/ovh-ux/ovh-manager-web/commit/1e53279))
* **domain:** fix datagrid in domain/tasks ([a7abb86](https://github.com/ovh-ux/ovh-manager-web/commit/a7abb86))
* **domain:** fix loading when the service is expired ([9f423e7](https://github.com/ovh-ux/ovh-manager-web/commit/9f423e7))
* **domain.zone.record:** add .word-break to target value ([9314152](https://github.com/ovh-ux/ovh-manager-web/commit/9314152))
* **domain.zone.record:** add service type none to DKIM ([6d9625a](https://github.com/ovh-ux/ovh-manager-web/commit/6d9625a))
* **email:** improve HTML and remove unuse ([88fb9d6](https://github.com/ovh-ux/ovh-manager-web/commit/88fb9d6))
* add an explanation ([20f1091](https://github.com/ovh-ux/ovh-manager-web/commit/20f1091))
* **email-domain:** Fix for using deprecated API call ([8d358f0](https://github.com/ovh-ux/ovh-manager-web/commit/8d358f0))
* **email-domain:** Remove old guides ([201bdb3](https://github.com/ovh-ux/ovh-manager-web/commit/201bdb3))
* **email-domain:** Remove unused translation ([0d8a8d9](https://github.com/ovh-ux/ovh-manager-web/commit/0d8a8d9))
* **email-domain:** Use link instead of js for OMM ([07e8832](https://github.com/ovh-ux/ovh-manager-web/commit/07e8832))
* **email.delegate:** Set property to display quota progress bar ([74a89ab](https://github.com/ovh-ux/ovh-manager-web/commit/74a89ab))
* **pagination:** fix pagination translations ([6c1cedd](https://github.com/ovh-ux/ovh-manager-web/commit/6c1cedd))
* **privatedb:** update all bad catching for tasks ([02eaf80](https://github.com/ovh-ux/ovh-manager-web/commit/02eaf80))
* **privatedb:** update bad catching for tasks ([a1a52a5](https://github.com/ovh-ux/ovh-manager-web/commit/a1a52a5))
* **translation:** change field error translation pattern ([8f18c9c](https://github.com/ovh-ux/ovh-manager-web/commit/8f18c9c))


### Features

* add datagrid translations and configuration ([b817dec](https://github.com/ovh-ux/ovh-manager-web/commit/b817dec))
* **at-internet:** update lib and config ([7c922ca](https://github.com/ovh-ux/ovh-manager-web/commit/7c922ca))
* **domain:** add datagrid in domain/GLUE ([ecdb07c](https://github.com/ovh-ux/ovh-manager-web/commit/ecdb07c))
* **domain:** add datagrid in domain/tasks ([de66b1f](https://github.com/ovh-ux/ovh-manager-web/commit/de66b1f))
* **domain:** specify field size ([b623baf](https://github.com/ovh-ux/ovh-manager-web/commit/b623baf))
* **domain:** standardize default TTL modal with ui-kit ([5f8fec0](https://github.com/ovh-ux/ovh-manager-web/commit/5f8fec0))
* **domain:** support more than 5 numbers for TTL ([0fb7be1](https://github.com/ovh-ux/ovh-manager-web/commit/0fb7be1))
* **email:** oui-datagrid email-delegate-filter ([30bdbbe](https://github.com/ovh-ux/ovh-manager-web/commit/30bdbbe))
* **email:** oui-datagrid email-filter ([10c6e8c](https://github.com/ovh-ux/ovh-manager-web/commit/10c6e8c))
* **email:** oui-datagrid email-redirection ([c999734](https://github.com/ovh-ux/ovh-manager-web/commit/c999734))
* **email:** oui-datagrid task ([2bc613f](https://github.com/ovh-ux/ovh-manager-web/commit/2bc613f))
* **i18n:** submit/retrieve ([cc0e474](https://github.com/ovh-ux/ovh-manager-web/commit/cc0e474))
* **msg:** adding message for task ([d581736](https://github.com/ovh-ux/ovh-manager-web/commit/d581736))
* **oui-field:** configure translations ([c5b048b](https://github.com/ovh-ux/ovh-manager-web/commit/c5b048b))



<a name="13.2.2"></a>
## [13.2.2](https://github.com/ovh-ux/ovh-manager-web/compare/v13.2.1...v13.2.2) (2018-03-14)



<a name="13.2.1"></a>
## [13.2.1](https://github.com/ovh-ux/ovh-manager-web/compare/v13.2.0...v13.2.1) (2018-03-08)


### Bug Fixes

* **email-domain:** Use link instead of js for OMM ([07e8832](https://github.com/ovh-ux/ovh-manager-web/commit/07e8832))



<a name="13.2.0"></a>
# [13.2.0](https://github.com/ovh-ux/ovh-manager-web/compare/v13.1.1...v13.2.0) (2018-03-01)



<a name="13.1.1"></a>
## [13.1.1](https://github.com/ovh-ux/ovh-manager-web/compare/v13.1.0...v13.1.1) (2018-02-28)


### Bug Fixes

* **email:** improve HTML and remove unuse ([88fb9d6](https://github.com/ovh-ux/ovh-manager-web/commit/88fb9d6))
* **email-domain:** Fix for using deprecated API call ([8d358f0](https://github.com/ovh-ux/ovh-manager-web/commit/8d358f0))
* **email-domain:** Remove unused translation ([0d8a8d9](https://github.com/ovh-ux/ovh-manager-web/commit/0d8a8d9))


### Features

* **email:** oui-datagrid email-delegate-filter ([30bdbbe](https://github.com/ovh-ux/ovh-manager-web/commit/30bdbbe))
* **email:** oui-datagrid email-filter ([10c6e8c](https://github.com/ovh-ux/ovh-manager-web/commit/10c6e8c))
* **email:** oui-datagrid email-redirection ([c999734](https://github.com/ovh-ux/ovh-manager-web/commit/c999734))
* **email:** oui-datagrid task ([2bc613f](https://github.com/ovh-ux/ovh-manager-web/commit/2bc613f))



<a name="13.1.0"></a>
# [13.1.0](https://github.com/ovh-ux/ovh-manager-web/compare/v13.0.1...v13.1.0) (2018-02-13)



<a name="13.0.1"></a>
## [13.0.1](https://github.com/ovh-ux/ovh-manager-web/compare/v13.0.0...v13.0.1) (2018-02-05)



<a name="13.0.0"></a>
# [13.0.0](https://github.com/ovh-ux/ovh-manager-web/compare/v12.5.0...v13.0.0) (2018-01-29)


### Bug Fixes

* **domain:** fix datagrid in domain/tasks ([a7abb86](https://github.com/ovh-ux/ovh-manager-web/commit/a7abb86))
* **domain:** fix loading when the service is expired ([9f423e7](https://github.com/ovh-ux/ovh-manager-web/commit/9f423e7))
* **pagination:** fix pagination translations ([6c1cedd](https://github.com/ovh-ux/ovh-manager-web/commit/6c1cedd))



<a name="12.5.0"></a>
# [12.5.0](https://github.com/ovh-ux/ovh-manager-web/compare/v12.4.1...v12.5.0) (2018-01-23)


### Features

* add datagrid translations and configuration ([b817dec](https://github.com/ovh-ux/ovh-manager-web/commit/b817dec))
* **domain:** add datagrid in domain/GLUE ([ecdb07c](https://github.com/ovh-ux/ovh-manager-web/commit/ecdb07c))
* **domain:** add datagrid in domain/tasks ([de66b1f](https://github.com/ovh-ux/ovh-manager-web/commit/de66b1f))



<a name="12.4.1"></a>
## [12.4.1](https://github.com/ovh-ux/ovh-manager-web/compare/v12.4.0...v12.4.1) (2018-01-09)



<a name="12.4.0"></a>
# [12.4.0](https://github.com/ovh-ux/ovh-manager-web/compare/v12.3.0...v12.4.0) (2018-01-04)



<a name="12.3.0"></a>
# [12.3.0](https://github.com/ovh-ux/ovh-manager-web/compare/v12.2.2...v12.3.0) (2018-01-04)



<a name="12.2.2"></a>
## [12.2.2](https://github.com/ovh-ux/ovh-manager-web/compare/v12.2.1...v12.2.2) (2017-12-14)



<a name="12.2.1"></a>
## [12.2.1](https://github.com/ovh-ux/ovh-manager-web/compare/v12.2.0...v12.2.1) (2017-12-13)



<a name="12.2.0"></a>
# [12.2.0](https://github.com/ovh-ux/ovh-manager-web/compare/v12.1.3...v12.2.0) (2017-12-07)


### Bug Fixes

* **deps:** fix security problems ([1e53279](https://github.com/ovh-ux/ovh-manager-web/commit/1e53279))



<a name="12.1.3"></a>
## [12.1.3](https://github.com/ovh-ux/ovh-manager-web/compare/v12.1.2...v12.1.3) (2017-12-01)



<a name="12.1.2"></a>
## [12.1.2](https://github.com/ovh-ux/ovh-manager-web/compare/v12.1.1...v12.1.2) (2017-11-29)



<a name="12.1.1"></a>
## [12.1.1](https://github.com/ovh-ux/ovh-manager-web/compare/v12.1.0...v12.1.1) (2017-11-22)


### Features

* **at-internet:** update lib and config ([7c922ca](https://github.com/ovh-ux/ovh-manager-web/commit/7c922ca))



<a name="12.1.0"></a>
# [12.1.0](https://github.com/ovh-ux/ovh-manager-web/compare/v12.0.9...v12.1.0) (2017-11-16)



<a name="12.0.9"></a>
## [12.0.9](https://github.com/ovh-ux/ovh-manager-web/compare/v12.0.8...v12.0.9) (2017-11-14)



<a name="12.0.8"></a>
## [12.0.8](https://github.com/ovh-ux/ovh-manager-web/compare/v12.0.7...v12.0.8) (2017-11-13)



<a name="12.0.7"></a>
## [12.0.7](https://github.com/ovh-ux/ovh-manager-web/compare/v12.0.6...v12.0.7) (2017-11-13)



<a name="12.0.6"></a>
## [12.0.6](https://github.com/ovh-ux/ovh-manager-web/compare/v12.0.5...v12.0.6) (2017-11-09)


### Features

* **msg:** adding message for task ([d581736](https://github.com/ovh-ux/ovh-manager-web/commit/d581736))



<a name="12.0.5"></a>
## [12.0.5](https://github.com/ovh-ux/ovh-manager-web/compare/v12.0.4...v12.0.5) (2017-11-08)



<a name="12.0.4"></a>
## [12.0.4](https://github.com/ovh-ux/ovh-manager-web/compare/v12.0.3...v12.0.4) (2017-11-06)



<a name="12.0.3"></a>
## [12.0.3](https://github.com/ovh-ux/ovh-manager-web/compare/v12.0.2...v12.0.3) (2017-11-02)



<a name="12.0.2"></a>
## [12.0.2](https://github.com/ovh-ux/ovh-manager-web/compare/v12.0.1...v12.0.2) (2017-11-02)



<a name="12.0.1"></a>
## [12.0.1](https://github.com/ovh-ux/ovh-manager-web/compare/v12.0.0...v12.0.1) (2017-11-02)



<a name="12.0.0"></a>
# [12.0.0](https://github.com/ovh-ux/ovh-manager-web/compare/v11.2.1...v12.0.0) (2017-11-02)



<a name="11.2.1"></a>
## [11.2.1](https://github.com/ovh-ux/ovh-manager-web/compare/v11.2.0...v11.2.1) (2017-10-30)



<a name="11.2.0"></a>
# [11.2.0](https://github.com/ovh-ux/ovh-manager-web/compare/v11.1.5...v11.2.0) (2017-10-18)



<a name="11.1.5"></a>
## [11.1.5](https://github.com/ovh-ux/ovh-manager-web/compare/v11.1.4...v11.1.5) (2017-10-12)



<a name="11.1.4"></a>
## [11.1.4](https://github.com/ovh-ux/ovh-manager-web/compare/v11.1.3...v11.1.4) (2017-10-11)



<a name="11.1.3"></a>
## [11.1.3](https://github.com/ovh-ux/ovh-manager-web/compare/v11.1.2...v11.1.3) (2017-10-11)



<a name="11.1.2"></a>
## [11.1.2](https://github.com/ovh-ux/ovh-manager-web/compare/v11.1.1...v11.1.2) (2017-10-10)



<a name="11.1.1"></a>
## [11.1.1](https://github.com/ovh-ux/ovh-manager-web/compare/v11.1.0...v11.1.1) (2017-10-10)



<a name="11.1.0"></a>
# [11.1.0](https://github.com/ovh-ux/ovh-manager-web/compare/v11.0.19...v11.1.0) (2017-10-09)



<a name="11.0.19"></a>
## [11.0.19](https://github.com/ovh-ux/ovh-manager-web/compare/v11.0.18...v11.0.19) (2017-10-05)



<a name="11.0.18"></a>
## [11.0.18](https://github.com/ovh-ux/ovh-manager-web/compare/v11.0.17...v11.0.18) (2017-10-03)



<a name="11.0.17"></a>
## [11.0.17](https://github.com/ovh-ux/ovh-manager-web/compare/v11.0.16...v11.0.17) (2017-10-03)


### Bug Fixes

* add an explanation ([20f1091](https://github.com/ovh-ux/ovh-manager-web/commit/20f1091))



<a name="11.0.16"></a>
## [11.0.16](https://github.com/ovh-ux/ovh-manager-web/compare/v11.0.15...v11.0.16) (2017-10-02)


### Bug Fixes

* **app:** Remove piwik ([5dacf9e](https://github.com/ovh-ux/ovh-manager-web/commit/5dacf9e))



<a name="11.0.15"></a>
## [11.0.15](https://github.com/ovh-ux/ovh-manager-web/compare/v11.0.14...v11.0.15) (2017-09-26)



<a name="11.0.14"></a>
## [11.0.14](https://github.com/ovh-ux/ovh-manager-web/compare/v11.0.13...v11.0.14) (2017-09-25)


### Bug Fixes

* **analytics:** fix addStateNameFilter and change stateName app.x by web.x ([dffb515](https://github.com/ovh-ux/ovh-manager-web/commit/dffb515))



<a name="11.0.13"></a>
## [11.0.13](https://github.com/ovh-ux/ovh-manager-web/compare/v11.0.12...v11.0.13) (2017-09-21)



<a name="11.0.12"></a>
## [11.0.12](https://github.com/ovh-ux/ovh-manager-web/compare/v11.0.11...v11.0.12) (2017-09-21)



<a name="11.0.11"></a>
## [11.0.11](https://github.com/ovh-ux/ovh-manager-web/compare/v11.0.10...v11.0.11) (2017-09-18)



<a name="11.0.10"></a>
## [11.0.10](https://github.com/ovh-ux/ovh-manager-web/compare/v11.0.9...v11.0.10) (2017-09-15)



<a name="11.0.9"></a>
## [11.0.9](https://github.com/ovh-ux/ovh-manager-web/compare/v11.0.8...v11.0.9) (2017-09-14)


### Bug Fixes

* **domain.zone.record:** add service type none to DKIM ([6d9625a](https://github.com/ovh-ux/ovh-manager-web/commit/6d9625a))



<a name="11.0.8"></a>
## [11.0.8](https://github.com/ovh-ux/ovh-manager-web/compare/v11.0.7...v11.0.8) (2017-09-14)



<a name="11.0.7"></a>
## [11.0.7](https://github.com/ovh-ux/ovh-manager-web/compare/v11.0.6...v11.0.7) (2017-09-13)



<a name="11.0.6"></a>
## [11.0.6](https://github.com/ovh-ux/ovh-manager-web/compare/v11.0.5...v11.0.6) (2017-09-12)



<a name="11.0.5"></a>
## [11.0.5](https://github.com/ovh-ux/ovh-manager-web/compare/v11.0.4...v11.0.5) (2017-09-12)



<a name="11.0.4"></a>
## [11.0.4](https://github.com/ovh-ux/ovh-manager-web/compare/v11.0.3...v11.0.4) (2017-09-12)



<a name="11.0.3"></a>
## [11.0.3](https://github.com/ovh-ux/ovh-manager-web/compare/v11.0.2...v11.0.3) (2017-09-11)



<a name="11.0.2"></a>
## [11.0.2](https://github.com/ovh-ux/ovh-manager-web/compare/v11.0.1...v11.0.2) (2017-09-11)



<a name="11.0.1"></a>
## [11.0.1](https://github.com/ovh-ux/ovh-manager-web/compare/v10.0.3...v11.0.1) (2017-09-11)



<a name="10.0.3"></a>
## [10.0.3](https://github.com/ovh-ux/ovh-manager-web/compare/v10.0.2...v10.0.3) (2017-09-11)


### Bug Fixes

* **domain.zone.record:** add .word-break to target value ([9314152](https://github.com/ovh-ux/ovh-manager-web/commit/9314152))



<a name="10.0.2"></a>
## [10.0.2](https://github.com/ovh-ux/ovh-manager-web/compare/v10.0.1...v10.0.2) (2017-09-11)



<a name="10.0.1"></a>
## [10.0.1](https://github.com/ovh-ux/ovh-manager-web/compare/v10.0.0...v10.0.1) (2017-09-11)



<a name="10.0.0"></a>
# 10.0.0 (2017-09-11)


