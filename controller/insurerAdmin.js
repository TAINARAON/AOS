var insurerAdminController = new function() {

	// PRIVATE VARIABLES
	var insurerAdmin = null;
	var insuranceAgency = null;

	var CREATE_INSURER_URL = "CREATE_INSURER_URL";
	var GET_BROKER_DETAILS_OF_BROKERAGE_URL = "GET_BROKER_DETAILS_OF_BROKERAGE_URL";
	var GET_BROKERAGES_URL = "GET_BROKERAGES_URL";
	var GET_INSURER_ADMIN_BY_USER_ID_URL = "GET_INSURER_ADMIN_BY_USER_ID_URL";
	var GET_INSURANCE_AGENCY_URL = "GET_INSURANCE_AGENCY_URL";

	this.init = function(userId) {

		preloadData(userId);
	}
	// NEEDED
	function preloadData(userId) {

		// Starts a chain
		ajaxGetInsurerAdminByUserId(userId);
	}
	/*
		insurerAdmin/getInsurerAdminByUserId

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
				"id":0
			}
		}

		ajaxPost(GET_INSURER_ADMIN_BY_USER_ID_URL,onGetInsurerAdminSuccess,onGetInsurerAdminFail,requestObject,mockResponse);
	}
	// NEEDED
	function onGetInsurerAdminSuccess(response) {

		insurerAdmin = response["insurerAdmin"];

		ajaxGetInsuranceAgency(insurerAdmin['id']);
	}
	// NEEDED
	function onGetInsurerAdminFail(response) {

		alert("ERROR! Could not initiate Brokerage");
	}
	/*
		insurerAdmin/ajaxGetInsuranceAgency

		requestObject:{
			insuranceAgencyId
		}

		responseObject:{
			insuranceAgency:{whole insuranceAgency}
		}
	*/
	function ajaxGetInsuranceAgency(insuranceAgencyId) {

		var requestObject = {
			"insuranceAgencyId":insuranceAgencyId
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

		ajaxPost(GET_INSURANCE_AGENCY_URL,onGetInsuranceAgencySuccess,onGetInsuranceAgencyFail,requestObject,mockResponse);
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
		insurerAdmin/getBrokerDetailsOfBrokerage

		requestObject:{
			brokerageId
		}

		responseObject:{
			brokers:
			[
				{
					id,
					name,
					surname
				}
			]
		}
	*/
	this.getBrokerDetailsOfBrokerage = function(successCallback,failCallback,brokerageId) {

		var requestObject = 
		{
			"brokerageId":brokerageId
		};

		var mockResponse = {
			"brokers":mockCommunicator.getBrokersForBrokerTableInBrokerageTab(brokerageId)
		};

		ajaxPost(GET_BROKER_DETAILS_OF_BROKERAGE_URL,successCallback,failCallback,requestObject,mockResponse);
	};	// USED
	/*
		insurerAdmin/getBrokerages

		requestObject:{
			insuranceAgencyId
		}

		responseObject:{
			brokerages:
			[
				{
					id,
					name,
				}
			]
		}
	*/
	this.getBrokerages = function(successCallback,failCallback) {

		var requestObject = 
		{
			"insuranceAgencyId":insuranceAgency["id"]
		};

		var mockResponse = {
			"brokerages":mockCommunicator.getBrokerages()
		};

		ajaxPost(GET_BROKERAGES_URL,successCallback,failCallback,requestObject,mockResponse);
	}	// USED






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
}