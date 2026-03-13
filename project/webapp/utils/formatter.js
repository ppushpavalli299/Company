sap.ui.define([], function () {
    "use strict";

    return {

        // Format date safely from Date object or string
        formatDate: function (sDate) {
            if (!sDate) return "";

            let oDate;
            if (sDate instanceof Date) {
                oDate = sDate;
            } else if (typeof sDate === "string") {
                oDate = new Date(sDate);
            } else {
                return "";
            }

            if (isNaN(oDate)) return "";

            const day = String(oDate.getDate()).padStart(2, "0");
            const month = String(oDate.getMonth() + 1).padStart(2, "0");
            const year = oDate.getFullYear();

            return `${day}-${month}-${year}`; // dd-MM-yyyy
        },

        getStatusText: function (value) {
            switch (Number(value)) {
                case 1: return "Pending";
                case 2: return "Approval";
                case 3: return "Warning";
                case 4: return "Cancelled";
                default: return "Unknown";
            }
        },

        getStatusState: function (value) {
            switch (Number(value)) {
                case 1: return "Warning";
                case 2: return "Success";
                case 3: return "Error";
                case 4: return "Error";
                default: return "None";
            }
        },

        formatDateToYYYYMMDD: function (inputDate) {
            if (!inputDate) return null;

            const dateObj = new Date(inputDate);
            if (isNaN(dateObj)) return inputDate;

            const yyyy = dateObj.getFullYear();
            const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
            const dd = String(dateObj.getDate()).padStart(2, '0');

            return `${yyyy}-${mm}-${dd}`;
        },

        formatRequestType: function (key, requestTypeList) {
            if (!key || !requestTypeList) {
                return key;
            }
            const match = requestTypeList.find(item => item.key === key);
            return match ? match.text : key;
        }

    };
});