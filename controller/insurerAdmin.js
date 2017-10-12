var insurerAdminController = new function() {

	// PRIVATE VARIABLES
	var insurerAdmin = null;
	var insuranceAgency = null;

	var EDIT_BROKERAGE_URL = "EDIT_BROKERAGE_URL";
	

	// TODO
	
	this.init = function(userId) {

		ajaxGetBrokerAdminByUserId(userId);
		ajaxGetBrokerage(brokerAdmin['brokerageId']);
	}

	/*
		brokerAdmin/editBrokerage

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
		brokerAdmin/getBrokerage

		requestObject:{
			brokerageId
		}

		responseObject:{
			brokerage:{whole brokerage}
		}
	*/
	function ajaxGetInsuranceAgency(brokerageId) {

		var requestObject = {
			"brokerageId":brokerageId
		};

		var mockResponse = {
			brokerage:{
				'id':'0',
				'name':'Breeker Brokerage',
				'active':'1',
				'dateCreated':'1990-08-25',
				'email':'breeker.brokerage@gmail.com',
				'contactNumber':'0623521574',
				'fspNumber':'FSP000',
				'verified':'1'
			}
		}

		ajaxPost(GET_BROKERAGE_URL,onGetBrokerageSuccess,onGetBrokerageFail,requestObject,mockResponse);
	}
	// NEEDED
	function onGetInsuranceAgencySuccess(response) {

		brokerage = response["brokerage"];
	}
	// NEEDED
	function onGetInsuranceAgencyFail(response) {

		alert("ERROR! Could not initiate Brokerage");
	}

	/*
		brokerAdmin/getBrokerAdminByUserId

		requestObject:{
			userId
		}

		responseObject:{
			brokerAdmin:{whole brokerAdmin}
		}
	*/
	function ajaxGetInsurerAdminByUserId(brokerageId) {

		var requestObject = {
			"brokerageId":brokerageId
		};

		var mockResponse = {
			"brokerAdmin":{
				"brokerageId":0
			}
		}

		ajaxPost(GET_BROKERAGE_URL,onGetBrokerAdminSuccess,onGetBrokerAdminFail,requestObject,mockResponse);
	}
	// NEEDED
	function onGetInsurerAdminSuccess(response) {

		brokerAdmin = response["brokerAdmin"];
	}
	// NEEDED
	function onGetInsurerAdminFail(response) {

		alert("ERROR! Could not initiate Brokerage");
	}


}