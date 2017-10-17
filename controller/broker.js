var brokerController = new function() {

	// PRIVATE VARIABLES
	var broker = null;
	var brokerage = null;
	var viewableBrokers = null;
	var user = null;
	this.getBroker = function() {
		return broker;
	}
	this.getBrokerage = function() {
		return brokerage;
	}
	this.getViewableBrokers = function() {
		return viewableBrokers;
	}
	this.getUser = function() {
		return user;
	}

	var GET_DEFAULT_BROKER_DATA_URL = 'GET_DEFAULT_BROKER_DATA_URL';
	var TEST_URL = "TEST_URL";
	
	this.init = function(userId) {
		
		getDefaultBrokerData(userId);
	}

	function getDefaultBrokerData(userId) {

		var requestObject = {
			'id':userId
		};

		var mockResponse = 
		{
			'user':{
				'initials':'S',
				'name':'Samantha',
				'surname':'Wiggill',
				'email':'samantha@gmail.com',
			},
			'broker':
			{
				'id':'1',
				'userId':'7',
				'brokerageId':'0',
				'creationRights':true
			},
			'brokerage':
			{
				'id':'0',
				'name':'Breeker Brokerage',
				'active':'1',
				'dateCreated':'1990-08-25',
				'email':'breeker.brokerage@gmail.com',
				'contactNumber':'0623521574',
				'fspNumber':'FSP000',
				'verified':'1'
			},
			'viewableBrokers':
			[
				{
					'id':'2',
					'mainBrokerId':'1',
					'viewableBrokerId':'1',
				},
				{
					'id':'3',
					'mainBrokerId':'1',
					'viewableBrokerId':'2',
				}
			]
		};

		ajaxPost(GET_DEFAULT_BROKER_DATA_URL,onGetDefaultBrokerDataSuccess,onGetDefaultBrokerDataFailure,requestObject,mockResponse);
	}

	function onGetDefaultBrokerDataSuccess(response) {

		util.createNotification('Logged in as Broker');

		broker = response['broker'];
		brokerage = response['brokerage'];
		viewableBrokers = response['viewableBrokers'];
		user = response['user'];

		loader.loadRole('broker');
	}

	function onGetDefaultBrokerDataFailure(response) {

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