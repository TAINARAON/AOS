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

	var GET_BUSINESS_UNITS_AND_THEIR_FARMS = 'GET_BUSINESS_UNITS_AND_THEIR_FARMS';
	var CREATE_CLIENT_URL = 'CREATE_CLIENT_URL';
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
			'businessUnitsAndFarms':
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


	/*
		client/createClient

		requestObject:{
			clientDetails:{
				'preferredName',
				'surname',
				'initials',
				'email',
				'idNumber',
				'contactNumber',
				'userame',
				'password'
			},
			files:[
				{not sure how the objects look like}
			]
		}

		responseObject: {
			message
		}
	*/
	this.createClient = function(successCallback,failureCallback,clientDetails) {

		var requestObject = {
			'clientDetails':clientDetails
		};

		var mockResponse = {
			'message':true
		};

		ajaxPost(CREATE_CLIENT_URL,successCallback,failureCallback,requestObject,mockResponse);
	}

	// --------------------------------------- Anro methods

	// Policy
		// View
		this.getPolicies = function(successCallback,failCallback,requestObject)
		{
			var mockResponse = [
				{
					'id':'2',
					'policyNumber':'00002',
					'businessUnitId':'0',
					'businessUnit':{
						'id':'0',
						'name':'BU0',   //'Anro Boerdery Co (ABC)',
						'contactNumber':'063-887-9635',
						'contactPerson':'Anro Swart',
						'email':'anro.swart@bing.com',
						'vatNumber':'00625-4811',
						'incomeTaxNumber':'5651484166',
						'active':'1',
						'verified':'1'
					},
					'brokerId':'1',
					'insurerId':null,
					'acceptedOn':'2017-08-30 19:01:05',
					'active':'1',
					'linkedToPolicyId':null,
					'totalInsuredValue':'R200 000',
					'premium':19000,
					'policyLandEntries':[
						{
							'id':'4',
							'policyId':'2',
							'farmId':'0',
							'farm':{
								'id':'0',
								'name':'P0',
								'businessUnitId':'0',
								'latitude':'1.22644',
								'longitude':'-0.35428',
								'active':'1',
								'districtId':'0'
							},
							'landNumber':'00003',
							'landLongitude':'131.044',
							'landLatitude':'-25.363',
							'cropId':'1',
							'crop':{
								'id':'1',
								'name':'Banana',
								'productId':'0',
								'active':'1',
								'priceUomId':'0',
								'areaUomId':'0'
							},
							'cultivar':'Red Dwarf',
							'area':'7.4',
							'yield':'14.22',
							'price':'5.48',
							'tariffOptionId':'0',
							'additionalTariff':0,
							'tariff':0.3333333333,
							'policyLandEntryDamageTypes':[
								{
									'id':'8',
									'policyLandEntryId':'4',
									'tariffOptionDamageTypeId':'0',
									'tariffOptionDamageType':{
										'id':'0',
										'tariffOptionId':'0',
										'tariffOption':{
											'id':'0',
											'tariffOptionTypeId':'0',
											'tariffOptionType':{
												'id':'0',
												'name':'Franchise',
											},
											'cropId':'0',
											'districtId':'0',
											'coverage':'5',
											'coverageStart':'2017-05-01 00:00:00',
											'coverageEnd':'2018-05-01 00:00:00',
										},
										'damageTypeId':'0',
										'damageType':{
											'id':'0',
											'name':'Fire',
										},
										'tariff':'0.175',
										'isDefault':'1'
									}
								}
							]
						},
						{
							'id':'5',
							'policyId':'2',
							'farmId':'1',
							'farm':{
								'id':'1',
								'name':'P1',
								'businessUnitId':'0',
								'latitude':'1.325642',
								'longitude':'-0.35243',
								'active':'1',
								'districtId':'0'
							},
							'landNumber':'00004',
							'landLongitude':'131.044',
							'landLatitude':'-25.363',
							'cropId':'1',
							'crop':{
								'id':'1',
								'name':'Banana',
								'productId':'0',
								'active':'1',
								'priceUomId':'0',
								'areaUomId':'0'
							},
							'cultivar':'Something',
							'area':'8.4',
							'yield':'16.11',
							'price':'9.48',
							'tariffOptionId':'0',
							'additionalTariff':0,
							'tariff':0.3333333333,
							'policyLandEntryDamageTypes':[
								{
									'id':'10',
									'policyLandEntryId':'5',
									'tariffOptionDamageTypeId':'0',
									'tariffOptionDamageType':{
										'id':'0',
										'tariffOptionId':'0',
										'tariffOption':{
											'id':'0',
											'tariffOptionTypeId':'0',
											'tariffOptionType':{
												'id':'0',
												'name':'Franchise',
											},
											'cropId':'0',
											'districtId':'0',
											'coverage':'5',
											'coverageStart':'2017-05-01 00:00:00',
											'coverageEnd':'2018-05-01 00:00:00',
										},
										'damageTypeId':'0',
										'damageType':{
											'id':'0',
											'name':'Fire',
										},
										'tariff':'0.175',
										'isDefault':'1'
									}
								}
							]
						}
					]	
				},
				{
					'id':'3',
					'policyNumber':'00003',
					'businessUnitId':'0',
					'businessUnit':{
						'id':'0',
						'name':'BU0',   //'Anro Boerdery Co (ABC)',
						'contactNumber':'063-887-9635',
						'contactPerson':'Anro Swart',
						'email':'anro.swart@bing.com',
						'vatNumber':'00625-4811',
						'incomeTaxNumber':'5651484166',
						'active':'1',
						'verified':'1'
					},
					'brokerId':'1',
					'insurerId':null,
					'acceptedOn':'2017-08-30 19:03:05',
					'active':'1',
					'linkedToPolicyId':null,
					'totalInsuredValue':'R200 000',
					'premium':18500,
					'policyLandEntries':[
						{
							'id':'6',
							'policyId':'3',
							'farmId':'0',
							'farm':{
								'id':'0',
								'name':'P0',
								'businessUnitId':'0',
								'latitude':'1.22644',
								'longitude':'-0.35428',
								'active':'1',
								'districtId':'0'
							},
							'landNumber':'00005',
							'landLongitude':'131.044',
							'landLatitude':'-25.363',
							'cropId':'1',
							'crop':{
								'id':'1',
								'name':'Banana',
								'productId':'0',
								'active':'1',
								'priceUomId':'0',
								'areaUomId':'0'
							},
							'cultivar':'Red Dwarf',
							'area':'7.4',
							'yield':'14.22',
							'price':'5.48',
							'tariffOptionId':'0',
							'additionalTariff':0.21111111111,
							'tariff':0.2555555555,
							'policyLandEntryDamageTypes':[
								{
									'id':'11',
									'policyLandEntryId':'5',
									'tariffOptionDamageTypeId':'1',
									'tariffOptionDamageType':{
										'id':'1',
										'tariffOptionId':'0',
										'tariffOption':{
											'id':'0',
											'tariffOptionTypeId':'0',
											'tariffOptionType':{
												'id':'0',
												'name':'Franchise',
											},
											'cropId':'0',
											'districtId':'0',
											'coverage':'5',
											'coverageStart':'2017-05-01 00:00:00',
											'coverageEnd':'2018-05-01 00:00:00',
										},
										'damageTypeId':'1',
										'damageType':{
											'id':'1',
											'name':'Flood',
										},
										'tariff':'0.235',
										'isDefault':'0'
									}
								}
							]
						}
					]	
				}
			];

			ajaxPost("Some url",successCallback,failCallback,requestObject,mockResponse);
		}
		// ^ View ^
		// Create
		this.savePolicy = function(successCallback,failCallback,requestObject)
		{
			var mockResponse = {
				'message':'saved'
			};
			ajaxPost("Some url",successCallback,failCallback,requestObject,mockResponse);
		}
		// ^ Create ^
	// ^ Policy ^
	// Damage Report
		// View
		this.getDamageReports = function(successCallback,failCallback,requestObject)
		{
			var NOTSTARTED = 0;
			var INPROGRESS = 1;
			var DONE = 2;
			var mockResponse = [
				{
					'id':'2',
					'damageTypeId':0,
					'damageType':{
						'id':'0',
						'name':'Fire'
					},
					'dateOfDamage':'2017/05/11',
					'dateOfReporting':'2017/05/11',
					'damageReportNumber':'00002',
					'requiresTaxation':false,
					'taxationProgress':DONE,
					'damageReportLandEntries':[
						{
							'id':'4',
							'damageReportId':2,
							'policyLandEntryId':1,
							'inspected':true,
							'policyLandEntry':{
								'id':'1',
								'policyId':'0',
								'farmId':'1',
								'landNumber':'00002',
								'landLongitude':'131.044',
								'landLatitude':'-25.363',
								'cropId':'1',
								'crop':{'id':'1',
									'name':'Banana',
									'productId':'0',
									'active':'1',
									'priceUomId':'0',
									'areaUomId':'0'
								},
								'cultivar':'Something',
								'area':'8.4',
								'yield':'16.11',
								'price':'9.48',
								'tariffOptionId':'0',
								'additionalTariff':0
							}
						}
					],
					"farm":{
						'id':'1',
						'name':'P1',
						'businessUnitId':'0',
						'latitude':'1.325642',
						'longitude':'-0.35243',
						'active':'1',
						'districtId':'0',
						'district':{
							'id':'0',
							'name':'Bellville',
							'active':'1'
						},
						"businessUnit":{
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
					}
				}
			];
			ajaxPost("Some url",successCallback,failCallback,requestObject,mockResponse);
		}
		// ^ View ^
		// Create
		this.getBusinessUnitsTheClientBelongsTo = function(successCallback,failCallback,requestObject)
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
		this.getFarmsForBusinessUnitTheClientBelongsTo = function(successCallback,failCallback,requestObject)
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
		this.getLandEntryForFarmAndBusinessUnitTheClientBelongsTo = function(successCallback,failCallback,requestObject)
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
		// ^ Create ^
		// View
		this.getDamageReports = function(successCallback,failCallback,requestObject)
		{
			var NOTSTARTED = 0;
			var INPROGRESS = 1;
			var DONE = 2;
			var mockResponse = [
				{
					'id':'2',
					'damageTypeId':0,
					'damageType':{
						'id':'0',
						'name':'Fire'
					},
					'dateOfDamage':'2017/05/11',
					'dateOfReporting':'2017/05/11',
					'damageReportNumber':'00002',
					'requiresTaxation':false,
					'taxationProgress':DONE,
					'damageReportLandEntries':[
						{
							'id':'4',
							'damageReportId':2,
							'policyLandEntryId':1,
							'inspected':true,
							'policyLandEntry':{
								'id':'1',
								'policyId':'0',
								'farmId':'1',
								'landNumber':'00002',
								'landLongitude':'131.044',
								'landLatitude':'-25.363',
								'cropId':'1',
								'crop':{'id':'1',
									'name':'Banana',
									'productId':'0',
									'active':'1',
									'priceUomId':'0',
									'areaUomId':'0'
								},
								'cultivar':'Something',
								'area':'8.4',
								'yield':'16.11',
								'price':'9.48',
								'tariffOptionId':'0',
								'additionalTariff':0
							}
						}
					],
					"farm":{
						'id':'1',
						'name':'P1',
						'businessUnitId':'0',
						'latitude':'1.325642',
						'longitude':'-0.35243',
						'active':'1',
						'districtId':'0',
						'district':{
							'id':'0',
							'name':'Bellville',
							'active':'1'
						},
						"businessUnit":{
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
					}
				}
			];

			ajaxPost("Some url",successCallback,failCallback,requestObject,mockResponse);
		}
		// ^ Create ^
	// ^ Damage Report ^

}