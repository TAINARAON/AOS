var brokerAdminController = new function() {

	// PRIVATE VARIABLES
	var brokerage = null;
	var brokerAdmin = null;

	var EDIT_BROKERAGE_URL = "EDIT_BROKERAGE_URL";
	var CREATE_BROKER_URL = "CREATE_BROKER_URL";
	var GET_BROKERAGE_ADMIN_BY_USER_ID_URL = "GET_BROKERAGE_ADMIN_BY_USER_ID_URL";
	var GET_BROKERAGE_URL = "GET_BROKERAGE_URL";
	var GET_BROKER_DETAILS_OF_BROKERAGE = "GET_BROKER_DETAILS_OF_BROKERAGE";
	var GET_BROKER_FOR_EDIT_MODAL = "GET_BROKER_FOR_EDIT_MODAL";
	var EDIT_BROKER_URL = "EDIT_BROKER_URL";

	// TODO
	this.revokeBroker = function(brokerId,callback) {
		// Deactivates Broker
		callback();
	}

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
		brokerAdmin/createBroker

		requestObject:{
			data:{
				brokerageId,
				createRights,
				email,
				name,
				surname
			},
			fileData:{
			}
		}

		responseObject:{
			id
		}
	*/
	this.createBroker = function (successCallback,failCallback,requestObject) {

	    var mockResponse = {
			"id":'test'
		};

	   ajaxPost(CREATE_BROKER_URL,successCallback,failCallback,requestObject,mockResponse);
	};

	/*
		brokerAdmin/getBrokerDetailsOfBrokerage

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
	this.getBrokerDetailsOfBrokerage = function(successCallback,failCallback) {

		var requestObject = 
		{
			"brokerageId":brokerage['id']
		};

		var mockResponse = {
			"brokers":mockCommunicator.getBrokersForBrokerTableInBrokerageTab(brokerage['id'])
		};

		ajaxPost(GET_BROKER_DETAILS_OF_BROKERAGE,successCallback,failCallback,requestObject,mockResponse);
	};	

	// NEEDED
	this.getBrokerage = function() {

		return brokerage;
	}
	// NEEDED
	this.getBrokerAdmin = function() {

		return brokerAdmin;
	}

	/*
		brokerAdmin/editBroker

		requestObject:{
			broker:{
				id,
				creationRights
			},
			brokerViewableBrokers:[
				{
					id
				}
			]
		};

		responseObject:{
			status
		}
	*/
	this.editBroker = function(successCallback,failCallback,requestObject) {
		
		var mockResponse = {
			"status":"mockResponsee"
		};

		ajaxPost(EDIT_BROKER_URL,successCallback,failCallback,requestObject,mockResponse);
	}

	/*
		brokerAdmin/getBrokerForEditModal

		requestObject:{
			brokerId
		}

		responseObject:{
			broker:
			{
				id,
				name,
				surname,
				creationRights,
				brokerViewableBrokers: 
				[
					{
						id (broker)
						name,
						surname,
					}
				]
			}
		}
	*/
	this.getBrokerForEditModal = function(successCallback,failCallback,brokerId) {

		var requestObject = 
		{
			"brokerId":brokerId
		};

		// CREATING MOCK RESPONSE. MAY DELETE IF SERVER IS RUNNING
		var broker = mockCommunicator.getBroker(brokerId);
		var user = mockCommunicator.getUser(broker['userId']);

		var name = user['name'];
		var surname = user['surname'];

		/*var quoteRights = broker['quoteRights'];
		var policyRights = broker['policyRights'];
		var damageReportRights = broker['damageReportRights'];*/
		var	creationRights = broker['creationRights'];

		var brokerViewableBrokersDetails = [];
		var brokerViewableBrokers = mockCommunicator.getBrokerViewableBrokersOfBroker(brokerId);
		for (var i = 0; i < brokerViewableBrokers.length; i++) {

			var viewableBroker = brokerViewableBrokers[i];
			var viewableUser = mockCommunicator.getUser(viewableBroker['userId']);

			brokerViewableBrokersDetails.push(
				{
					'id':viewableBroker['id'],
					'name':viewableUser['name'],
					'surname':viewableUser['surname'],
				}
			);
		}

		var mockResponse = {
			"broker":
			{
				'id':brokerId,
				'name':name,
				'surname':surname,
				/*'quoteRights':quoteRights,
				'policyRights':policyRights,
				'damageReportRights':damageReportRights,*/
				'creationRights':creationRights,
				'brokerViewableBrokers':brokerViewableBrokersDetails
			}
		}

		// END OF CREATING MOCK RESPONSE

		ajaxPost(GET_BROKER_FOR_EDIT_MODAL,successCallback,failCallback,requestObject,mockResponse);
	}

	// PRIVATE FUNCTIONS
	/*
		brokerAdmin/getBrokerage

		requestObject:{
			brokerageId
		}

		responseObject:{
			brokerage:{whole brokerage}
		}
	*/
	function ajaxGetBrokerage(brokerageId) {

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
	function onGetBrokerageSuccess(response) {

		brokerage = response["brokerage"];
	}
	// NEEDED
	function onGetBrokerageFail(response) {

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
	function ajaxGetBrokerAdminByUserId(brokerageId) {

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
	function onGetBrokerAdminSuccess(response) {

		brokerAdmin = response["brokerAdmin"];
	}
	// NEEDED
	function onGetBrokerAdminFail(response) {

		alert("ERROR! Could not initiate Brokerage");
	}
}