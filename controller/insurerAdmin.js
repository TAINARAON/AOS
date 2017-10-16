var insurerAdminController = new function() {

	// PRIVATE VARIABLES
	var insurerAdmin = null;
	var insuranceAgency = null;

	var CREATE_INSURER_URL = "CREATE_INSURER_URL";
	var GET_BROKER_DETAILS_OF_BROKERAGE_URL = "GET_BROKER_DETAILS_OF_BROKERAGE_URL";
	var GET_BROKERAGES_URL = "GET_BROKERAGES_URL";
	var GET_INSURER_ADMIN_BY_USER_ID_URL = "GET_INSURER_ADMIN_BY_USER_ID_URL";
	var GET_INSURANCE_AGENCY_URL = "GET_INSURANCE_AGENCY_URL";
	var GET_DATA_FOR_POOL_LIMIT_SYSTEMKEY_VIEW_URL = 'GET_DATA_FOR_POOL_LIMIT_SYSTEMKEY_VIEW_URL';
	var GET_CREATE_POOL_LIMIT_DATA_URL = 'GET_CREATE_POOL_LIMIT_DATA_URL';
	var CREATE_POOL_LIMIT_URL = 'CREATE_POOL_LIMIT_URL';

	this.init = function(userId) {

		preloadData(userId);
	}
	// NEEDED
	function preloadData(userId) {

		// Starts a chain
		ajaxGetInsurerAdminByUserId(userId);
	}


	// NEW STUFF 2017/10/16.
	/*  
		insurerAdmin/getDataForPoolLimitSystemkeyView

		requestObject:{
			insuranceAgencyId
		}

		responseObject:{
			crops:
			[
				{
					id,name
				}
			],
			districts:
			[
				{
					id,name
				}
			],
			limits:
			[
				{
					whole limit object
				}
			]
		}
	*/
	this.getDataForPoolLimitSystemkeyView = function(successCallback,failureCallback) {

		var insuranceAgencyId = 1;	//insuranceAgency['id'];

		var requestObject = {
			'insuranceAgencyId':insuranceAgencyId
		};

		var mockResponse = {
			'crops':
			[
				{
					id:0,name:"Apple"
				},
				{
					id:1,name:"Banana"
				},
			],
			'districts':
			[
				{
					id:0,name:"Alberton"
				},
				{
					id:1,name:"Bellville"
				},
			],
			'limits':
			[
				{
					'id':'0',
					'districtId':0,
					'cropId':0,
					'seasonId':0,
					'maximum':10000,
					'runningValue':2000,
					'additionalTariff':5,
					'insuranceAgencyId':0
				},
				{
					'id':'1',
					'districtId':0,
					'cropId':1,
					'seasonId':0,
					'maximum':11000,
					'runningValue':2000,
					'additionalTariff':6,
					'insuranceAgencyId':0
				},
				{
					'id':'2',
					'districtId':1,
					'cropId':0,
					'seasonId':0,
					'maximum':11110,
					'runningValue':1110,
					'additionalTariff':10,
					'insuranceAgencyId':0
				},
				{
					'id':'3',
					'districtId':1,
					'cropId':1,
					'seasonId':0,
					'maximum':20100,
					'runningValue':2000,
					'additionalTariff':4,
					'insuranceAgencyId':0
				},
			]
		}

		ajaxPost(GET_DATA_FOR_POOL_LIMIT_SYSTEMKEY_VIEW_URL,successCallback,failureCallback,requestObject,mockResponse);
	}
	/*  
		insurerAdmin/createPoolLimit

		requestObject:{
			'cropId':cropId,
			'districtId':districtId,
			'maximum':maximum,
			'additionalTariff':additionalTariff
		};

		responseObject:{
			'status'
		}
	*/
	this.createPoolLimit = function(successCallback,failureCallback,requestObject) {

		ajaxPost(CREATE_POOL_LIMIT_URL,successCallback,failureCallback,requestObject);
	}

	/*  
		insurerAdmin/getCreatePoolLimitData

		requestObject:{
			insuranceAgencyId
		};

		responseObject:{
			'crops',
			'districts'
		}
	*/
	this.getCreatePoolLimitData = function() {

	}
	// END OF NEW STUFF 2017/10/16



	/*   SENT TO WIKUS
		insurerAdmin/getInsurerAdminByUserId

		requestObject:{
			userUuid
		}

		responseObject:{
			insurerAdmin:{whole insurerAdmin}
		}
	*/
	function ajaxGetInsurerAdminByUserId(userId) {

		var requestObject = {
			"userUuid":userId
		};

		ajaxPost(GET_INSURER_ADMIN_BY_USER_ID_URL,onGetInsurerAdminSuccess,onGetInsurerAdminFail,requestObject);
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
	/*  SENT TO WIKUS
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
			"insuranceAgencyUuid":insuranceAgencyId
		};

		/*var mockResponse = {
			insuranceAgency:{
				'uuid':'0',
				'name':'Versekerings Ltd.',
				'active':'1',
				'dateCreated':'1990-08-25',
				'email':'breeker.brokerage@gmail.com',
				'contactNumber':'0623521574',
				'fspNumber':'FSP000',
				'verified':'1'
			}
		}*/

		ajaxPost(GET_INSURANCE_AGENCY_URL,onGetInsuranceAgencySuccess,onGetInsuranceAgencyFail,requestObject);
	}
	// NEEDED
	function onGetInsuranceAgencySuccess(response) {

		insuranceAgency = response["insuranceAgency"];
	}
	// NEEDED
	function onGetInsuranceAgencyFail(response) {

		alert("ERROR! Could not initiate insuranceAgency");
	}
	/*   NOT SENT YET
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
	this.aagetBrokerDetailsOfBrokerage = function(successCallback,failCallback,brokerageId) {

		var requestObject = 
		{
			"brokerageId":brokerageId
		};

		var mockResponse = {
			"brokers":mockCommunicator.getBrokersForBrokerTableInBrokerageTab(brokerageId)
		};

		if(brokerageId == "ALL") {
			mockResponse = {
				"brokers":mockCommunicator.getBrokers(brokerageId)
			};
		}

		ajaxPost(GET_BROKER_DETAILS_OF_BROKERAGE_URL,successCallback,failCallback,requestObject,mockResponse);
	};	// USED ???
	/*	
		insurerAdmin/getBrokeragesAndTheirBrokers

		requestObject:{
			insuranceAgencyId
		}

		responseObject: {
			brokeragesAndBrokers:
			[
				{
					id,  (brokerageId)
					name,
					brokers:
					[
						{
							id, (brokerId)
							initials,
							surname,
							name
						}
					]
				}
			]
		}
	*/
	this.getBrokeragesAndTheirBrokers = function(successCallback,failCallback) {

		var requestObject = 
		{
			"insuranceAgencyId":insuranceAgency['id']
		};

		var mockResponse = {
			'brokeragesAndBrokers':[]
		};

		var brokerages = mockCommunicator.brokerageTable;

		for(var i = 0; i < brokerages.length; i++) {

			var brokerage = brokerages[i];
			var brokers = mockCommunicator.getBrokersOfBrokerage(brokerage['id']);

			var brokerageWithBrokers = {
				'id':brokerage['id'],
				'name':brokerage['name'],
				'brokers':[]
			}

			for(var j = 0; j < brokers.length; j++) {

				var broker = brokers[j];
				var userDetails = mockCommunicator.getDetailsOfUser(broker['userId']);

				var neededDetailsOfBroker = {
					'id':broker['id'],
					'initials':userDetails['initials'],
					'surname':userDetails['surname'],
					'name':userDetails['name'],
				}

				brokerageWithBrokers['brokers'].push(neededDetailsOfBroker);
			}

			mockResponse['brokeragesAndBrokers'].push(brokerageWithBrokers);
		}

		/*var mockResponse = {
			"brokerages":[
				{
					"id":0,
					"name":"brokerage 0",
					"brokers":
					[
						{
							"id":0,
							"initials":"A B",
							"surname":"De Villiers",
							"name":"Albert Boertjie"
						},
						{
							"id":1,
							"initials":"S",
							"surname":"Wiggill",
							"name":"Samantha"
						}
					]
				},
				{
					"id":1,
					"name":"brokerage 1",
					"brokers":
					[
						{
							"id":2,
							"initials":"C D",
							"surname":"De Villiers",
							"name":"Calbert Doertjie"
						},
						{
							"id":3,
							"initials":"M",
							"surname":"Giggill",
							"name":"Mamantha"
						}
					]
				},
			]
		};*/

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
	// DO NOT THINK NEEDED ANYMORE
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