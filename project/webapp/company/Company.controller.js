sap.ui.define([
    "project/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "project/utils/Formatter"
], function (
    BaseController,
    JSONModel,
    Filter,
    FilterOperator,
    Formatter
) {
    "use strict";
    return BaseController.extend("project.company.Company", {
        formatter: Formatter,
        onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("company")
                .attachMatched(this._onRouteMatched, this);
            this.oTable = this.byId("tableId_companies");
            this.getView().setModel(
                new JSONModel({
                    id: "",
                    name: "",
                    designation: "",
                    status: []
                }),
                "advancedFilterMdl"
            );
        },

        _onRouteMatched: function () {
            const statusData = {
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

            // Dummy employee/company data
            const aDummyData = [
                {
                    id: "1001",
                    name: "TCS",
                    designation: "Software Engineer",
                    status: 2
                },
                {
                    id: "1002",
                    name: "Infosys",
                    designation: "UI5 Developer",
                    status: 1
                },
                {
                    id: "1003",
                    name: "Wipro",
                    designation: "SAP Consultant",
                    status: 2
                },
                {
                    id: "1004",
                    name: "Accenture",
                    designation: "Backend Developer",
                    status: 3
                },
                {
                    id: "1005",
                    name: "Capgemini",
                    designation: "Full Stack Developer",
                    status: 2
                }
            ];

            // Create JSON model
            const oEmployeeModel = new JSONModel(aDummyData);

            // Set model to view
            this.getView().setModel(oEmployeeModel, "employeeMdl");
        },


        onSearch: function () {
            const oData = this.getView()
                .getModel("advancedFilterMdl")
                .getData();

            const aFilters = [];

            if (oData.id) {
                aFilters.push(
                    new Filter("id", FilterOperator.EQ, oData.id)
                );
            }

            if (oData.name) {
                aFilters.push(
                    new Filter("name", FilterOperator.Contains, oData.name)
                );
            }

            if (oData.designation) {
                aFilters.push(
                    new Filter("designation", FilterOperator.Contains, oData.designation)
                );
            }

            if (Array.isArray(oData.status) && oData.status.length) {

                const aStatusFilters = oData.status.map(function (key) {
                    return new Filter("status", FilterOperator.EQ, parseInt(key));
                });

                aFilters.push(
                    new Filter({
                        filters: aStatusFilters,
                        and: false
                    })
                );
            }

            this.oTable.getBinding("items").filter(aFilters);
        },

        clearAllFilters: function () {
            this.getView()
                .getModel("advancedFilterMdl")
                .setData({
                    id: "",
                    name: "",
                    designation: "",
                    status: []
                });

            this.oTable.getBinding("items").filter([]);
        },

        onListItemPress: function (oEvent) {

            let oItem = oEvent.getParameter("listItem");
            let oCtx = oItem.getBindingContext("employeeMdl");

            if (oCtx) {

                let oEmp = oCtx.getObject();

                this.getRouter().navTo("company_detail", {
                    id: oEmp.id,
                    layout: "TwoColumnsMidExpanded"
                });

            }
        },
        onCreateEmployee: function () {
            this.getRouter().navTo("create_company");

        },
    });
});