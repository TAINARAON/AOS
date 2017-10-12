var insurerAdminController = new function() {

	// PRIVATE VARIABLES
	var insurerAdmin = null;
	var insuranceAgency = null;

	var CREATE_INSURER_URL = "CREATE_INSURER_URL";
	

	// TODO
	
	this.init = function(userId) {

		ajaxGetBrokerAdminByUserId(userId);
		ajaxGetBrokerage(brokerAdmin['brokerageId']);
	}

	/*
		insurerAdmin/createInsurer

		requestObject:{
			data:{
				insuranceAgencyId,
				name,
				surname,
				email,
				fspNumber
			},
			fileData:{
			}
		}

		responseObject:{
			id
		}
	*/
	this.createInsurer = function (successCallback,failCallback,requestObject) {

	    var mockResponse = {
			"id":'test'
		};

	   ajaxPost(CREATE_INSURER_URL,successCallback,failCallback,requestObject,mockResponse);
	};

	/*
		insurerAdmin/editBrokerage

		requestObject:{
			data:{
				id,
				contactNumber,
				email,
				name
			},
			fileData:{
			}
		}

		responseObject:{
			status
		}
	*/
	this.editBrokerage = function(successCallback,failCallback,requestObject) {

		var mockResponse = {
			"result":"fake response"
		};

		ajaxPost(EDIT_BROKERAGE_URL,successCallback,failCallback,requestObject,mockResponse);
	}

	

	/*
		insurerAdmin/getInsuranceAgency

		requestObject:{
			insuranceAgencyId
		}

		responseObject:{
			insuranceAgency:{whole insuranceAgency}
		}
	*/
	function ajaxGetInsuranceAgency(insuranceAgencyId) {

		var requestObject = {
			"brokerageId":brokerageId
		};

		var mockResponse = {
			insuranceAgency:{
				'id':'0',
				'name':'Versekerings Ltd.',
				'active':'1',
				'dateCreated':'1990-08-25',
				'email':'breeker.brokerage@gmail.com',
				'contactNumber':'0623521574',
				'fspNumber':'FSP000',
				'verified':'1'
			}
		}

		ajaxPost(GET_BROKERAGE_URL,onGetInsuranceAgencySuccess,onGetInsuranceAgencyFail,requestObject,mockResponse);
	}
	// NEEDED
	function onGetInsuranceAgencySuccess(response) {

		insuranceAgency = response["insuranceAgency"];
	}
	// NEEDED
	function onGetInsuranceAgencyFail(response) {

		alert("ERROR! Could not initiate insuranceAgency");
	}

	/*
		insurerAdmin/getBrokerAdminByUserId

		requestObject:{
			userId
		}

		responseObject:{
			insurerAdmin:{whole insurerAdmin}
		}
	*/
	function ajaxGetInsurerAdminByUserId(userId) {

		var requestObject = {
			"userId":userId
		};

		var mockResponse = {
			"insurerAdmin":{
				'test':'test'
			}
		}

		ajaxPost(GET_BROKERAGE_URL,onGetInsurerAdminSuccess,onGetInsurerAdminFail,requestObject,mockResponse);
	}
	// NEEDED
	function onGetInsurerAdminSuccess(response) {

		insurerAdmin = response["insurerAdmin"];
	}
	// NEEDED
	function onGetInsurerAdminFail(response) {

		alert("ERROR! Could not initiate Brokerage");
	}


}