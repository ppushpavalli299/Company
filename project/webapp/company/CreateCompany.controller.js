sap.ui.define([
    "project/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (BaseController, JSONModel, MessageBox) {
    "use strict";
    return BaseController.extend("project.company.CreateCompany", {
        onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("create_company")
                .attachPatternMatched(this._onRouteMatched, this);
        },
        _onRouteMatched: function () {
            var statusData = {
                status: [
                    { key: "1", text: "Draft" },
                    { key: "2", text: "Active" },
                    { key: "3", text: "Inactive" }
                ]
            };

            this.getView().setModel(
                new JSONModel(statusData),
                "masterdataMdl"
            );
            var obj = {
                name: "",
                designation: "",
                status: "1"
            };
            this.getView().setModel(
                new JSONModel(obj),
                "createEmpMdl"
            );

        },
        onPressCancel: function () {
            this.oRouter.navTo("company");
        },
        handleClose: function () {
            this.getRouter().navTo("company");

        }

    });

});