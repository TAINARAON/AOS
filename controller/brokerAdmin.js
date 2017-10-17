var brokerAdminController = new function() {

	// PRIVATE VARIABLES
	var brokerage = null;
	var brokerAdmin = null;
	var brokersOfBrokerage = null;
	var user = null;
	this.getBrokerAdmin = function() {
		return brokerAdmin;
	}
	this.getBrokerage = function() {
		return brokerage;
	}
	this.getBrokersOfBrokerage = function() {
		return brokersOfBrokerage;
	}
	this.getUser = function() {
		return user;
	}

	var EDIT_BROKERAGE_URL = "EDIT_BROKERAGE_URL";
	var CREATE_BROKER_URL = "CREATE_BROKER_URL";
	var GET_BROKERAGE_ADMIN_BY_USER_ID_URL = "GET_BROKERAGE_ADMIN_BY_USER_ID_URL";
	var GET_BROKERAGE_URL = "GET_BROKERAGE_URL";
	var GET_BROKER_DETAILS_OF_BROKERAGE = "GET_BROKER_DETAILS_OF_BROKERAGE";
	var GET_BROKER_FOR_EDIT_MODAL = "GET_BROKER_FOR_EDIT_MODAL";
	var EDIT_BROKER_URL = "EDIT_BROKER_URL";
	var GET_BROKERS_OF_BROKERAGE_URL = "GET_BROKERS_OF_BROKERAGE_URL";
	var CREATE_CLIENT_URL = "CREATE_CLIENT_URL";

	// TODO
	this.revokeBroker = function(brokerId,callback) {
		// Deactivates Broker
		callback();
	}

	var GET_DEFAULT_BROKER_ADMIN_DATA_URL = 'GET_DEFAULT_BROKER_ADMIN_DATA_URL';

	this.init = function(userId) {
		
		getDefaultBrokerAdminData(userId);
	}

	function getDefaultBrokerAdminData(userId) {

		var requestObject = {
			'id':userId
		};

		var mockResponse = 
		{	
			'user':{
				'initials':'B A',
				'name':'Bernard Andre',
				'surname':'Bandeer',
				'email':'bernardandre@gmail.com',
			},
			'brokerAdmin':
			{
				'id':'0',
				'brokerageId':0,
				'userId':'3',
				'active':'1',
			},
			'brokerage':
			{
				'name':'Versekerings Ltd.',
				'email':'versekerings.ltd@gmail.com',
				'contactNumber':'062 352 1341',
			},
			'brokersOfBrokerage':
			[
				{	
					'id':'0',
					'name':'Pieter',
					'surname':'Vosloo'
				},
				{
					'id':'1',
					'name':'Janne',
					'surname':'Man'
				}
			]
		};

		ajaxPost(GET_DEFAULT_BROKER_ADMIN_DATA_URL,onGetDefaultBrokerAdminSuccess,onGetDefaultBrokerAdminFailure,requestObject,mockResponse);
	}

	function onGetDefaultBrokerAdminSuccess(response) {

		util.createNotification('Logged in as Broker Admin');

		brokerAdmin = response['brokerAdmin'];
		brokerage = response['brokerage'];
		brokersOfBrokerage = response['brokersOfBrokerage'];
		user = response['user'];
		
		loader.loadRole('brokerAdmin');
	}

	function onGetDefaultBrokerAdminFailure(response) {

		alert('something messed up');
	}

	/*
		Note: updates a brokerage 

		brokerAdmin/editBrokerage

		requestObject:{
			data:{
				id, (brokerage)
				name,
				email,
				contactNumber		
			},
			fileData:[]
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
		brokerAdmin/createClient

		requestObject:{
			data:{
				brokerageId,
				idNumber,
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
	this.createClient = function (successCallback,failCallback,requestObject) {

	    var mockResponse = {
			"id":'test'
		};

	   ajaxPost(CREATE_CLIENT_URL,successCallback,failCallback,requestObject,mockResponse);
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
	// NEEDED
	this.getBrokersOfBrokerage = function() {

		return brokersOfBrokerage;
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
	/*function ajaxGetBrokerage(brokerageId) {

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

		ajaxGetBrokersOfBrokerage(brokerage['id']);
	}
	// NEEDED
	function onGetBrokerageFail(response) {

		alert("ERROR! Could not initiate Brokerage");
	}*/

	/*
		brokerAdmin/getBrokersOfBrokerage

		requestObject:{
			brokerageId
		}

		responseObject:{
			brokers:[
				{
					id  (broker),
					name,
					surname
				}
			]
		}
	*/
	function ajaxGetBrokersOfBrokerage(brokerageId) {

		var requestObject = {
			"brokerageId":brokerageId
		};

		var mockResponse = {
			brokers:
			[
				{
					'id':'0',
					'name':'Pieter',
					'surname':'Vosloo'
				},
				{
					'id':'1',
					'name':'Janne',
					'surname':'Man'
				},
			]
		}

		ajaxPost(GET_BROKERS_OF_BROKERAGE_URL,onGetBrokersOfBrokerageSuccess,onGetBrokersOfBrokerageFail,requestObject,mockResponse);
	}
	// NEEDED
	function onGetBrokersOfBrokerageSuccess(response) {

		brokersOfBrokerage = response["brokers"];
	}
	// NEEDED
	function onGetBrokersOfBrokerageFail(response) {

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
	function ajaxGetBrokerAdminByUserId(userId) {

		var requestObject = {
			"userId":userId
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

		ajaxGetBrokerage(brokerAdmin['brokerageId']);
	}
	// NEEDED
	function onGetBrokerAdminFail(response) {

		alert("ERROR! Could not initiate Brokerage");
	}
}