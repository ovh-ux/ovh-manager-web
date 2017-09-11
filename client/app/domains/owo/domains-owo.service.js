angular.module("services").service(
    "DomainsOwo",
    class DomainsOwo {
        /**
         * Constructor
         * @param OvhHttp
         * @param JavaEnum
         */
        constructor (OvhHttp, JavaEnum) {
            this.OvhHttp = OvhHttp;
            this.JavaEnum = JavaEnum;
        }

        /**
         * Get the owo fields
         */
        getOwoFields () {
            return this.OvhHttp
                .get("/domain.json", {
                    rootPath: "apiv6",
                    cache: "models.domain"
                })
                .then((models) => {
                    const owoEnum = models.models["domain.WhoisObfuscatorFieldsEnum"].enum;
                    return owoEnum.map((owo) => this.JavaEnum.tr(owo));
                });
        }

        /**
         * Update the owo fields
         * @param activated
         * @param desactivated
         * @param domains : array of domains names to apply the modification
         */
        updateOwoFields (activated, desactivated, domains) {
            return this.OvhHttp.put("/sws/domains/owo", {
                rootPath: "2api",
                data: {
                    domains,
                    activated,
                    desactivated
                },
                broadcast: "domains.list.refresh"
            });
        }
    }
);
