sap.ui.define([
    "project/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "project/utils/URLConstants",
    "sap/ui/core/Core",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    'sap/ui/export/Spreadsheet',
    'sap/m/Token',
    "project/utils/ErrorMessage",
], function (
    BaseController, JSONModel, MessageToast, URLConstants, Core, MessageBox, Fragment, Spreadsheet, Token, ErrorMessage
) {
    "use strict";

    return BaseController.extend("project.user.CreateUser", {

        onInit: function () {
            this.oOwnerComponent = this.getOwnerComponent();
            this.oRouter = this.oOwnerComponent.getRouter();
            this.oModel = this.oOwnerComponent.getModel();

            // Ensure errors model exists
            this.eMdl = this.oOwnerComponent.getModel("errors");
            if (!this.eMdl) {
                this.eMdl = new JSONModel([]);
                this.oOwnerComponent.setModel(this.eMdl, "errors");
            }

            this.oRouter.getRoute("create_user").attachPatternMatched(this._onRouteMatched, this);

            let oSource = ((sId) => this.getView().byId(sId));
            [this.formId, this.pageId, this.popoverBtn] = [
                oSource('form_id'),
                oSource('id_CreateEmp'),
                oSource('errorBtn')
            ];
        },

        _onRouteMatched: function () {
            // Master data for status dropdown
            let setDataModel = {
                status: [
                    { key: "1", text: "Draft" },
                    { key: "2", text: "Active" },
                    { key: "3", text: "InActive" }
                ]
            };
            this.getView().setModel(new JSONModel(setDataModel), "masterdataMdl");

            this.setInitialModel();
            this.errorPopoverParams();
        },

        errorPopoverParams: function () {
            // Ensure errors model exists and reset data
            this.eMdl = this.oOwnerComponent.getModel("errors");
            if (!this.eMdl) {
                this.eMdl = new JSONModel([]);
                this.oOwnerComponent.setModel(this.eMdl, "errors");
            }

            ErrorMessage.removeValueState([this.formId], this.eMdl);
            this.eMdl.setData([]); // safe now
        },

        setInitialModel: function () {
            let obj = {
                name: null,
                designation: null,
                status: "1"
            };
            this.getView().setModel(new JSONModel(obj), "createUserMdl");
        },

        handleFullScreen: function () {
            this.oRouter.navTo("create_user");
        },

        handleExitFullScreen: function () {
            this.oRouter.navTo("create_user");
        },

        handleClose: function () {
            this.oRouter.navTo("user");
        },

        onExit: function () {
            this.oRouter.getRoute("user").detachPatternMatched(this._onRouteMatched, this);
            this.oRouter.getRoute("create_user").detachPatternMatched(this._onRouteMatched, this);
        },

        onPressCancel: function () {
            this.oRouter.navTo("user", { layout: "OneColumn" });
        },

        onPressSave: async function () {
            try {
                // Perform form field validation
                ErrorMessage.formValidation([this.formId], this.eMdl, this.pageId);

                let reqData = this.getView().getModel("createUserMdl")?.getData();
                let validationErrors = this.eMdl?.getData() || [];

                // Proceed only if there are no validation errors
                if (validationErrors.length === 0) {
                    if (this._oMessagePopover) {
                        this._oMessagePopover.close();
                    }

                    this.showLoading(true);

                    let path = URLConstants.URL.user_add;
                    let response = await this.restMethodPost(path, reqData);

                    this.getView().setModel(new JSONModel(response), "createUserMdl");
                    this.showLoading(false);
                    this.setInitialModel();

                    MessageBox.information("Saved successfully!", {
                        actions: [MessageBox.Action.OK],
                        onClose: () => {
                            this.getRouter().navTo("user", { layout: "OneColumn" });
                        }
                    });
                } else {
                    this.errorHandling();
                }
            } catch (ex) {
                this.errorHandling(ex);
            }
        }

    });
});