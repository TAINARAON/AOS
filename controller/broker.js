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
					'viewableBrokerId':'3',
					'broker':{
								'id':'3',
								'userId':'6',
								'brokerageId':'0',
								'creationRights':true,
								'user':{
											'id':'6',
											'username':'C',
											'password':'',
											'roleId':'5',
											'name':'Carla',
											'initials':'C',
											'surname':'Says',
											'email':'carla@gmail.com',
											'active':'1',
											'validated':'1'
										}
							}
				},
				{
					'id':'3',
					'mainBrokerId':'1',
					'viewableBrokerId':'2',
					'broker':{
							'id':'2',
							'userId':'8',
							'brokerageId':'0',
							'creationRights':true,
							'user':{
								'id':'8',
								'username':'B2',
								'password':'',
								'roleId':'4',
								'name':'Benjamin',
								'initials':'B T',
								'surname':'Twosey',
								'email':'benjamin@gmail.com',
								'active':'1',
								'validated':'1'
							}
						}
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

	// Damage Report
	this.getBusinessUnitsTheBrokerHasPoliciesOn = function(successCallback,failCallback,requestObject)
	{
		var mockResponse = [
			{
				'id':'0',
				'name':'BU0',   //'Anro Boerdery Co (ABC)',
				'contactNumber':'063-887-9635',
				'contactPerson':'Anro Swart',
				'email':'anro.swart@bing.com',
				'vatNumber':'00625-4811',
				'incomeTaxNumber':'5651484166',
				'active':'1',
				'verified':'1'
			}
		];

		ajaxPost("Some url", successCallback,failCallback,requestObject,mockResponse);
	}
	this.getFarmsForBusinessUnitTheBrokerHasPoliciesOn = function(successCallback,failCallback,requestObject)
	{
		var mockResponse = [
			{
				'id':'0',
				'name':'P0',
				'businessUnitId':'0',
				'latitude':'1.22644',
				'longitude':'-0.35428',
				'active':'1',
				'districtId':'0'
			}
		];

		ajaxPost("Some url", successCallback,failCallback,requestObject,mockResponse);
	}
	this.getDamageTypes = function(successCallback,failCallback)
	{
		var mockResponse = [
			{
				'id':'0',
				'name':'Fire',
			},
			{
				'id':'1',
				'name':'Flood',
			},
			{
				'id':'2',
				'name':'Dew',
			},
			{
				'id':'3',
				'name':'Bugs',
			},
			{
				'id':'4',
				'name':'Godzilla',
			}
		];

		ajaxGet("Some url", successCallback, failCallback, mockResponse);
	}
	this.getLandEntryForFarmAndBusinessUnitTheBrokerHasPoliciesOn = function(successCallback,failCallback,requestObject)
	{
		var mockResponse = [
			{
				'id':'4',
				'policyId':'2',
				'farmId':'0',
				'landNumber':'00003',
				'landLongitude':'131.044',
				'landLatitude':'-25.363',
				'cropId':'1',
				'cultivar':'Red Dwarf',
				'area':'7.4',
				'yield':'14.22',
				'price':'5.48',
				'tariffOptionId':'0',
				'additionalTariff':0
			},
			{
				'id':'6',
				'policyId':'3',
				'farmId':'0',
				'landNumber':'00005',
				'landLongitude':'131.044',
				'landLatitude':'-25.363',
				'cropId':'1',
				'cultivar':'Red Dwarf',
				'area':'7.4',
				'yield':'14.22',
				'price':'5.48',
				'tariffOptionId':'0',
				'additionalTariff':0
			}
		];

		ajaxPost("Some url", successCallback,failCallback,requestObject,mockResponse);
	}
	this.saveDamageReport = function(successCallback,failCallback,requestObject)
	{
		var mockResponse = {
			"message":"Saved"
		};

		ajaxPost("Some url",successCallback,failCallback,requestObject,mockResponse);
	}
	// ^ Damage Report ^
}