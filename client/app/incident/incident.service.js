angular.module("services").service(
    "incident",
    class Incident {
        constructor (OvhHttp) {
            this.OvhHttp = OvhHttp;
        }

        getOvhTasks () {
            return this.OvhHttp.get("/ovh-tasks", {
                rootPath: "2api"
            });
        }
    }
);
