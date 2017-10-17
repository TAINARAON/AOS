var clientController = new function() {

	// PRIVATE VARIABLES
	var client = null;
	var businessUnitsWithMembers = null;
	var user = null;
	this.getClient = function() {
		return client;
	}
	this.getBusinessUnitsWithMembers = function() {
		return businessUnitsWithMembers;
	}
	this.getUser = function() {
		return user;
	}

	var GET_DEFAULT_CLIENT_DATA_URL = 'GET_DEFAULT_CLIENT_DATA_URL';
	var TEST_URL = "TEST_URL";
	
	this.init = function(userId) {
		
		getDefaultClientData(userId);
	}
	/*  ADDED TO NOTEPAD
		client/getDefaultClientData

		requestObject: {
			userId
		}

		responseObject: {
			user:{
				whole user object
			},
			client:{
				whole client object
			},
			businessUnitsWithMembers:[
				{
					id,
					name,
					email,
					fspNumber,
					businessUnitMembers:[
						{name,surname,initials,idNumber,isAdmin}
					]
				}
				
			]
		}
	*/
	function getDefaultClientData(userId) {

		var requestObject = {
			'id':userId
		};

		var mockResponse = 
		{
			'user':
			{
				'name':'Tiaan',
				'surname':'Gerber',
				'initials':'T J',
			},
			'client':
			{
				'id':'0',
				'userId':'4',
				'idNumber':'90051685430',
				'contactNumber':'041115487',
				'active':'1',
				'verified':'1'
			},
			'businessUnitsWithMembers':
			[
				{
					'id':'0',
					'name':'BU0',   //'Anro Boerdery Co (ABC)',
					'contactNumber':'063-887-9635',
					'contactPerson':'Anro Swart',
					'email':'anro.swart@bing.com',
					'vatNumber':'00625-4811',
					'incomeTaxNumber':'5651484166',
					'active':'1',
					'verified':'1',
					'businessUnitMembers':
					[
						{
							'id':'0',
							'businesUnitId':'0',
							'name':'Anro',
							'surname':'Swart',
							'initials':'S',
							'idNumber':'90051816248',
							'active':'1',
							'verified':'1',
							'isAdmin':'1',
							'clientId':'1',
						}
					]
				}
			]
		};

		ajaxPost(GET_DEFAULT_CLIENT_DATA_URL,onGetDefaultClientDataSuccess,onGetDefaultClientDataFailure,requestObject,mockResponse);
	}
	function onGetDefaultClientDataSuccess(response) {

		util.createNotification('Logged in as Client');

		client = response['client'];
		businessUnitsWithMembers = response['businessUnitsWithMembers'];
		user = response['user'];

		loader.loadRole('client');
	}
	function onGetDefaultClientDataFailure(response) {

		alert('something messed up');
	}

	/*	
		client/getBusinessUnitsAndTheirFarms

		requestObject:{
			clientId
		}

		responseObject: {
			businessUnitsAndFarms:
			[
				{
					id,  (businessUnitId)
					name,
					farms:
					[
						{
							id, (farmId)
							name
						}
					]
				}
			]
		}
	*/
	this.getBusinessUnitsAndTheirFarms = function(successCallback,failCallback) {

		var requestObject = 
		{
			"clientId":client['id']
		};

		var mockResponse = {
			businessUnitsAndFarms:
			[
				{
					id:0, 
					name:'Business Unit 0',
					farms:
					[
						{
							id:0, 
							name:'Farm 0'
						},
						{
							id:1, 
							name:'Farm 1'
						}
					]
				},
				{
					id:1, 
					name:'Business Unit 1',
					farms:
					[
						{
							id:2, 
							name:'Farm 2'
						},
						{
							id:3, 
							name:'Farm 3'
						}
					]
				}
			]
		}

		ajaxPost(GET_BUSINESS_UNITS_AND_THEIR_FARMS,successCallback,failCallback,requestObject,mockResponse);
	};

}