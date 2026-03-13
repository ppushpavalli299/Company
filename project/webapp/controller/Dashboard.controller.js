sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("project.controller.Dashboard", {

        onPressCompany: function () {
            this.getOwnerComponent().getRouter().navTo("company");
        },

        onPressUser: function () {
            this.getOwnerComponent().getRouter().navTo("user");
        }

    });

});