sap.ui.define([
    "project/controller/BaseController",
    "sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("project.controller.AppUnified", {

        onInit: function () {

            // Layout model for FCL
            var oLayoutModel = new JSONModel({ layout: "OneColumn" });
            this.getView().setModel(oLayoutModel, "layoutModel");

            // Side navigation model
            var oData = {
                selectedKey: "dashboard",
                navigation: [
                    {
                        title: "Dashboard",
                        icon: "sap-icon://home",
                        key: "dashboard"
                    },
                    {
                        title: "Company",
                        icon: "sap-icon://company-view",
                        key: "company",
                        expanded: true,
                        items: [
                            { title: "Company List", key: "company", enabled: true },
                            { title: "Create Company", key: "create_company", enabled: true }
                        ]
                    },
                    {
                        title: "User",
                        icon: "sap-icon://employee",
                        key: "user",
                        expanded: true,
                        items: [
                            { title: "User List", key: "user", enabled: true },
                            { title: "Create User", key: "create_user", enabled: true }
                        ]
                    }
                ]
            };
            this.getView().setModel(new JSONModel(oData), "sideNavigation");

            // Listen for route changes to update layout
            this.getOwnerComponent().getRouter().attachRouteMatched(this._onRouteMatched.bind(this));
        },

        _onRouteMatched: function (oEvent) {
            var oArgs = oEvent.getParameter("arguments");
            var sLayout = oArgs ? oArgs.layout : "OneColumn";
            this.getView().getModel("layoutModel").setProperty("/layout", sLayout);
        },

        onItemSelect: function (oEvent) {
            var oItem = oEvent.getParameter("item");
            var sKey = oItem.getKey();
            if (!sKey) return;

            this.getView().getModel("sideNavigation").setProperty("/selectedKey", sKey);

            // Navigation to route with default layout
            var oRouter = this.getOwnerComponent().getRouter();
            if (sKey === "company") {
                oRouter.navTo("company", { layout: "OneColumn" });
            } else if (sKey === "create_company") {
                oRouter.navTo("create_company", { layout: "TwoColumnsMidExpanded" });
            } else {
                oRouter.navTo(sKey);
            }
        },

        onToggleMenu: function () {
            var oToolPage = this.byId("toolPage");
            oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
        }

    });
});