var utility = utility || {};

(function ($) {

	var siteName;

	utility.sendAjaxRequest = function (ajaxObject) {
		var data, url, dataType, type, contentType, async, shouldLoadSpinner, overLayId, headers;
		contentType = "application/x-www-form-urlencoded; charset=UTF-8";
		shouldLoadSpinner = false;

		var done = function () {
		};

		var fail = function () {
		};

		data = ajaxObject.data;
		url = ajaxObject.url;
		dataType = ajaxObject.dataType;
		type = ajaxObject.type;
		done = ajaxObject.success;
		fail = ajaxObject.error;
		xhrFields = ajaxObject.xhrFields;
		headers = ajaxObject.headers;

		if (ajaxObject.contentType !== 'undefined') {
			contentType = ajaxObject.contentType;
		};

		if (ajaxObject.shouldLoadSpinner !== 'undefined') {
			shouldLoadSpinner = ajaxObject.shouldLoadSpinner;
		};

		if (ajaxObject.overLayId !== 'undefined') {
			overLayId = ajaxObject.overLayId;
		};

		if (ajaxObject.headers !== 'undefined') {
			headers = ajaxObject.headers;
		};

		if (shouldLoadSpinner === true) {
			$(document).ajaxStart(utility.loadSpinner(overLayId));
			// $(document).ajaxStop(utility.hideSpinner(overLayId));
		};

		$.ajax({
			type: type,
			url: url,
			data: data,
			dataType: dataType,
			contentType: contentType,
			async: async,
			xhrFields: xhrFields,
			headers: headers
		})
			.done(done)
			.fail(fail)
			//.complete()
			//.success()
			.always();

	};


	utility.onSuccess = function (data, receiver) {
		receiver.success(data);
	};

	utility.onError = function (data, receiver) {
		receiver.success(data);
	};

	utility.getBaseUrl = function (address) {
		var path = location.protocol + "//" + location.host;
		var websitename = $("#SiteName").val();

		if (websitename !== "/") {
			path = path + websitename;
		}

		if (address !== undefined && address !== "") {
			path = path + "/" + address;
		}

		return path;

	};

	utility.getDateFromString = function (dateString) {

		//09/04/2017
		var yearNumber = dateString.substring(6);
		var monthNumber = dateString.substr(3, 2);
		var dayNumber = dateString.substring(0, 2);
		var fullDate = yearNumber + "-" + monthNumber + "-" + dayNumber;
		d = new Date(fullDate);
		return d;

	};

	utility.getDateStringFromString = function (dateString) {

		//09/04/2017
		var yearNumber = dateString.substring(6);
		var monthNumber = dateString.substr(3, 2);
		var dayNumber = dateString.substring(0, 2);
		var fullDate = yearNumber + "-" + monthNumber + "-" + dayNumber;
		return fullDate;

	};

	//$('#loader').hide();

	utility.loadSpinner = function (overLayId) {
		$("#" + overLayId).LoadingOverlay("show");
	};

	utility.loadSpinnerOld = function (overLayId) {
		$("#" + overLayId).LoadingOverlay("show");
	};

	utility.hideSpinner = function (overLayId) {
		$("#" + overLayId).LoadingOverlay("hide", true);
	};

	utility.getSplit = function (dataString, delimiter) {
		return dataString.split(delimiter);
	}

	utility.getItemInArray = function (dataArray, itemNumber) {
		return dataArray[itemNumber];
	}

	utility.highlightSearchText = function (searchText, identifierId) {
		if (searchText !== "") {
			$("#" + identifierId).highlight(searchText);
		}
	};

	utility.showValidationSummary = function (errorMessageArray) {
		$("#alertMessage").html(utility.getValidationSummary(errorMessageArray));
	};

	utility.getValidationSummary = function (errorMessageArray) {
		var errorAlert = "";

		errorAlert = errorAlert + "<div class='alert alert-danger fade show'>";
		errorAlert = errorAlert + "<a href='#' class='close' data-dismiss='alert'>&times;</a>";
		errorAlert = errorAlert + "<strong>Failed Validation!</strong> A problem has occurred while submitting your data.";
		errorAlert = errorAlert + "<ul>";
		var arrayLength = errorMessageArray.length;
		for (var i = 0; i < arrayLength; i++) {
			errorAlert = errorAlert + "<li>" + errorMessageArray[i] + "</li>";
		}
		errorAlert = errorAlert + "</ul></div>";

		return errorAlert;
	};

	utility.getErrorAlertSingleMessage = function (errorMessage) {
		var errorAlert = "";

		errorAlert = errorAlert + "<div class='alert alert-danger fade in'>";
		errorAlert = errorAlert + "<a href='#' class='close' data-dismiss='alert'>&times;</a>";
		errorAlert = errorAlert + "<strong>Error!</strong> A problem has occurred while submitting your data.<br/>";
		errorAlert = errorAlert + errorMessage + "</div>";

		return errorAlert;
	};

	utility.addMethods = function (object, methods) {
		for (var name in methods) {
			object[name] = methods[name];
		}
	};

	var initialize = function () {
		siteName = $("#SiteName").val();
	};

	(function () {
		initialize();
	})();

})(jQuery);