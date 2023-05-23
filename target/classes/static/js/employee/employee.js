
    var createEmployeeAlertMessage = 'Employee Added Successfully';
    var updateEmployeeAlertMessage = 'Employee Updated Successfully!';
        $(document).ready(function () {
        showEmployeeCrudAlert(createEmployeeAlertMessage);
           $(".saveEmployee").unbind().bind('click', function () {
           var loading;
               $.ajax({
                       data: {},
                       url: "http://localhost:8080/employees/list",
                       type: "GET",
                       dataType: "html",
                       success: function (data) {
                       alert("hello");
                       showEmployeeCrudAlert(createEmployeeAlertMessage);
                       },
                       error: function (jqXHR, texStatus, errorThrown) {
                             alert("error")
                       }
                   });
            });
        });





    var showEditSubscriptionModalBodyEvent = function () {
        $(document).ready(function () {
            $('#editSubscriptionModal').on('show.bs.modal', function (e) {
                var relatedTarget = e.relatedTarget;
                var subscriptionID = relatedTarget.id.replace("EditSubscriptionModal_", "");
                showEditSubscriptionModalBody(subscriptionID);
            });
        });
    };

    var showEditSubscriptionModalBody = function (subscriptionID) {
        var currentSubscriptionIdentifier = $("#currentSubscriptionIdentifier").val();
        var ajaxObject = {
            data: {
                subscriptionID: subscriptionID,
            },
            url: utility.getBaseUrl() + "/" + "Subscription/" + currentSubscriptionIdentifier + "/?handler=EditSubscriptionModalBody",
            type: "GET",
            dataType: "html",
            shouldLoadSpinner: true,
            overLayId: "editSubscriptionModalBody",
            async: true,
            success: function (data) {
                $("#editSubscriptionModalBody").empty();
                $("#editSubscriptionModalBody").html(data);
                bindUpdateSubscription();
                initializeBindings();
                utility.hideSpinner("editSubscriptionModalBody");
            },
            error: function (jqXHR, texStatus, errorThrown) {
                var x = errorThrown;
                var y = jqXHR;
                utility.hideSpinner("editSubscriptionModalBody");
                alert(errorThrown);
            }
        };
        utility.sendAjaxRequest(ajaxObject);

    };

    var bindSaveSubscription = function () {

        $(document).ready(function () {
            $("#addEmployee").unbind().bind('click', function () {

                var saveSubscriptionModal = {
                    "SubscriptionName": $("#SubscriptionName").val(),
                    "SubscriptionIdentifier": $("#currentSubscriptionIdentifier").val(),
                    "SubscriptionID": $("#SubscriptionID").val(),
                };

                saveSubscription(saveSubscriptionModal);

            });

        });
    };

    var saveSubscription = function (saveSubscriptionModal) {

        var token = $('input:hidden[name="__RequestVerificationToken"]').val();
        var currentSubscriptionIdentifier = $("#currentSubscriptionIdentifier").val();

        var ajaxObject = {
            data: JSON.stringify(saveSubscriptionModal),
            headers: {
                "XSRF-TOKEN": token
            },
            url: utility.getBaseUrl() + "/" + "Subscription/" + currentSubscriptionIdentifier + "/?handler=SaveSubscription",
            type: "POST",
            dataType: "json",
            shouldLoadSpinner: true,
            contentType: "application/json; charset=utf-8",
            overLayId: "createSubscriptionModalBody",
            async: true,
            success: async function (data) {
                utility.hideSpinner("createSubscriptionModalBody");
                if (data.isSucceeded == true) {
                    $("#createSubscriptionModalBody").empty();
                    $("#createSubscriptionModalBody").html(data);
                    reFreshSubscriptionList();
                    $('#createSubscriptionModal').modal('hide');
                    showSubscriptionCRUDAlert(createSubscriptionAlertMessage);
                } else if (data.isSucceeded == false) {
                    utility.showValidationSummary(data.modelStateErrors);
                }
            },
            error: function (jqXHR, texStatus, errorThrown) {
                var x = errorThrown;
                var y = jqXHR;
                utility.hideSpinner("createSubscriptionModalBody");
                errorMessageAlert();
            }
        };
        utility.sendAjaxRequest(ajaxObject);
    };


    var bindUpdateSubscription = function () {
        $(document).ready(function () {
            $("#UpdateSubscriptionChanges").unbind().bind('click', function () {
                var UpdateSubscriptionModel = {
                    "SubscriptionName": $("#SubscriptionName").val(),
                    "SubscriptionIdentifier": $("#SubscriptionIdentifier").val(),
                    "SubscriptionID": $("#SubscriptionID").val(),
                };
                updateSubscription(UpdateSubscriptionModel);
            });
        });
    }


    var updateSubscription = function (UpdateSubscriptionModel) {

        var token = $('input:hidden[name="__RequestVerificationToken"]').val();
        var currentSubscriptionIdentifier = $("#currentSubscriptionIdentifier").val()

        var ajaxObject = {
            data: JSON.stringify(UpdateSubscriptionModel),
            headers: {
                "XSRF-TOKEN": token
            },
            url: utility.getBaseUrl() + "/" + "Subscription/" + currentSubscriptionIdentifier + "/?handler=UpdateSubscription",
            type: "POST",
            dataType: "json",
            shouldLoadSpinner: true,
            contentType: "application/json; charset=utf-8",
            overLayId: "editSubscriptionModalBody",
            async: true,
            success: async function (data) {
                utility.hideSpinner("editSubscriptionModalBody");
                if (data.isSucceeded == true) {
                    reFreshSubscriptionList();
                    $('#editSubscriptionModal').modal('hide');
                    showSubscriptionCRUDAlert(updateSubscriptionAlert);
                } else if (data.isSucceeded == false) {
                    utility.showValidationSummary(data.modelStateErrors);
                }
            },
            error: function (jqXHR, texStatus, errorThrown) {
                var x = errorThrown;
                var y = jqXHR;
                utility.hideSpinner("editSubscriptionModalBody");
                errorMessageAlert();
            }
        };

        utility.sendAjaxRequest(ajaxObject);
    }


    var showEmployeeCrudAlert = function (alertMessage) {
        Swal.fire({
            /*position: 'top-end',*/
            type: 'success',
            title: alertMessage,
            showConfirmButton: false,
            timer: 1500,
        })
    }

    var errorMessageAlert = function () {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            confirmButtonClass: 'btn btn-confirm mt-2',
            footer: ''
        })
    };

    var initializeElements = function () {

    };


    var initializeBindings = function () {
        showEmployeeEvent();
    };

    //Initialization
    var initialize = function () {
        initializeElements();
        initializeBindings();
    };




