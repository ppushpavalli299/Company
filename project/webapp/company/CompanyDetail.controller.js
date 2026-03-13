sap.ui.define([
    "project/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (BaseController, JSONModel, MessageBox) {
    "use strict";
    return BaseController.extend("project.company.CompanyDetail", {
        onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("company_detail")
                .attachPatternMatched(this._onRouteMatched, this);
            this.getView().setModel(new JSONModel(), "empdetailsMdl");
            this.getView().setModel(new JSONModel({
                edit: false,
                view: true
            }), "visible");

        },
        _onRouteMatched: function (oEvent) {
            this._item = oEvent.getParameter("arguments").id;
            var statusData = {
                status: [
                    { key: "1", text: "Draft" },
                    { key: "2", text: "Active" },
                    { key: "3", text: "Inactive" }
                ]
            };

            this.getView().setModel(new JSONModel(statusData), "masterdataMdl");
        },

        onPressEdit: function () {
            let vModel = this.getView().getModel("visible");
            let vData = vModel.getData();
            vData.edit = !vData.edit;
            vData.view = !vData.view;
            vModel.refresh();

        },
        onPressSave: function () {
            MessageBox.success("Saved successfully!", {
                onClose: () => {
                    this.oRouter.navTo("company", { layout: "OneColumn" });
                }
            });

        },

        onPressCancel: function () {
            this.oRouter.navTo("company", { layout: "OneColumn" });
        },
        handleClose: function () {
            this.oRouter.navTo("company", { layout: "OneColumn" });

        }

    });
});