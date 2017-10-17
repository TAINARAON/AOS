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
	function getDefaultClientData(userId) {

		var requestObject = {
			'id':userId
		};

		var mockResponse = 
		{
			'user':
			{
				'initials':'S',
				'name':'Samantha',
				'surname':'Wiggill',
				'email':'samantha@gmail.com',
			},
			'client':
			{
				'id':1,
				'userId':1,
				'brokerageId':1,
				'creationRights':true
			},
			'businessUnitsWithMembers':
			{
				'id':1,
				'name':'Breeker Brokerage',
				'active':'1',
				'dateCreated':'1990-08-25',
				'email':'breeker.brokerage@gmail.com',
				'contactNumber':'0623521574',
				'fspNumber':'FSP000',
				'verified':'1'
			},
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
		Note: what this call is used for

		broker/editBrokerage

		requestObject:{
			'id':{} (brokerageId)
		}

		responseObject:{
			'someObject':{}
		}
	*/
	this.testMethod = function(successCallback,failCallback,requestObject) {

		var mockResponse = {
			"result":"fake response"
		};

		ajaxPost(TEST_URL,successCallback,failCallback,requestObject,mockResponse);
	}
}