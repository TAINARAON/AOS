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

	var GET_BUSINESS_UNITS_AND_THEIR_FARMS = 'GET_BUSINESS_UNITS_AND_THEIR_FARMS';
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

	/*	
		broker/getBusinessUnitsAndTheirFarms

		requestObject:{
			brokerId
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
			"brokerId":broker['id']
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

	// Damage Report
		// Create
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
				"id":0,
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
		// ^ View ^
	// ^ Damage Report ^
	// Quote
		// Create
		this.validateBusinessUnit = function(successCallback,failCallback,requestObject)
		{
			var mockResponse = {
				'id':'0',
				'name':'BU0',   //'Anro Boerdery Co (ABC)',
				'contactNumber':'063-887-9635',
				'contactPerson':'Anro Swart',
				'email':'anro.swart@bing.com',
				'vatNumber':'00625-4811',
				'incomeTaxNumber':'5651484166',
				'active':'1',
				'verified':'1'
			};

			ajaxPost("Some url",successCallback,failCallback,requestObject,mockResponse);
		}
		this.validateFarm = function(successCallback,failCallback,requestObject)
		{
			var mockResponse = {
				'id':'0',
				'name':'P0',
				'businessUnitId':'0',
				'latitude':'1.22644',
				'longitude':'-0.35428',
				'active':'1',
				'districtId':'0'
			};

			ajaxPost("Some url",successCallback,failCallback,requestObject,mockResponse);
		}
		this.getProducts = function(successCallback,failCallback)
		{
			var mockResponse = [
				{
					'id':'0',
					'name':'Winter',
				}
			];

			ajaxGet("Some url",successCallback,failCallback,mockResponse);
		}
		this.getTariffOptionTypes = function(successCallback,failCallback)
		{
			var mockResponse = [
				{
					'id':'0',
					'name':'Franchise',
				}
			];

			ajaxGet("Some url",successCallback,failCallback,mockResponse);
		}
		this.getCropsOfProduct = function(successCallback,failCallback,requestObject)
		{
			var mockResponse = [
				{
					'id':'1',
					'name':'Banana',
					'productId':'0',
					'active':'1',
					'priceUomId':'0',
					'areaUomId':'0'
				}
			];

			ajaxPost("Some url",successCallback,failCallback,requestObject,mockResponse);
		}
		this.getTariffOptions = function(successCallback,failCallback,requestObject)
		{
			var mockResponse = [
				{
					'id':'0',
					'tariffOptionTypeId':'0',
					'cropId':'0',
					'districtId':'0',
					'coverage':'5',
					'coverageStart':'2017-05-01 00:00:00',
					'coverageEnd':'2018-05-01 00:00:00',
				}
			];

			ajaxPost("Some url",successCallback,failCallback,requestObject,mockResponse);
		}
		this.getTariffOptionDamageTypeOfTariffOption = function(successCallback,failCallback,requestObject)
		{
			var mockResponse = [
				{
					'id':'0',
					'tariffOptionId':'0',
					'damageTypeId':'0',
					'tariff':'0.175',
					'isDefault':'1',
					'damageType':{
						'id':'0',
						'name':'Fire',
					}
				},
				{
					'id':'1',
					'tariffOptionId':'0',
					'damageTypeId':'1',
					'tariff':'0.235',
					'isDefault':'0',
					'damageType':{
						'id':'1',
						'name':'Flood',
					}
				}
			];

			ajaxPost("Some url",successCallback,failCallback,requestObject,mockResponse);
		}
		this.saveQuote = function(successCallback,failCallback,requestObject)
		{	
			// Id of newly created quote
			var mockResponse = {
				'id':0,
				"message":"saved"
			}
			ajaxPost("Some url",successCallback,failCallback,requestObject,mockResponse);
		}
		// ^ Create ^
		// View
		this.getQuotes = function(successCallback,failCallback,requestObject)
		{
			var mockResponse = [
				{
					'id':'0',
					'quoteNumber':'00001',
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
					'brokerId':'0',
					'insurerId':'0',
					'active':'1',
					'dateCreated':'2017-05-18 19:01:05',
					'linkedToQuoteId':null,
					'acceptable':'1',
					'totalInsuredValue':'R200 000',
					'premium':20000,
					'quoteLandEntries':[
						{
							'id':'0',
							'quoteId':'0',
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
							'cropId':'0',
							'crop':{
								'id':'0',
								'name':'Apple',
								'productId':'0',
								'product':{
									'id':'0',
									'name':'Winter',
								},
								'active':'1',
								'priceUomId':'0',
								'areaUomId':'0',
							},
							'landNumber':'00001',
							'landLongitude':'1.3361',
							'landLatitude':'-0.1215',
							'cultivar':'Red Dwarf',
							'area':'7.4',
							'yield':'14.22',
							'price':'5.48',
							'additionalTariff':0.25,
							'tariff':0.66666666666,
							'quoteLandEntryDamageTypes':[
								{
									'id':'0',
									'quoteLandEntryId':'0',
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
								},
								{
									'id':'1',
									'quoteLandEntryId':'0',
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
				},
				{
					'id':'1',
					'quoteNumber':'00002',
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
					'brokerId':'0',
					'insurerId':'0',
					'active':'1',
					'dateCreated':'2017-05-18 19:02:05',
					'linkedToQuoteId':'0',
					'acceptable':'1',
					'totalInsuredValue':'R200 000',
					'premium':18000,
					'quoteLandEntries':[
						{
							'id':'2',
							'quoteId':'1',
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
							'cropId':'1',
							'crop':{
								'id':'1',
								'name':'Banana',
								'productId':'0',
								'product':{
									'id':'0',
									'name':'Winter',
								},
								'active':'1',
								'priceUomId':'0',
								'areaUomId':'0'
							},
							'landNumber':'00003',
							'landLongitude':'1.3361',
							'landLatitude':'-0.1215',
							'cultivar':'Red Dwarf',
							'area':'7.4',
							'yield':'15.22',
							'price':'4.48',
							'additionalTariff':0,
							'tariff':0.23,
							'quoteLandEntryDamageTypes':[
								{
									'id':'5',
									'quoteLandEntryId':'2',
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

			ajaxPost("",successCallback,failCallback,requestObject,mockResponse);
		}
		this.acceptQuote = function(successCallback,failCallback,requestObject)
		{
			var mockResponse = {
				'message':'Accepted'
			}

			ajaxPost("",successCallback,failCallback,requestObject,mockResponse);
		}
		// ^ View ^
	// ^ Quote ^
	// Policy
		// Create
		this.savePolicy = function(successCallback,failCallback,requestObject)
		{
			var mockResponse = {
				'message':'saved'
			};

			ajaxPost("Some url",successCallback,failCallback,requestObject,mockResponse);
		}
		// ^ Create ^
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
	// ^ Policy ^
}